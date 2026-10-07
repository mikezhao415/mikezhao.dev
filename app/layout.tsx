import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mike Zhao — Analytics, BI & Software",
  description:
    "Mike Zhao builds analytics, automation, and software with an engineering mindset.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
