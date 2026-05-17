import "@total-typescript/ts-reset";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { useLocale } from "next-intl";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
  metadataBase: new URL("https://gabrieltaveira.dev"),
  title: "Gabriel Taveira · Engineering Lead",
  description:
    "Gabriel Taveira — Engineering Lead. Building and breaking systems since age 8.",
  openGraph: {
    images: ["./og-image.png"],
  },
};

const GTM_ID = "G-1S8PR4TDYM";

export default ({ children }: React.PropsWithChildren) => {
  const locale = useLocale();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <GoogleTagManager gtmId={GTM_ID} />
      <Analytics />
      <body>{children}</body>
    </html>
  );
};
