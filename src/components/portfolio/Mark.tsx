import type { ReactNode } from "react";

/**
 * Inline emphasis for metrics inside blurbs. CONCRETO renders it as a
 * flat 4px cobalt underline (see `.ws-mark`) — static, no observer,
 * no sweep. The component keeps its old API so call sites are stable.
 */
export function Mark({ children }: { children: ReactNode }) {
  return <span className="ws-mark">{children}</span>;
}
