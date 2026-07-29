import "@total-typescript/ts-reset";
import "./globals.css";
import type { Metadata } from "next";

import { SITE_URL } from "@/utils/site";

/**
 * Root layout. The `<html>` and `<body>` shells live in
 * `src/app/[locale]/layout.tsx` so that `<html lang>` reflects the active
 * locale. Next 16 accepts a pass-through root layout when a nested layout
 * supplies the document shell.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return children;
}
