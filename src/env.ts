const parsed = new Date(process.env.SITE_UPDATED ?? "");

/**
 * When the site last changed: the deployed commit's date, set at build in
 * next.config.ts. Build time if git wasn't there to ask.
 */
export const SITE_UPDATED = Number.isNaN(parsed.getTime())
  ? new Date()
  : parsed;
