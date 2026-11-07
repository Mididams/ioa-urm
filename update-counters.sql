create or replace function public.ioa_snapshot() returns jsonb
language sql volatile security invoker set search_path = '' as $$
with clock as materialized (
  select clock_timestamp() as observed_at
), day_start as (
  select observed_at,
    date_trunc('day', (observed_at at time zone 'Europe/Paris') - interval '7 hours')
      + interval '7 hours' as local_start
  from clock
), bounds as (
  select (extract(epoch from observed_at) * 1000)::bigint as now_ms,
    (extract(epoch from (local_start at time zone 'Europe/Paris')) * 1000)::bigint as start_ms,
    (extract(epoch from ((local_start + interval '1 day') at time zone 'Europe/Paris')) * 1000)::bigint as end_ms
  from day_start
)
select jsonb_build_object(
  'now', b.now_ms,
  'daily', jsonb_build_object(
    'startAt', b.start_ms,
    'endAt', b.end_ms,
    'count', (select count(*) from public.hub_events
              where kind = 'entry' and at >= b.start_ms and at < b.end_ms)
  ),
  'hubs', (
    select jsonb_agg(jsonb_build_object(
      'hub', h,
      'lastSeq', (select max(seq) from public.hub_events where kind = 'entry' and hub = h),
      'lastAt', (select at from public.hub_events where kind = 'entry' and hub = h order by seq desc limit 1),
      'count', (select count(*) from public.hub_events
                where kind = 'entry' and hub = h
                  and seq > coalesce((select max(seq) from public.hub_events
                                      where kind = 'reset' and hub in (0, h)), 0))
    ) order by h) from generate_series(1, 3) h
  )
) from bounds b;
$$;
