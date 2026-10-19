"use client";

import type { BoundaryFallbackProps } from "magic-observability/boundary";

import { ObservabilityBoundary } from "magic-observability/boundary";

import { telemetry } from "./telemetry";

/**
 * The fallback a render error leaves behind. Deliberately unstyled and in
 * English, matching `app/global-error.tsx`: the stylesheet may be the thing
 * that broke, and the copy has to survive a page whose intl provider is the
 * failure. `reset` re-renders the tree that threw.
 */
const SomethingWentWrong = ({ reset }: BoundaryFallbackProps) => (
  <main>
    <h2>Something went wrong</h2>
    <button type="button" onClick={reset}>
      Try again
    </button>
  </main>
);

/**
 * Client-side error boundary for the whole document. It imports the
 * boundary entry, which needs only React, and reports through the deferred
 * `telemetry` client, so posthog-js stays out of the first-load bundle. No
 * component reads `usePostHog`, so there is no PostHog provider to mount.
 */
export const ObservabilityProviders = ({
  children,
}: React.PropsWithChildren) => (
  <ObservabilityBoundary client={telemetry} fallback={SomethingWentWrong}>
    {children}
  </ObservabilityBoundary>
);
