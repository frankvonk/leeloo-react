import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leeloo Next.js migration",
  description: "A Next.js area alongside the existing PHP application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0">{children}</body>
    </html>
  );
}
