import { ExternalPageIcon } from "../../components/external-page-icon";
import Link from "next/link";
import Image from "next/image";
import overviewImage from "../../../public/images/adventureworks/adventureworks-sales-overview.webp";
import trendsImage from "../../../public/images/adventureworks/adventureworks-sales-trends.webp";
import lineageImage from "../../../public/images/adventureworks/adventureworks-data-lineage.webp";
import { architecture, project } from "../../../content/adventureworks";

export function ArchitectureDiagram() {
  return <figure className="case-architecture">
    <ol aria-label="Analytics pipeline stages">
      {architecture.map((step, index) => <li key={step.title}>
        <span className="case-step-index">{String(index + 1).padStart(2, "0")}</span>
        <div><strong>{step.title}</strong><span>{step.detail}</span></div>
      </li>)}
    </ol>
    <figcaption>Implemented workflow. The deployed application serves a reviewed financial aggregate and separately approved lineage metadata. Extraction and modeling run outside the application; it does not run SQL Server, DuckDB, dbt or live ingestion.</figcaption>
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

const screenshots = {
  overview: {
    image: overviewImage,
    path: "/images/adventureworks/adventureworks-sales-overview.webp",
    title: "Sales Overview",
    alt: "AdventureWorks Sales Overview with Data lineage in the navigation, showing $109,846,381 in net line sales, 31,465 orders, $3,491 average order value and 274,914 units sold. All territories and categories are selected.",
    caption: "Published dashboard with the default historical AdventureWorks sales data (May 2011 to June 2014). Totals include all territories and product categories.",
  },
  trends: {
    image: trendsImage,
    path: "/images/adventureworks/adventureworks-sales-trends.webp",
    title: "Sales Trends",
    alt: "AdventureWorks Sales Trends with Data lineage in the navigation and a monthly chart of net line sales and order counts on separate axes. All territories and categories are selected.",
    caption: "The same historical sales dataset (May 2011 to June 2014), grouped by month. Net line sales use the left axis; order counts use the right axis.",
  },
  lineage: {
    image: lineageImage,
    path: "/images/adventureworks/adventureworks-data-lineage.webp",
    title: "Data Lineage",
    alt: "AdventureWorks Data lineage with mart_sales_summary selected in a graph of six dbt models, two sources and nine dependencies. The node list, model details and historical snapshot provenance appear below the graph.",
    caption: "Reviewed historical dbt-derived dependency graph with mart_sales_summary selected and all dependencies shown. The metadata snapshot is separate from the financial dataset; it does not indicate continuous refresh or a new dbt run.",
  },
};

export function DashboardScreenshot({ view }: { view: keyof typeof screenshots }) {
  const screenshot = screenshots[view];
  return <figure className="case-dashboard-figure">
    <div className="case-dashboard-frame">
      <Image
        src={screenshot.image}
        alt={screenshot.alt}
        sizes="(max-width: 700px) 100vw, (max-width: 1200px) 90vw, 1100px"
      />
    </div>
    <figcaption>
      <strong>{screenshot.title}</strong>. {screenshot.caption}
      {" "}<a className="case-screenshot-link" href={screenshot.path}>View full-size {screenshot.title} screenshot</a>
    </figcaption>
  </figure>;
}
