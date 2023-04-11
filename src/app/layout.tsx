import "@total-typescript/ts-reset";
import "./globals.css";

import { Poppins } from "next/font/google";

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

export default ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={poppins.className}>
    <body>{children}</body>
  </html>
);
