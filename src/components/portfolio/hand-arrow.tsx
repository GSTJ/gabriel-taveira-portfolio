// Short, hand-drawn curved arrow used as a one-off pointer near
// the contact form's keyboard hint. Stroke draws once on mount via
// CSS keyframes — no JS, no observers.
export function HandArrow() {
  return (
    <svg
      className="ws-handarrow"
      viewBox="0 0 64 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* freehand wobble: 4 control points instead of one smooth bezier */}
      <path d="M2 20 C 10 8, 20 22, 30 12 S 48 6, 56 14" />
      {/* arrowhead */}
      <path d="M50 10 L 57 14 L 51 19" />
    </svg>
  );
}
