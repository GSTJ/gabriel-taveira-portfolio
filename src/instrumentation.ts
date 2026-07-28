import { createRequestErrorHandler } from "magic-observability/next";

/**
 * Server-side error reporting. The handler skips the edge runtime, reads
 * `distinct_id` off the PostHog cookie so a server exception lands on the same
 * person as their browser events, and flushes before the function freezes.
 *
 * `register` has nothing to do here — Next requires the export, and the
 * browser half is initialised from `instrumentation-client.ts` instead.
 */
export const register = () => {};

export const onRequestError = createRequestErrorHandler();
