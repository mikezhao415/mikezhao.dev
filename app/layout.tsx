import type { Metadata } from "next";
import "./globals.css";

const title = "Mike Zhao — Data, Analytics Engineering & Software";
const description =
  "Principal Data Informatics Analyst in San Diego. A career connecting project management, process improvement, data modeling, Power BI, and personal software development.";
export const metadata: Metadata = {
  metadataBase: new URL("https://mikezhao.dev"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Mike Zhao",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
