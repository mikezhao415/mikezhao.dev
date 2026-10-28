import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BackToTop } from "./components/back-to-top";
import { Analytics } from "@vercel/analytics/next";

const title = "Mike Zhao | Data · Engineering · Design";
const description =
  "Explore Mike Zhao's professional analytics experience and independent software projects, including AdventureWorks Analytics, a published BI-as-Code case study.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mikezhao.dev"),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Mike Zhao",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "/opengraph-image", alt: "Mike Zhao: From data analysis to software development." }],
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f2ea",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
