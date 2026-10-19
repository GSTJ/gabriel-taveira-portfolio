"use client";

import { useEffect } from "react";

/**
 * `#work-<id>` links (services, the nav, shared URLs) land on a job's
 * `<details>`. Open it so the visitor sees what the link promised.
 */
export const OpenOnHash = () => {
  useEffect(() => {
    const open = () => {
      const target = [
        ...document.querySelectorAll<HTMLDetailsElement>("#work details"),
      ].find((job) => `#${job.id}` === location.hash);
      if (target) target.open = true;
    };
    open();
    addEventListener("hashchange", open);
    return () => removeEventListener("hashchange", open);
  }, []);

  return null;
};
