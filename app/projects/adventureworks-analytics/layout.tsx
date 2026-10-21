import Link from "next/link";
import { project } from "../../../content/adventureworks";

export default function CaseStudyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="case-study">
    <a className="skip-link" href="#case-main">Skip to content</a>
    <header className="case-header section-shell">
      <Link className="case-wordmark" href="/">Mike Zhao<span aria-hidden="true">.</span></Link>
      <nav aria-label="Project navigation" className="case-nav">
        <Link href={project.root}>Overview</Link>
        <Link href={project.root + "/business"}>Business</Link>
        <Link href={project.root + "/technical"}>Technical</Link>
      </nav>
    </header>
    <main id="case-main">{children}</main>
    <footer className="case-footer section-shell">
      <p>{project.disclosure}</p>
      <div><Link href="/">Back to portfolio</Link><a href={project.dashboard} target="_blank" rel="noopener noreferrer">Live dashboard</a><a href={project.source} target="_blank" rel="noopener noreferrer">Source on GitHub</a></div>
    </footer>
  </div>;
}
