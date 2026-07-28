"use client";

import { useEffect } from "react";

import { captureError } from "magic-observability/web";

/**
 * Segment-level error UI. Next renders this instead of the route when a
 * server or client render under `/[locale]` throws, and it is the only place
 * that sees the errors the layout's `ObservabilityBoundary` never gets — a
 * failure inside the layout itself, or a server render that never reached the
 * browser tree at all.
 *
 * The `digest` rides along so a report here can be lined up with the server
 * log entry Next already wrote for the same throw.
 */
const RouteError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    captureError(error, {
      source: "app-error-boundary",
      digest: error.digest,
    });
  }, [error]);

  return (
    <main>
      <h2>Something went wrong</h2>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
};

export default RouteError;
