import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

import { timingStyle } from "./motion";

/**
 * The block a margin note belongs to. On wide screens the note hangs to the
 * right of this block; on narrow ones it drops underneath it. Give it room on
 * the right (a max-width) wherever it carries a note.
 */
export const Annotated = ({
  as: Tag = "div",
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & { as?: ElementType }) => (
  <Tag className={cn("annotated", className)} {...rest}>
    {children}
  </Tag>
);

/**
 * A handwritten note on an anchor phrase, written in by Gabriel's pen the
 * first time it is in view.
 *
 * `placement="margin"` (default) needs an `<Annotated>` ancestor and allows
 * one note per block. `placement="inline"` sits right after the anchor, for
 * notes beside a demo or a number rather than inside running text.
 *
 * Screen readers hear the note in parentheses right after its anchor.
 */
export const Marginalia = ({
  note,
  children,
  placement = "margin",
  delay,
}: {
  note: ReactNode;
  children?: ReactNode;
  placement?: "margin" | "inline";
  delay?: number;
}) => (
  <span
    className={cn("mg", placement === "inline" ? "mg-inline" : "mg-margin")}
    data-draw=""
    suppressHydrationWarning
    style={timingStyle({ delay })}
  >
    {children ? <span className="mg-anchor">{children}</span> : null}
    <span className="mg-note">
      <svg
        className="mg-arrow mg-arrow-side"
        viewBox="0 0 46 26"
        aria-hidden="true"
        focusable="false"
      >
        <path pathLength={1} d="M44 14C32 6 18 4 4 12M4 12l7-6M4 12l8 3" />
      </svg>
      <svg
        className="mg-arrow mg-arrow-up"
        viewBox="0 0 22 22"
        aria-hidden="true"
        focusable="false"
      >
        <path pathLength={1} d="M20 20C12 18 6 13 5 3M5 3 2 9M5 3l5 4" />
      </svg>
      <span className="visually-hidden"> (</span>
      <span className="mg-ink">{note}</span>
      <span className="visually-hidden">)</span>
    </span>
  </span>
);
