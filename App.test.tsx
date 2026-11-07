// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App.tsx";

const snapshot = {
  now: 1_790_000_000_000,
  daily: { startAt: Date.parse("2026-11-07T06:00:00Z"), endAt: Date.parse("2026-11-08T06:00:00Z"), count: 42 },
  hubs: [1, 2, 3].map((hub) => ({
    hub, lastSeq: null, lastAt: null, count: 0,
  })),
};
const response = (data = snapshot) => ({
  ok: true,
  json: async () => data,
}) as Response;

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Synchronisation des hubs", () => {
  it("annule une entrée hors rotation sans écrire en base", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response());
    vi.stubGlobal("fetch", fetchMock);
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    await act(async () => { render(<App />); });
    fireEvent.click(screen.getByRole("button", { name: "Enregistrer une entrée dans le Hub 2" }));
    expect(confirm).toHaveBeenCalledWith("La prochaine entrée devrait être Hub 1. Valider quand même une entrée dans le Hub 2 ?");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    confirm.mockRestore();
  });

  it("enregistre le hub choisi après confirmation", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response());
    vi.stubGlobal("fetch", fetchMock);
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);
    await act(async () => { render(<App />); });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Enregistrer une entrée dans le Hub 3" }));
    });
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toMatchObject({p_kind: "entry", p_hub: 3});
    expect(confirm).toHaveBeenCalledTimes(1);
    confirm.mockRestore();
  });

  it("affiche le compteur quotidien indépendant des compteurs réinitialisables", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response()));
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    await act(async () => { render(<App />); });
    expect(screen.getByText("Entrées depuis le 07/11/2026 à 7h : 42")).toBeTruthy();
    expect(screen.queryByText(/24 dernières heures/)).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Enregistrer une entrée dans le Hub 1" }));
    });
    expect(confirm).not.toHaveBeenCalled();
    confirm.mockRestore();
  });
  it("accepte une réponse prenant plus de deux secondes sans relancer la requête", async () => {
    let resolve!: (value: Response) => void;
    const fetchMock = vi.fn(() => new Promise<Response>((done) => { resolve = done; }));
    vi.stubGlobal("fetch", fetchMock);
    render(<App />);
    await act(async () => { await vi.advanceTimersByTimeAsync(6000); });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await act(async () => { resolve(response()); });
    expect(screen.getByText("Synchronisé · actualisation 2 s")).toBeTruthy();
    expect((screen.getByRole("button", { name: "Enregistrer une entrée dans le Hub 1" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("permet de réessayer une remise à zéro échouée avec le même identifiant", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response())
      .mockRejectedValueOnce(new TypeError("Network error"))
      .mockResolvedValueOnce(response());
    vi.stubGlobal("fetch", fetchMock);
    await act(async () => { render(<App />); });
    fireEvent.click(screen.getByRole("button", { name: /Réinitialiser tous les compteurs/ }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Confirmer la remise à zéro" }));
    });
    expect(screen.queryByRole("dialog")).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Réessayer l’enregistrement" }));
    });
    const first = JSON.parse(fetchMock.mock.calls[1][1].body);
    const retry = JSON.parse(fetchMock.mock.calls[2][1].body);
    expect(first.p_kind).toBe("reset");
    expect(first.p_hub).toBe(0);
    expect(first.p_request_id).toBeTruthy();
    expect(retry).toEqual(first);
    expect(screen.getByText("Compteurs remis à zéro.")).toBeTruthy();
  });

  it("ignore une lecture ancienne terminée après un enregistrement", async () => {
    let resolve!: (value: Response) => void;
    const updated = {
      ...snapshot,
      hubs: snapshot.hubs.map((h) => h.hub === 1
        ? { ...h, count: 1, lastSeq: 1, lastAt: snapshot.now }
        : h),
    };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(response())
      .mockImplementationOnce(() => new Promise<Response>((done) => { resolve = done; }))
      .mockResolvedValueOnce({ ok: true, json: async () => updated });
    vi.stubGlobal("fetch", fetchMock);
    await act(async () => { render(<App />); });
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Enregistrer une entrée dans le Hub 1" }));
    });
    await act(async () => { resolve(response()); });
    expect(screen.getByText("DERNIÈRE ENTRÉE").parentElement?.textContent).toContain("Hub 1");
    expect(screen.getByText("Prochain à prendre").closest("article")?.textContent).toContain("Hub 2");
  });
});
