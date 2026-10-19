import type { ObservabilityClient } from "magic-observability";
import type { getWebClient, initWebAnalytics } from "magic-observability/web";

type Options = Parameters<typeof initWebAnalytics>[0];
type WebModule = {
  initWebAnalytics: typeof initWebAnalytics;
  getWebClient: typeof getWebClient;
};

let options: Options = {};
let web: Promise<WebModule> | undefined;

/** Set from `instrumentation-client.ts`, the one file allowed to read env. */
export const configureTelemetry = (next: Options) => {
  options = next;
};

/**
 * Loads posthog-js and initialises it, once. The SDK is ~97 KB gzipped, so it
 * is a dynamic import: it ships as its own chunk and never sits in the bundle
 * every route parses before first paint. `instrumentation-client.ts` calls
 * this once the page has loaded and the main thread is idle. With no
 * `NEXT_PUBLIC_POSTHOG_KEY` the client is a no-op.
 */
export const loadTelemetry = () =>
  (web ??= import("magic-observability/web").then((module) => {
    module.initWebAnalytics(options);
    return module;
  }));

const later = (use: (client: ObservabilityClient) => void) => {
  void loadTelemetry().then((module) => use(module.getWebClient()));
};

/**
 * The client for code that runs before the SDK has loaded, such as an error
 * boundary: each call waits for the import, so an early error is still
 * reported, just a moment later.
 */
export const telemetry: ObservabilityClient = {
  enabled: true,
  disabledReason: null,
  capture: (event, properties) => later((c) => c.capture(event, properties)),
  captureError: (error, context) =>
    later((c) => c.captureError(error, context)),
  identify: (id, properties) => later((c) => c.identify(id, properties)),
  reset: () => later((c) => c.reset()),
  register: (properties) => later((c) => c.register(properties)),
  flush: async () => {},
  shutdown: async () => {},
};
