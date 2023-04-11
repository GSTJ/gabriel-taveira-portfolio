import "@total-typescript/ts-reset";
import "./globals.css";

import { Poppins } from "next/font/google";
import Script from "next/script";

export const metadata = {
  title: "Gabriel Taveira",
  description: "Gabriel Taveira's personal Curriculum",
  openGraph: {
    images: ["./og-image.png"],
  },
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const GTM_ID = "G-1S8PR4TDYM";

export default ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={poppins.className}>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-1S8PR4TDYM"
    />
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${GTM_ID}');`}
    </Script>
    <body>{children}</body>
  </html>
);
