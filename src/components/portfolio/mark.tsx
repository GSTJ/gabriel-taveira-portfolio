"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Highlights inline phrases with a sweep of accent-soft (uses
// the live --color-accent-soft token so it follows palette
// swaps). Animates from 0 → 100% width when first in view,
// using IntersectionObserver. Respects prefers-reduced-motion.
interface MarkProps {
  children: ReactNode;
}

export const Mark = ({ children }: MarkProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // The fallback for environments with no IntersectionObserver. It has to
      // run after mount: the check is meaningless on the server, and answering
      // it during render would make the client's first pass disagree with the
      // HTML it is hydrating.
      // eslint-disable-next-line react/react-compiler -- see above
      setOn(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setOn(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`ws-mark${on ? " is-on" : ""}`}>
      {children}
    </span>
  );
};
