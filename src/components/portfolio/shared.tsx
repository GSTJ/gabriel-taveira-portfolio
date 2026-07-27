import type { ReactNode } from "react";

export type ChipTone = "neutral" | "ember" | "coral" | "brass" | "teal";

export function BrandMark({
  size = 28,
  withText = true,
}: {
  size?: number;
  withText?: boolean;
}) {
  return (
    <div className="ws-brand">
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <defs>
          <radialGradient id="bm-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde9d6" />
            <stop offset="32%" stopColor="#f29842" />
            <stop offset="70%" stopColor="#b85d12" />
            <stop offset="100%" stopColor="#3a1d05" />
          </radialGradient>
          <radialGradient id="bm-h" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e07a1f" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#e07a1f" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#e07a1f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#bm-h)" />
        <circle cx="32" cy="32" r="13" fill="url(#bm-g)" />
        <circle cx="28" cy="28" r="3.5" fill="#fde9d6" opacity="0.85" />
      </svg>
      {withText && <span className="ws-brand-text">Workshop</span>}
    </div>
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
