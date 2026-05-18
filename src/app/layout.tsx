import "@total-typescript/ts-reset";
import "./globals.css";

import type { Metadata } from "next";

/**
 * Root layout. The `<html>` and `<body>` shells live in
 * `src/app/[locale]/layout.tsx` so that `<html lang>` reflects the active
 * locale. Next 16 accepts a pass-through root layout when a nested layout
 * supplies the document shell.
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://gabrieltaveira.dev"),
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return children;
}
