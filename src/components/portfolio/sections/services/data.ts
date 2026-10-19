import type { WorkItem } from "../work/data";

/**
 * Where a service was done before: a work row (linked as `#work-<id>`) or
 * the whole work history (`#work`), for the claims no single row carries.
 */
export type ServiceProof = WorkItem["id"] | "work";

export type ServiceItem = {
  id: "audit" | "migrations" | "leadership" | "systems";
  proofs: readonly ServiceProof[];
};

export const SERVICES: readonly ServiceItem[] = [
  { id: "audit", proofs: ["coinbase"] },
  { id: "migrations", proofs: ["coinbase", "alfred"] },
  { id: "leadership", proofs: ["work"] },
  { id: "systems", proofs: ["ze", "meta"] },
] as const;

/** "How an engagement runs", in order. Copy under `services.engagement.steps`. */
export const ENGAGEMENT_STEPS = ["review", "plan", "ship", "handoff"] as const;
