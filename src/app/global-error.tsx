"use client";

import { useEffect } from "react";

import { captureError } from "magic-observability/web";

/**
 * The last boundary: a throw from the root layout itself, where Next has
 * already discarded the document shell and this component has to supply its
 * own `<html>`.
 *
 * There is still nothing useful to show a visitor, so `error` is read only to
 * report it. The digest lines the report up with the entry Next already wrote
 * to the server log for the same throw.
 */
const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    captureError(error, {
      source: "app-global-error-boundary",
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <h2>Something went wrong</h2>
        <button type="button" onClick={reset}>
          Try again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
