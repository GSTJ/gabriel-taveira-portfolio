import type { CSSProperties, ReactNode } from "react";

/**
 * A handwritten aside in pencil (e.g. "yes, really"), the one hand-made mark
 * on an otherwise printed page. Tilts a few degrees like a note in a margin.
 */
export const Marginalia = ({
  children,
  tilt = -4,
}: {
  children: ReactNode;
  tilt?: number;
}) => (
  <span
    className="gt-marginalia"
    style={{ "--tilt": `${tilt}deg` } as CSSProperties}
  >
    {children}
  </span>
);
