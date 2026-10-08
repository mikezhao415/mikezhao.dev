import { PortfolioHome } from "./portfolio-home";

export default function Home() {
  const identity = {
    "@context": "https://schema.org", "@type": "Person", name: "Mike Zhao",
    url: "https://mikezhao.dev", jobTitle: "Principal Data Informatics Analyst",
    sameAs: ["https://github.com/mikezhao415", "https://www.linkedin.com/in/mikezhao415/"],
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of California, San Diego" },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(identity).replace(/</g, "\\u003c") }} /><PortfolioHome /></>;
}
