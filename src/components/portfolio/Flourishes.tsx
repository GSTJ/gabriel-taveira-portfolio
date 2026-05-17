"use client";

import { useCallback, useEffect, useState } from "react";
import type { FlourishKind } from "./data";

type CoinQuote = {
  price: number;
  delta: number;
  currency: "USD";
  stale: boolean;
};

const DEFAULT_QUOTE: CoinQuote = {
  price: 248.92,
  delta: 0,
  currency: "USD",
  stale: true,
};

// Module-level memo so repeat hovers within a session don't re-fetch.
let coinCache: CoinQuote | null = null;
let coinInflight: Promise<CoinQuote | null> | null = null;

async function fetchCoin(): Promise<CoinQuote | null> {
  if (coinCache) return coinCache;
  if (coinInflight) return coinInflight;
  coinInflight = (async () => {
    try {
      const res = await fetch("/api/coin", { cache: "force-cache" });
      if (!res.ok) return null;
      const data = (await res.json()) as CoinQuote;
      coinCache = data;
      return data;
    } catch {
      return null;
    } finally {
      coinInflight = null;
    }
  })();
  return coinInflight;
}

function FlourishTicker({ hover }: { hover: boolean }) {
  const [quote, setQuote] = useState<CoinQuote>(
    () => coinCache ?? DEFAULT_QUOTE,
  );

  const load = useCallback(async () => {
    const data = await fetchCoin();
    if (data) setQuote(data);
  }, []);

  // Fetch once on mount; cache makes this cheap.
  useEffect(() => {
    if (!coinCache) void load();
    else setQuote(coinCache);
  }, [load]);

  // Refresh on hover (still hits module cache after first call).
  useEffect(() => {
    if (!hover) return;
    void load();
  }, [hover, load]);

  const isUp = quote.delta >= 0;
  const arrow = isUp ? "▲" : "▼";
  const deltaSign = isUp ? "+" : "";
  const deltaClass = `ws-ticker-delta ws-ticker-delta-${isUp ? "up" : "down"}`;
  const deltaColor = isUp ? "var(--teal-300)" : "var(--coral-300)";

  return (
    <div className="ws-flourish ws-flourish-ticker">
      <div className="ws-ticker-row">
        <span className="ws-ticker-label">$COIN</span>
        <span className="ws-ticker-price">${quote.price.toFixed(2)}</span>
        <span className={deltaClass} style={{ color: deltaColor }}>
          {arrow} {deltaSign}
          {quote.delta.toFixed(2)}%
        </span>
      </div>
      <svg
        viewBox="0 0 130 18"
        className="ws-ticker-chart"
        preserveAspectRatio="none"
      >
        <polyline
          points="0,14 8,12 16,15 24,11 32,12 40,8 48,10 56,7 64,8 72,4 80,6 88,3 96,5 104,2 112,4 120,1 130,0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function FlourishFrames({ hover }: { hover: boolean }) {
  return (
    <div
      className={"ws-flourish ws-flourish-frames" + (hover ? " is-hover" : "")}
    >
      <div className="ws-frame" />
      <div className="ws-frame ws-frame-active">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <polygon points="6 4 20 12 6 20 6 4" />
        </svg>
      </div>
      <div className="ws-frame" />
    </div>
  );
}

function FlourishSwatches({ hover }: { hover: boolean }) {
  return (
    <div
      className={
        "ws-flourish ws-flourish-swatches" + (hover ? " is-hover" : "")
      }
    >
      <div className="ws-sw" style={{ background: "#e07a1f" }} />
      <div className="ws-sw" style={{ background: "#e63b30" }} />
      <div className="ws-sw" style={{ background: "#c89a3a" }} />
      <div className="ws-sw" style={{ background: "#2aa39b" }} />
      <div className="ws-sw" style={{ background: "#f6f1e6" }} />
    </div>
  );
}

function FlourishSpark({ hover }: { hover: boolean }) {
  return (
    <div
      className={"ws-flourish ws-flourish-spark" + (hover ? " is-hover" : "")}
    >
      <span className="ws-soc">SOC 2</span>
      <svg viewBox="0 0 90 22" className="ws-spark" preserveAspectRatio="none">
        <polyline
          points="0,18 12,16 24,20 36,12 48,14 60,8 72,11 84,5 90,2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <polyline
          points="0,18 12,16 24,20 36,12 48,14 60,8 72,11 84,5 90,2"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeDasharray="2 2"
          className="ws-spark-glow"
        />
      </svg>
    </div>
  );
}

function FlourishScoot({ hover }: { hover: boolean }) {
  return (
    <div
      className={"ws-flourish ws-flourish-scoot" + (hover ? " is-hover" : "")}
    >
      <span className="ws-scoot-pkg" aria-hidden>
        📦
      </span>
      <div className="ws-scoot-line">
        <span className="ws-scoot-dot" />
      </div>
      <span className="ws-scoot-target" aria-hidden>
        🏠
      </span>
    </div>
  );
}

function FlourishMigration({ hover }: { hover: boolean }) {
  return (
    <div
      className={
        "ws-flourish ws-flourish-migration" + (hover ? " is-hover" : "")
      }
    >
      <span className="ws-mig-tag">Ionic</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
      <span className="ws-mig-tag ws-mig-tag-active">RN</span>
    </div>
  );
}

function FlourishTools({ hover }: { hover: boolean }) {
  return (
    <div
      className={"ws-flourish ws-flourish-tools" + (hover ? " is-hover" : "")}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    </div>
  );
}

export function Flourish({
  kind,
  hover,
}: {
  kind: FlourishKind;
  hover: boolean;
}) {
  switch (kind) {
    case "ticker":
      return <FlourishTicker hover={hover} />;
    case "frames":
      return <FlourishFrames hover={hover} />;
    case "swatches":
      return <FlourishSwatches hover={hover} />;
    case "spark":
      return <FlourishSpark hover={hover} />;
    case "scoot":
      return <FlourishScoot hover={hover} />;
    case "migration":
      return <FlourishMigration hover={hover} />;
    case "tools":
      return <FlourishTools hover={hover} />;
    default:
      return null;
  }
}
