import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Mike Zhao | Data · Engineering · Design";
const description =
  "Explore Mike Zhao's work across data, engineering, and design—from analytics and systems to software development and digital experiences.";

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
      <body>{children}</body>
    </html>
  );
}
