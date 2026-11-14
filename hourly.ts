import { useEffect, useRef, useState } from "react";

export type HourlyEntry = { hub: number; at: number };
const url = "https://lvnywretwubbgknhjvul.supabase.co/rest/v1/hub_events";
const apikey = "sb_publishable_qXHpRzoGuNFyo2Td5c4CJg_c7RJCJG8";

// Read-only, fixed server-time window for every page. No dependency on resets.
// Content-Range prevents silent truncation even if the server cap is below 500.
export async function readHourlyEntries(serverNow: number, signal: AbortSignal): Promise<HourlyEntry[]> {
  const entries: HourlyEntry[] = [];
  const params = new URLSearchParams({
    select: "hub,at", kind: "eq.entry", order: "seq.asc", limit: "500",
    and: `(at.gt.${serverNow - 3600000},at.lte.${serverNow})`,
  });
  while (true) {
    params.set("offset", String(entries.length));
    const r = await fetch(`${url}?${params}`, {
      method: "GET", headers: { apikey, Prefer: "count=exact" }, signal,
    });
    if (!r.ok) throw new Error("Hourly read failed");
    const totalText = r.headers.get("Content-Range")?.split("/")[1];
    if (!totalText || !/^\d+$/.test(totalText)) throw new Error("Missing exact count");
    const total = Number(totalText);
    const page: unknown = await r.json();
    if (!Array.isArray(page) || page.some(e => !e || ![1, 2, 3].includes(e.hub) || !Number.isSafeInteger(e.at))) {
      throw new Error("Invalid hourly entries");
    }
    entries.push(...page);
    if (entries.length >= total) return entries;
    if (page.length === 0) throw new Error("Incomplete hourly read");
  }
}

export function useHourlyEntries(serverNow: number | undefined) {
  const [entries, setEntries] = useState<HourlyEntry[] | null>(null);
  const clock = useRef(serverNow);
  clock.current = serverNow;
  const refresh = useRef<() => void>(() => {});

  useEffect(() => {
    let stopped = false;
    let running = false;
    let controller: AbortController | undefined;
    refresh.current = async () => {
      if (running || clock.current === undefined) return;
      running = true;
      controller = new AbortController();
      const timeout = setTimeout(() => controller?.abort(), 10000);
      try {
        const result = await readHourlyEntries(clock.current, controller.signal);
        if (!stopped) setEntries(result);
      } catch {
        // Never change the connection/action state or existing snapshot values.
        if (!stopped) setEntries(null);
      } finally {
        clearTimeout(timeout);
        running = false;
      }
    };
    return () => { stopped = true; controller?.abort(); refresh.current = () => {}; };
  }, []);

  // Every accepted snapshot (including an action response) supplies server time.
  // A slow hourly request is allowed to finish; overlapping reads are avoided.
  useEffect(() => { refresh.current(); }, [serverNow]);
  return entries;
}
