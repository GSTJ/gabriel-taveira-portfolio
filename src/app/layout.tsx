import "./globals.css";

export const metadata = {
  title: "Gabriel Taveira",
  description: "Gabriel Taveira's personal Curriculum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
