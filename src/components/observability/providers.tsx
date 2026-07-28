"use client";

import type { BoundaryFallbackProps } from "magic-observability/react";

import {
  ObservabilityBoundary,
  ObservabilityProvider,
} from "magic-observability/react";
import { getWebClient } from "magic-observability/web";

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
 * Client-side observability for the whole document.
 *
 * `initWebAnalytics` already ran in `instrumentation-client.ts`, so both the
 * provider and the boundary pick the module-level client up rather than
 * building a second one. With no `NEXT_PUBLIC_POSTHOG_KEY` the client is a
 * no-op: the provider renders nothing of its own and the boundary still shows
 * the fallback, it just reports nowhere.
 */
export const ObservabilityProviders = ({
  children,
}: React.PropsWithChildren) => (
  <ObservabilityProvider>
    <ObservabilityBoundary
      client={getWebClient()}
      fallback={SomethingWentWrong}
    >
      {children}
    </ObservabilityBoundary>
  </ObservabilityProvider>
);
