import type { ReactNode } from "react";

export type ChipTone = "neutral" | "ember" | "coral" | "brass" | "teal";

/**
 * The GT monogram: a Bauhaus construction — the G is an open ring, its
 * crossbar doubles as the arm of a T whose stem drops through it. Ring
 * in rosewood, GT strokes in cognac. Paired with the full wordmark for
 * the masthead; alone for tight spots.
 */
export function BrandMark({
  size = 30,
  withText = true,
}: {
  size?: number;
  withText?: boolean;
}) {
  return (
    <div className="ws-brand">
      <svg
        className="ws-monogram"
        viewBox="0 0 44 44"
        width={size}
        height={size}
        fill="none"
        aria-hidden
      >
        <path
          className="ws-monogram-ring"
          d="M35.8 12 A17 17 0 1 0 39 22"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          className="ws-monogram-bar"
          d="M39 22 H24"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          className="ws-monogram-bar"
          d="M31.5 22 V35.5"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
      {withText && (
        <span className="ws-brand-text">
          Gabriel <strong>Taveira</strong>
        </span>
      )}
    </div>
  );
}

/* Bandeirinha — festival pennant hanging point-down from a rule. */
export function Pennant({ width = 52 }: { width?: number }) {
  return (
    <svg
      className="ws-awards-pennant"
      viewBox="0 0 56 76"
      style={{ width }}
      aria-hidden
    >
      <path d="M0 0 H56 L28 76 Z" />
    </svg>
  );
}

export function Eyebrow({
  children,
  accent = false,
}: {
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <span className={"ws-eyebrow" + (accent ? " ws-eyebrow-accent" : "")}>
      {children}
    </span>
  );
}

export function Chip({
  children,
  tone = "neutral",
  dot = true,
}: {
  children: ReactNode;
  tone?: ChipTone;
  dot?: boolean;
}) {
  return (
    <span className={`ws-chip ws-chip-${tone}`}>
      {dot && <span className="ws-chip-dot" />}
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="ws-tag">{children}</span>;
}

export function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="7 17 17 7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

/**
 * Standard `em` / `strong` render callbacks for `t.rich(...)`. Translation
 * strings throughout the portfolio use `<em>` for italic ember accents and
 * `<strong>` for emphasized inline numbers — both rendered with these.
 *
 * Call site:
 *   t.rich("hero.title", richTags)
 *   t.rich("hero.intro", { ...richTags, years: 9 })
 */
export const richTags = {
  em: (chunks: ReactNode) => <em>{chunks}</em>,
  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
};
