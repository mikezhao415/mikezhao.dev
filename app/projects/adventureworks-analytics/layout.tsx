import { SiteHeader } from "../../components/site-header";
import { ExternalPageIcon } from "../../components/external-page-icon";
import Link from "next/link";
import { project } from "../../../content/adventureworks";

export default function CaseStudyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="case-study">
    <a className="skip-link" href="#case-main">Skip to content</a>
    <SiteHeader variant="adventureworks" />
    <main id="case-main">{children}</main>
    <footer className="case-footer section-shell">
      <p>{project.disclosure}</p>
      <div><Link href="/">Back to portfolio</Link><a href={project.dashboard} target="_blank" rel="noopener noreferrer">Interactive dashboard <ExternalPageIcon /></a><a href={project.source} target="_blank" rel="noopener noreferrer">Source on GitHub <ExternalPageIcon /></a></div>
    </footer>
  </div>;
}
