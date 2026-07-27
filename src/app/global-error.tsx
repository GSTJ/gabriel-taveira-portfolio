"use client";

/**
 * Next hands this both `error` and `reset`. Only `reset` is used — the digest
 * is already in the server log and there is nothing useful to show a visitor —
 * so `error` is not destructured.
 */
const GlobalError = ({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <html lang="en">
    <body>
      <h2>Something went wrong</h2>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </body>
  </html>
);

export default GlobalError;
