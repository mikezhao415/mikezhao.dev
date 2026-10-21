import { ExternalPageIcon } from "./external-page-icon";
import Link from "next/link";
import { architecture, project } from "../../../content/adventureworks";

export function ArchitectureDiagram() {
  return <figure className="case-architecture">
    <ol aria-label="Analytics pipeline stages">
      {architecture.map((step, index) => <li key={step.title}>
        <span className="case-step-index">{String(index + 1).padStart(2, "0")}</span>
        <div><strong>{step.title}</strong><span>{step.detail}</span></div>
      </li>)}
    </ol>
    <figcaption>Implemented workflow. The deployed dashboard serves a reviewed static aggregate; it does not run SQL Server or dbt.</figcaption>
  </figure>;
}
export function CaseLinks() {
  return <div className="case-link-grid">
    <Link href={project.root + "/business"}><span>Business perspective</span><strong>Why modernize analytics?</strong><span>Explore the architectural rationale and trade-offs →</span></Link>
    <Link href={project.root + "/technical"}><span>Technical perspective</span><strong>How was it built?</strong><span>Explore the pipeline, models, tests and evidence →</span></Link>
  </div>;
}
export function EvidenceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="case-evidence-link" href={href} target="_blank" rel="noopener noreferrer">{children} <ExternalPageIcon /></a>;
}
