export type ServiceItem = {
  id: "audit" | "migrations" | "leadership" | "systems";
};

export const SERVICES: readonly ServiceItem[] = [
  { id: "audit" },
  { id: "migrations" },
  { id: "leadership" },
  { id: "systems" },
] as const;

/** "How an engagement runs", in order. Copy under `services.engagement.steps`. */
export const ENGAGEMENT_STEPS = ["review", "plan", "ship", "handoff"] as const;
