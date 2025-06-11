import "@total-typescript/ts-reset";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { useLocale } from "next-intl";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
  metadataBase: new URL("https://gabrieltaveira.dev"),
  title: "Gabriel Taveira",
  description: "Gabriel Taveira's personal Curriculum",
  openGraph: {
    images: ["./og-image.png"],
  },
};

const GTM_ID = "G-1S8PR4TDYM";

export default ({ children }: React.PropsWithChildren) => {
  const locale = useLocale();

  return (
    <html lang={locale}>
      <GoogleTagManager gtmId={GTM_ID} />
      <Analytics />
      <body>{children}</body>
    </html>
  );
};
