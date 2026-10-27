import type { Metadata } from "next";

// The three reading paths intentionally share the existing portfolio image.
const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Mike Zhao: Where analytical thinking meets creative execution.",
};

export function createCaseStudyMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Mike Zhao",
      title,
      description,
      url: path,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  };
}
