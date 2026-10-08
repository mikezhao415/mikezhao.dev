import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Mike Zhao — Project Delivery, Analytics & Software";
const description =
  "Mike Zhao is a technology professional working across project management, product development, analytics, and software engineering.";

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
