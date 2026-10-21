import { ExternalPageIcon } from "./external-page-icon";
import Link from "next/link";
import Image from "next/image";
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

export function DashboardScreenshot({ view }: { view: "overview" | "trends" }) {
  const overview = view === "overview";
  return <figure className="case-dashboard-figure">
    <div className="case-dashboard-frame">
      <Image
        src={overview ? "/images/adventureworks/adventureworks-sales-overview.webp" : "/images/adventureworks/adventureworks-sales-trends.webp"}
        alt={overview
          ? "AdventureWorks Analytics Sales Overview showing $109.8 million in net line sales, 31,465 shipped orders, $3,491 average order value, and 274,914 units sold for May 2011 through June 2014."
          : "AdventureWorks Analytics Sales Trends dashboard with a monthly chart of net line sales and shipped order counts from 2011 through June 2014, plotted on separate axes."}
        width={1818}
        height={832}
        sizes="(max-width: 700px) 100vw, (max-width: 1200px) 90vw, 1100px"
      />
    </div>
    <figcaption>
      <strong>{overview ? "Sales Overview" : "Sales Trends"}</strong> — Authentic screenshot of the published AdventureWorks Analytics dashboard, showing a historical sample-data snapshot (May 2011–June 2014). {overview ? "Totals reflect the displayed selection, not a live data feed." : "The chart compares monthly net line sales with order counts using separate axes."}
    </figcaption>
  </figure>;
}
