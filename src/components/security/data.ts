/** The /security page: merged, public fixes with a regression check. */

export type SecurityCase = {
  id: "assetBoundary" | "identity" | "authorization";
  eyebrow: string;
  metric: string;
  href: string;
};

export const SECURITY_CASES: readonly SecurityCase[] = [
  {
    id: "assetBoundary",
    eyebrow: "GABRIELTAVEIRA.DEV · 2026",
    metric: "XSS",
    href: "https://github.com/GSTJ/gabriel-taveira-portfolio/pull/163",
  },
  {
    id: "identity",
    eyebrow: "PEGADA · 2026",
    metric: "25×",
    href: "https://github.com/GSTJ/pegada/pull/181",
  },
  {
    id: "authorization",
    eyebrow: "PEGADA · 2026",
    metric: "10m",
    href: "https://github.com/GSTJ/pegada/pull/180",
  },
] as const;
