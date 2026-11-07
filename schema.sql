create table public.hub_events (
seq bigint generated always as identity primary key, request_id uuid not null unique,
kind text not null check(kind in ('entry','reset')), hub integer not null,
at bigint not null default (extract(epoch from clock_timestamp())*1000)::bigint,
check ((kind='entry' and hub between 1 and 3) or (kind='reset' and hub between 0 and 3)));
create index hub_events_lookup on public.hub_events(hub,kind,seq desc);
alter table public.hub_events enable row level security;
revoke all on public.hub_events from anon,authenticated;
grant select on public.hub_events to anon,authenticated;
grant insert(request_id,kind,hub) on public.hub_events to anon,authenticated;
grant usage on sequence public.hub_events_seq_seq to anon,authenticated;
create policy shared_read on public.hub_events for select to anon,authenticated using(true);
create policy shared_add on public.hub_events for insert to anon,authenticated with check(true);
create function public.ioa_snapshot() returns jsonb language sql volatile security invoker set search_path='' as $$
select jsonb_build_object('now',(extract(epoch from clock_timestamp())*1000)::bigint,'hubs',
(select jsonb_agg(jsonb_build_object('hub',h,'lastSeq',(select max(seq) from public.hub_events where kind='entry' and hub=h),
'lastAt',(select at from public.hub_events where kind='entry' and hub=h order by seq desc limit 1),
'count',(select count(*) from public.hub_events where kind='entry' and hub=h and at>(extract(epoch from clock_timestamp())*1000)::bigint-86400000 and seq>coalesce((select max(seq) from public.hub_events where kind='reset' and hub in(0,h)),0))) order by h) from generate_series(1,3) h)); $$;
create function public.ioa_action(p_request_id uuid,p_kind text,p_hub integer) returns jsonb language plpgsql security invoker set search_path='' as $$
begin
perform pg_advisory_xact_lock(739211);
insert into public.hub_events(request_id,kind,hub) values(p_request_id,p_kind,p_hub) on conflict(request_id) do nothing;
return public.ioa_snapshot();
end; $$;
revoke all on function public.ioa_snapshot() from public;
revoke all on function public.ioa_action(uuid,text,integer) from public;
grant execute on function public.ioa_snapshot() to anon,authenticated;
grant execute on function public.ioa_action(uuid,text,integer) to anon,authenticated;
