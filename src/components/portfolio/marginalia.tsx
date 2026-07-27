import type { CSSProperties, ReactNode } from "react";

import { cva } from "class-variance-authority";

// One-liner handwritten aside (e.g. "← yes, really"). Rotates a few degrees
// for a notebook-margin feel; hides on small viewports to stay out of the way.
type MarginaliaProps = {
  children: ReactNode;
  tilt?: number; // degrees, default -4
  side?: "left" | "right" | "inline"; // default "inline"
};

const marginalia = cva("ws-marginalia", {
  variants: {
    side: {
      left: "ws-marginalia-left",
      right: "ws-marginalia-right",
      inline: "",
    },
  },
  defaultVariants: { side: "inline" },
});

export const Marginalia = ({ children, tilt = -4, side }: MarginaliaProps) => {
  const style = { "--tilt": `${tilt}deg` } as CSSProperties;
  return (
    <span className={marginalia({ side })} style={style}>
      {children}
    </span>
  );
};
