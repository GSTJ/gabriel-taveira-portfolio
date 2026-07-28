import { initWebAnalytics } from "magic-observability/web";

/**
 * Browser telemetry, initialised before hydration by Next 15.3+.
 *
 * With no `NEXT_PUBLIC_POSTHOG_KEY` in the environment this returns a no-op
 * client and writes nothing to the console, so a clone without a `.env` boots
 * unchanged. Vercel injects both `VERCEL_*` values on its own; locally they
 * are absent and the environment falls back to `development`.
 */
initWebAnalytics({
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
});
