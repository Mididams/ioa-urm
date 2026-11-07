import React from "react";
import { useEffect, useRef, useState } from "react";
type Hub = {
  hub: number;
  lastSeq: number | null;
  lastAt: number | null;
  count: number;
};
type Data = { now: number; hubs: Hub[] };
export default function Home() {
  const [data, setData] = useState<Data | null>(null),
    [now, setNow] = useState(Date.now()),
    [online, setOnline] = useState(false),
    [busy, setBusy] = useState(false),
    [notice, setNotice] = useState(""),
    [reset, setReset] = useState<number | null>(null);
  const epoch = useRef(0);
  const lock = useRef(false),
    offset = useRef(0),
    pending = useRef<{ kind: string; hub: number; requestId: string } | null>(
      null,
    ),
    [retry, setRetry] = useState(false);
  function accept(d: Data) {
    offset.current = d.now - Date.now();
    setData(d);
    setOnline(true);
    setNow(d.now);
  }
  useEffect(() => {
    let stopped = false;
    async function refresh() {
      if (lock.current) return;
      const version = ++epoch.current;
      try {
        const r = await rpc("ioa_snapshot", {});
        if (!r.ok) throw Error();
        const d = (await r.json()) as Data;
        if (!stopped && !lock.current && version === epoch.current) accept(d);
      } catch {
        if (!stopped && version === epoch.current) setOnline(false);
      }
    }
    refresh();
    const poll = setInterval(refresh, 2000),
      clock = setInterval(() => setNow(Date.now() + offset.current), 1000);
    return () => {
      stopped = true;
      clearInterval(poll);
      clearInterval(clock);
    };
  }, []);
  async function act(kind: string, hub: number) {
    if (lock.current) return;
    lock.current = true;
    epoch.current++;
    setBusy(true);
    setNotice("");
    const action = pending.current ?? {
      kind,
      hub,
      requestId: crypto.randomUUID(),
    };
    pending.current = action;
    try {
      const r = await rpc("ioa_action", {
        p_request_id: action.requestId,
        p_kind: action.kind,
        p_hub: action.hub,
      });
      if (!r.ok) throw Error();
      accept(await r.json());
      pending.current = null;
      setRetry(false);
      setReset(null);
      setNotice(
        action.kind === "entry"
          ? "Entrée enregistrée dans le Hub " + action.hub + "."
          : "Compteur" +
              (action.hub ? " du Hub " + action.hub : "s") +
              " remis à zéro.",
      );
    } catch {
      setOnline(false);
      setRetry(true);
      setNotice(
        "Enregistrement non confirmé. Réessayez pour vérifier sans compter deux fois.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  const hubs =
    data?.hubs ??
    [1, 2, 3].map((hub) => ({ hub, lastSeq: null, lastAt: null, count: 0 }));
  const order = [...hubs].sort(
    (a, b) => (a.lastSeq ?? -a.hub) - (b.lastSeq ?? -b.hub),
  );
  // Initial order is Hub 1, then Hub 2, then Hub 3. Unused hubs go first.
  const queue = [...hubs].sort((a, b) =>
    a.lastSeq === null && b.lastSeq === null
      ? a.hub - b.hub
      : a.lastSeq === null
        ? -1
        : b.lastSeq === null
          ? 1
          : a.lastSeq - b.lastSeq,
  );
  const next = queue[0],
    last = order[2]?.lastSeq ? order[2] : null;
  const total = hubs.reduce((n, h) => n + h.count, 0);
  function elapsed(t: number | null) {
    if (t === null) return "— — : — —";
    const s = Math.max(0, Math.floor((now - t) / 1000));
    return [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60]
      .map((x) => String(x).padStart(2, "0"))
      .join(":");
  }
  return (
    <>
      <header>
        <div className="brand">
          <span className="logo">+</span>
          <div>
            IOA <strong>URM</strong>
            <small>URGENCES · ORIENTATION</small>
          </div>
        </div>
        <div className={"connection " + (online ? "ok" : "")}>
          <i />
          {online
            ? "Synchronisé · actualisation 2 s"
            : "Connexion en cours / interrompue"}
        </div>
      </header>
      <main>
        <div className="heading">
          <div>
            <div className="eyebrow">TABLEAU DE ROTATION</div>
            <h1>Une entrée. Un hub.</h1>
            <p>Cliquez sur le hub qui vient de recevoir une entrée.</p>
          </div>
          <div className="date">
            {new Date(now).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Europe/Paris",
            })}
            <strong>
              {new Date(now).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Paris",
              })}
            </strong>
          </div>
        </div>
        <section className="summary">
          <div className="next-icon">↗</div>
          <div>
            <small>PROCHAINE ENTRÉE</small>
            <strong>{data ? "Hub " + next.hub : "Chargement…"}</strong>
          </div>
          <span className="summary-detail">
            {last
              ? "Dernière entrée : Hub " + last.hub
              : "Première rotation : Hub 1 → Hub 2 → Hub 3"}
          </span>
          <div className="total">
            <strong>{data ? total : "—"}</strong>
            <span>
              entrées au total<small>24 dernières heures</small>
            </span>
          </div>
        </section>
        <section className="cards" aria-label="Enregistrer une entrée">
          {hubs.map((h) => {
            const rank = queue.findIndex((x) => x.hub === h.hub);
            const color = !data
              ? "neutral"
              : rank === 0
                ? "green"
                : h.hub === last?.hub
                  ? "red"
                  : "yellow";
            const label = !data
              ? "Chargement"
              : rank === 0
                ? "Prochain à prendre"
                : h.hub === last?.hub
                  ? "Dernière entrée"
                  : h.lastSeq
                    ? "Avant-dernier"
                    : "En attente";
            return (
              <article key={h.hub} className={"card " + color}>
                <button
                  className="hub-action"
                  onClick={() => act("entry", h.hub)}
                  disabled={!online || busy || retry}
                  aria-label={"Enregistrer une entrée dans le Hub " + h.hub}
                >
                  <div className="card-top">
                    <span className="badge">
                      <i />
                      {label}
                    </span>
                    <span className="arrow">↗</span>
                  </div>
                  <h2>Hub {h.hub}</h2>
                  <div className="timer">{elapsed(h.lastAt)}</div>
                  <p>depuis la dernière entrée</p>
                  <div className="card-bottom">
                    <span>
                      <strong>{data ? h.count : "—"}</strong> entrées / 24 h
                    </span>
                    <span className="add">+ 1 entrée</span>
                  </div>
                </button>
                <button
                  className="reset-one"
                  disabled={!online || busy || retry}
                  onClick={() => setReset(h.hub)}
                >
                  Réinitialiser le compteur
                </button>
              </article>
            );
          })}
        </section>
        <div className="legend">
          <span>
            <i className="dot green-dot" />
            Prochain hub
          </span>
          <span>
            <i className="dot yellow-dot" />
            Avant-dernier hub
          </span>
          <span>
            <i className="dot red-dot" />
            Dernier hub
          </span>
          <small>
            Chaque clic enregistre une entrée et actualise la rotation.
          </small>
        </div>
        <div className="notice" role="status">
          {notice}
          {retry && (
            <button
              disabled={busy}
              onClick={() => act(pending.current!.kind, pending.current!.hub)}
            >
              Réessayer l’enregistrement
            </button>
          )}
        </div>
        <section className="bottom">
          <div>
            <h3>Un même tableau pour toute l’équipe</h3>
            <p>
              Les entrées sont partagées entre tous les postes utilisant ce
              lien. Aucun renseignement patient n’est demandé.
            </p>
          </div>
          <button
            className="reset-all"
            disabled={!online || busy || retry}
            onClick={() => setReset(0)}
          >
            ↺ &nbsp; Réinitialiser tous les compteurs
          </button>
        </section>
        <footer>
          <span>
            IOA URM <b> / </b> Coordination des hubs
          </span>
          <span>
            Compteurs sur 24 h glissantes, depuis la dernière remise à zéro.
          </span>
        </footer>
      </main>
      {reset !== null && (
        <div className="overlay">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            className="modal"
            onKeyDown={(e) => {
              if (e.key === "Escape" && !busy) setReset(null);
            }}
          >
            <span className="modal-icon">↺</span>
            <h2 id="reset-title">
              {reset
                ? "Réinitialiser le Hub " + reset + " ?"
                : "Réinitialiser tous les compteurs ?"}
            </h2>
            <p>
              La remise à zéro s’appliquera à tous les postes. Les chronomètres
              et l’ordre de rotation seront conservés.
            </p>
            <div>
              <button autoFocus disabled={busy} onClick={() => setReset(null)}>
                Annuler
              </button>
              <button
                className="confirm"
                disabled={busy || retry}
                onClick={() => act("reset", reset)}
              >
                {busy ? "Enregistrement…" : "Confirmer la remise à zéro"}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

async function rpc(name: string, body: object) {
  return fetch("https://lvnywretwubbgknhjvul.supabase.co/rest/v1/rpc/" + name, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: "sb_publishable_qXHpRzoGuNFyo2Td5c4CJg_c7RJCJG8",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10000),
  });
}
