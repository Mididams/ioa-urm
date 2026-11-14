// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App.tsx";
import { readHourlyEntries } from "./hourly";

const serverNow = Date.parse("2026-11-14T06:00:00Z");
const snapshot = {
  now: serverNow,
  hubs: [1, 2, 3].map(hub => ({ hub, count: 5, lastSeq: hub, lastAt: serverNow - 60000, dailyCount: 3 })),
  daily: { startAt: serverNow, endAt: serverNow + 86400000, count: 9, previousCount: 12 },
};
const response = (value: unknown, total?: number) => ({
  ok: true, json: async () => value,
  headers: new Headers(total === undefined ? {} : { "Content-Range": `0-0/${total}` }),
}) as Response;
const counts = () => [...document.querySelectorAll(".hourly strong")].map(e => e.textContent);

beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date("2040-01-01")); });
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("Compteur horaire indépendant", () => {
  it("lit les horodatages serveur et expire à 60 minutes sans clic ni nouvelle réponse", async () => {
    const rows = [{ hub: 1, at: serverNow - 3599000 }, { hub: 2, at: serverNow }];
    const fetchMock = vi.fn(async (url: string) => url.includes("/hub_events?") ? response(rows, rows.length) : response(snapshot));
    vi.stubGlobal("fetch", fetchMock);
    await act(async () => { render(<App />); });
    expect(counts()).toEqual(["1", "1", "0"]);
    const [url, options] = fetchMock.mock.calls.find(([url]) => url.includes("/hub_events?"))! as unknown as [string, RequestInit];
    const params = new URL(url).searchParams;
    expect(params.get("kind")).toBe("eq.entry");
    expect(params.get("and")).toBe(`(at.gt.${serverNow - 3600000},at.lte.${serverNow})`);
    expect(options.method).toBe("GET");
    expect(options.body).toBeUndefined();
    await act(async () => { await vi.advanceTimersByTimeAsync(1000); });
    expect(counts()).toEqual(["0", "1", "0"]);
    expect(document.querySelector(".total strong")?.textContent).toBe("15");
    expect(screen.getAllByText("00:01:01")).toHaveLength(3);
  });

  it("reste indépendant d’un reset et du changement de journée à 7h", async () => {
    const rows = [{ hub: 1, at: serverNow - 60000 }];
    let current = { ...snapshot, now: serverNow - 1000,
      daily: { ...snapshot.daily, startAt: serverNow - 86400000, endAt: serverNow } };
    vi.stubGlobal("fetch", vi.fn(async (url: string) => url.includes("/hub_events?") ? response(rows, 1) : response(current)));
    await act(async () => { render(<App />); });
    expect(counts()).toEqual(["1", "0", "0"]);
    current = { ...snapshot, daily: { ...snapshot.daily, count: 0, previousCount: 9 },
      hubs: snapshot.hubs.map(h => ({ ...h, count: 0, dailyCount: 0 })) };
    fireEvent.click(screen.getByRole("button", { name: /Réinitialiser tous les compteurs/ }));
    await act(async () => { fireEvent.click(screen.getByText("Confirmer la remise à zéro")); });
    expect(counts()).toEqual(["1", "0", "0"]);
    expect(document.querySelector(".total strong")?.textContent).toBe("0");
    expect(screen.getAllByText("00:01:00")).toHaveLength(3);
    expect(screen.getByText("Prochain à prendre").closest("article")?.textContent).toContain("Hub 1");
  });

  it("synchronise une entrée d’un autre poste à la lecture suivante", async () => {
    let rows = [{ hub: 1, at: serverNow - 1000 }];
    let current = snapshot;
    vi.stubGlobal("fetch", vi.fn(async (url: string) => url.includes("/hub_events?") ? response(rows, rows.length) : response(current)));
    await act(async () => { render(<App />); });
    rows = [...rows, { hub: 3, at: serverNow + 1000 }];
    current = { ...snapshot, now: serverNow + 2000 };
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    expect(counts()).toEqual(["1", "0", "1"]);
  });

  it("une panne de lecture horaire ne bloque ni les entrées ni les compteurs existants", async () => {
    let failed = true;
    const fetchMock = vi.fn(async (url: string) => {
      if (url.includes("/hub_events?")) {
        if (failed) throw Error("unavailable");
        return response([], 0);
      }
      return response({ ...snapshot, now: serverNow + (failed ? 0 : 2000) });
    });
    vi.stubGlobal("fetch", fetchMock);
    await act(async () => { render(<App />); });
    expect(counts()).toEqual(["—", "—", "—"]);
    expect((screen.getByRole("button", { name: "Enregistrer une entrée dans le Hub 1" }) as HTMLButtonElement).disabled).toBe(false);
    expect(document.querySelector(".total strong")?.textContent).toBe("15");
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Enregistrer une entrée dans le Hub 1" })); });
    expect(screen.getByRole("status").textContent).toBe("Entrée enregistrée dans le Hub 1.");
    failed = false;
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    expect(counts()).toEqual(["0", "0", "0"]);
  });

  it("ne fait pas se chevaucher les lectures lentes et continue les snapshots", async () => {
    let resolve!: (r: Response) => void;
    let tick = 0;
    const fetchMock = vi.fn((url: string) => url.includes("/hub_events?")
      ? new Promise<Response>(done => { resolve = done; })
      : Promise.resolve(response({ ...snapshot, now: serverNow + tick++ * 2000 })));
    vi.stubGlobal("fetch", fetchMock);
    await act(async () => { render(<App />); });
    await act(async () => { await vi.advanceTimersByTimeAsync(6000); });
    expect(fetchMock.mock.calls.filter(([url]) => url.includes("/hub_events?"))).toHaveLength(1);
    expect(tick).toBe(4);
    await act(async () => { resolve(response([{ hub: 2, at: serverNow }], 1)); });
    expect(counts()).toEqual(["0", "1", "0"]);
  });
});

describe("Lecture paginée en lecture seule", () => {
  it("récupère plus de 1000 entrées même si le serveur limite chaque page à 200", async () => {
    const rows = Array.from({ length: 1201 }, () => ({ hub: 1, at: serverNow }));
    const fetchMock = vi.fn(async (url: string) => {
      const offset = Number(new URL(url).searchParams.get("offset"));
      return response(rows.slice(offset, offset + 200), rows.length);
    });
    vi.stubGlobal("fetch", fetchMock);
    expect(await readHourlyEntries(serverNow, new AbortController().signal)).toHaveLength(1201);
    expect(fetchMock).toHaveBeenCalledTimes(7);
    expect(fetchMock.mock.calls.map(([url]) => new URL(url).searchParams.get("offset"))).toEqual(["0", "200", "400", "600", "800", "1000", "1200"]);
  });

  it("ne publie pas de résultat partiel si une page échoue", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce(response([{ hub: 1, at: serverNow }], 2))
      .mockResolvedValueOnce({ ok: false }));
    await expect(readHourlyEntries(serverNow, new AbortController().signal)).rejects.toThrow();
  });

  it("refuse un total absent et distingue un historique vide d’une erreur", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce(response([])).mockResolvedValueOnce(response([], 0)));
    await expect(readHourlyEntries(serverNow, new AbortController().signal)).rejects.toThrow("Missing exact count");
    expect(await readHourlyEntries(serverNow, new AbortController().signal)).toEqual([]);
  });
});
