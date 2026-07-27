"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";

import { CAREER_START_YEAR, yearsInIndustry, yearsTinkering } from "./lifeline";

/**
 * Pads `prefix` with `.` characters to a consistent column width
 * for the system-audit readout.
 */
const row = (label: string, value: string): string => {
  const total = 36;
  const dots = ".".repeat(Math.max(2, total - label.length));
  return `> ${label} ${dots} ${value}`;
};

export const SystemAudit = ({ onClose }: { onClose: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);

  const script = useMemo(
    () => [
      "> system audit init",
      row("identity", "Gabriel Taveira"),
      row("role", "Engineering Lead"),
      row(
        "years",
        `${yearsInIndustry()}+ professional, ${yearsTinkering()} tinkering`,
      ),
      row("since", `${CAREER_START_YEAR}`),
      row("reports led", "4 → 56"),
      "> teams shipped ...... Coinbase, A.Team, Meta, X-Team,",
      "                       Zé Delivery, Alfred Delivery, MIG",
      row("awards", "5 (2019 → 2020)"),
      row("coffee level", "☕☕☕☕  (acceptable)"),
      row("system status", "operational"),
      "> press ESC to close",
    ],
    [],
  );

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      const line = script[i];
      i++;
      if (line === undefined) {
        clearInterval(id);
        return;
      }
      setLines((prev) => [...prev, line]);
    }, 90);
    return () => clearInterval(id);
  }, [script]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Closing only when the backdrop itself is the click target is what the
  // inner `stopPropagation` handler used to buy, minus a second click handler
  // on a div that has no business being interactive.
  const onBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    // The backdrop is decoration: it carries no content and duplicates the
    // Escape handler above, which is the keyboard path to the same action.
    <div
      className="ws-audit-backdrop"
      role="presentation"
      onClick={onBackdropClick}
    >
      <div className="ws-audit">
        <div className="ws-audit-head">
          <span className="ws-audit-light" />
          <span className="ws-audit-light" />
          <span className="ws-audit-light" />
          <span className="ws-audit-title">workshop.audit</span>
          <button type="button" className="ws-audit-close" onClick={onClose}>
            esc
          </button>
        </div>
        <pre className="ws-audit-body">
          {lines.join("\n")}
          <span className="ws-audit-cursor">▊</span>
        </pre>
      </div>
    </div>
  );
};
