import "@total-typescript/ts-reset";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { useLocale } from "next-intl";

export const metadata = {
  title: "Gabriel Taveira",
  description: "Gabriel Taveira's personal Curriculum",
  openGraph: {
    images: ["./og-image.png"],
  },
};

const GTM_ID = "G-1S8PR4TDYM";

export default ({ children }) => {
  const locale = useLocale();

  return (
    <html lang={locale}>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}
      </Script>
      <Analytics />
      <body>{children}</body>
    </html>
  );
};
