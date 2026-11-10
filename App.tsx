import React from "react";
import { useEffect, useRef, useState } from "react";
type Hub = {
  hub: number;
  lastSeq: number | null;
  lastAt: number | null;
  count: number;
  resetAt?: number | null;
  dailyCount?: number;
};
type Data = {
  now: number;
  resetAt?: number | null;
  hubs: Hub[];
  daily?: { startAt: number; endAt: number; count: number; previousCount?: number };
};
type ActionKind = "entry" | "reset";
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
    pending = useRef<{ kind: ActionKind; hub: number; requestId: string } | null>(
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
    let refreshing = false;
    async function refresh() {
      if (lock.current || refreshing) return;
      refreshing = true;
      const version = ++epoch.current;
      try {
        const r = await rpc("ioa_snapshot", {});
        if (!r.ok) throw Error();
        const d = (await r.json()) as Data;
        if (!stopped && !lock.current && version === epoch.current) accept(d);
      } catch {
        if (!stopped && version === epoch.current) setOnline(false);
      } finally {
        refreshing = false;
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
  async function act(kind: ActionKind, hub: number) {
    if (lock.current) return;
    lock.current = true;
    epoch.current++;
    setBusy(true);
    setNotice("");
    try {
      const action = pending.current ?? {
        kind,
        hub,
        requestId: crypto.randomUUID(),
      };
      pending.current = action;
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
      setRetry(pending.current !== null);
      setReset(null);
      setNotice(
        pending.current
          ? "Enregistrement non confirmé. Réessayez pour vérifier sans compter deux fois."
          : "Impossible de préparer l’enregistrement. Ouvrez l’application en HTTPS ou sur localhost.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  const hubs: Hub[] =
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
  function requestEntry(hub: number) {
    if (!online || lock.current || retry) return;
    if (hub !== next.hub && !window.confirm(
      `La prochaine entrée devrait être Hub ${next.hub}. Valider quand même une entrée dans le Hub ${hub} ?`,
    )) return;
    void act("entry", hub);
  }
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
          <div className="summary-detail">
            {last ? <>
              <small>DERNIÈRE ENTRÉE</small>
              <strong>Hub {last.hub}</strong>
            </> : "Première rotation : Hub 1 → Hub 2 → Hub 3"}
          </div>
          <div className="totals">
            <div className="total">
            <strong>{data ? total : "—"}</strong>
            <span>
              {total > 1 ? "entrées" : "entrée"} depuis la réinitialisation
              <ResetDate at={data?.resetAt} />
            </span>
            </div>
            <div className="daily-total">
              {data?.daily ? <>
                Entrées depuis le {new Date(data.daily.startAt).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" })} à 7h : <strong>{data.daily.count}</strong>
              </> : "Compteur quotidien en cours de chargement…"}
            </div>
            <div className="daily-total">
              Total entrées hier (7h - 7h) : <strong>{data?.daily?.previousCount ?? "—"}</strong>.
            </div>
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
                  onClick={() => requestEntry(h.hub)}
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
                      <strong>{data ? h.count : "—"}</strong> {h.count > 1 ? "entrées" : "entrée"} depuis la réinitialisation
                      <ResetDate at={h.resetAt} />
                    </span>
                    <span className="add">+ 1 entrée</span>
                  </div>
                  <div className="hub-daily">
                    {data?.daily && h.dailyCount !== undefined
                      ? <><strong>{h.dailyCount}</strong>{` entrées depuis le ${formatDate(data.daily.startAt)} à 7h`}</>
                      : "Compteur quotidien en cours de chargement…"}
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
            <h3>Les entrées sont partagées entre tous les postes utilisant ce
              lien. Aucun renseignement patient n’est demandé.</h3>
          </div>
        </section>
        <section className="counter-help" aria-label="Fonctionnement des compteurs">
          <button
            className="reset-all"
            disabled={!online || busy || retry}
            onClick={() => setReset(0)}
          >
            ↺ &nbsp; Réinitialiser tous les compteurs
          </button>
          <p>
            La réinitialisation des compteurs d’entrées est manuelle, à l’initiative des IOA (7 h / 19 h, par exemple).<br />
            Elle garde en mémoire la dernière entrée de chaque hub et les chronos. Seul le nombre d’entrées est remis à zéro.<br />
            Les compteurs des 24 h, de 7 h à 7 h, sont automatiques et ne sont pas affectés par la réinitialisation manuelle.
          </p>
        </section>
        <footer>
          <span>
            IOA URM <b> / </b> Coordination des hubs
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
              et l’ordre de rotation seront conservés. Les compteurs quotidiens et le total de la veille ne seront pas modifiés.
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

function formatDate(at: number) {
  return new Date(at).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" });
}

function ResetDate({ at }: { at: number | null | undefined }) {
  if (at === undefined) return <span className="reset-date">Date en cours de chargement…</span>;
  if (at === null) return <span className="reset-date">Aucune réinitialisation manuelle</span>;
  return <> le<span className="reset-date">{formatDate(at)} à {new Date(at).toLocaleTimeString("fr-FR", {
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris",
  })}</span></>;
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
