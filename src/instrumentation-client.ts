import {
  configureTelemetry,
  loadTelemetry,
} from "@/components/observability/telemetry";

const GTM_ID = "G-1S8PR4TDYM";

/**
 * Without a `.env` the PostHog client is a no-op, so a clone boots
 * unchanged. Vercel injects both `VERCEL_*` values; locally the environment
 * is `development`.
 */
configureTelemetry({
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
});

/**
 * Google's tag: the same container and dataLayer push that
 * @next/third-parties' GoogleTagManager made. `gtm.start` is stamped now, so
 * GA still times the visit from navigation; only the 180 KB script waits.
 */
const tagWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
tagWindow.dataLayer ??= [];
tagWindow.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

const loadGoogleTag = () => {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.append(script);
};

/**
 * Next runs this file before hydration. Both analytics SDKs (~280 KB of
 * script together) used to load right here or right after hydration, on
 * every route, fighting the fonts and the first paint for the network and
 * the main thread. Now they wait for `load`, two quiet seconds and an idle
 * main thread. The first pageview is still recorded: posthog-js captures the
 * current page when it initialises, and gtm.js reads the queued push.
 */
const run = () => {
  loadGoogleTag();
  void loadTelemetry();
};

const start = () => {
  setTimeout(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(run, { timeout: 3000 });
    } else {
      run();
    }
  }, 2000);
};

if (document.readyState === "complete") start();
else window.addEventListener("load", start, { once: true });
