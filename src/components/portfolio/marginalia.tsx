import type { CSSProperties, ReactNode } from "react";

// One-liner handwritten aside (e.g. "← yes, really"). Rotates a few degrees
// for a notebook-margin feel; hides on small viewports to stay out of the way.
type MarginaliaProps = {
  children: ReactNode;
  tilt?: number; // degrees, default -4
  side?: "left" | "right" | "inline"; // default "inline"
};

const SIDE_CLASS = {
  left: " ws-marginalia-left",
  right: " ws-marginalia-right",
  inline: "",
} as const;

export const Marginalia = ({
  children,
  tilt = -4,
  side = "inline",
}: MarginaliaProps) => {
  const className = `ws-marginalia${SIDE_CLASS[side]}`;
  const style = { "--tilt": `${tilt}deg` } as CSSProperties;
  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
};
