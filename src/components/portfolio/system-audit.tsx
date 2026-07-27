"use client";

import { useEffect, useMemo, useState } from "react";

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
      if (i >= script.length) {
        clearInterval(id);
        return;
      }
      const line = script[i] ?? "";
      setLines((prev) => [...prev, line]);
      i++;
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

  return (
    <div
      className="ws-audit-backdrop"
      role="presentation"
      onClick={(e) => {
        // Click-away only. Comparing target to currentTarget replaces the
        // stopPropagation handler the panel used to carry, which the a11y rules
        // were right to flag: a div with a click handler and no role is a
        // control screen readers can't see.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="ws-audit"
        // `prefer-tag-over-role` wants a native `<dialog>`. That only renders in
        // the top layer via `showModal()`, and it brings the UA stylesheet with
        // it — this overlay is positioned entirely by `.ws-audit`.
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="dialog"
        aria-modal="true"
        aria-labelledby="ws-audit-title"
      >
        <div className="ws-audit-head">
          <span className="ws-audit-light" />
          <span className="ws-audit-light" />
          <span className="ws-audit-light" />
          <span className="ws-audit-title" id="ws-audit-title">
            workshop.audit
          </span>
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
