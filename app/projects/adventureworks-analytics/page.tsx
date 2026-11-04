import { ExternalPageIcon } from "../../components/external-page-icon";
import { createCaseStudyMetadata } from "./metadata";
import { ArchitectureDiagram, CaseLinks, DashboardScreenshot, EvidenceLink } from "./components";
import { project } from "../../../content/adventureworks";

const title = "AdventureWorks Analytics | Mike Zhao";
const description = "An independent BI-as-Code case study: transactional extraction, tested analytical models, reconciliation, a published dashboard and interactive dbt-derived lineage.";

export const metadata = createCaseStudyMetadata(title, description, project.root);
export default function ProjectOverview() {
  return <>
    <section className="case-hero section-shell">
      <p className="case-eyebrow">BI-AS-CODE</p>
      <h1>From transactional data to trusted analytics<span>.</span></h1>
      <p className="case-lead">I built an analytics workflow with tested sales models, a published dashboard and an interactive lineage viewer. The viewer lets visitors trace reporting dependencies through reviewed dbt metadata.</p>
      <div className="case-actions"><a href={project.dashboard} target="_blank" rel="noopener noreferrer">Explore the interactive dashboard <ExternalPageIcon /></a><a href={project.source} target="_blank" rel="noopener noreferrer">Browse source code <ExternalPageIcon /></a></div>
    </section>
    <section className="case-section section-shell"><p className="case-eyebrow">01 / Motivation</p><h2>Analytics should be engineered, not just assembled.</h2><p>Business reporting often begins with a straightforward request: turn operational data into useful information. As reporting requirements expand, SQL logic can become duplicated, calculations can diverge, and validation can depend heavily on individual developers.</p><p>I wanted to apply software engineering practices to analytics development.</p></section>
    <section className="case-section section-shell"><p className="case-eyebrow">02 / Experiment</p><h2>A transactional database. A modern analytical workflow.</h2><p>Using Microsoft&apos;s fictional AdventureWorks 2022 sample database, I built a workflow that extracts sales data, organizes it into analytical models, validates business metrics and publishes an interactive dashboard.</p><p>I focused on correctness, traceability and repeatable execution. I did not measure reporting speed or cost savings.</p></section>
    <section className="case-section section-shell"><p className="case-eyebrow">03 / Architecture</p><h2>Separate the responsibilities. Verify the handoffs.</h2><ArchitectureDiagram /></section>
    <section className="case-section section-shell"><p className="case-eyebrow">04 / Outcome</p><h2>A working system with verifiable results.</h2><p>The project includes 23 real-source dbt models, documented sales metric contracts, independent reconciliation and a publicly accessible dashboard. The deployed application serves a reviewed financial aggregate and separately approved lineage metadata. Both are historical snapshots; the application does not execute the pipeline or refresh source data.</p><EvidenceLink href={project.source + "/blob/main/README.md"}>Review the implementation and evidence</EvidenceLink></section>
    <section className="case-section section-shell"><p className="case-eyebrow">05 / Dashboard</p><h2>From validated models to a usable view.</h2><p>These are genuine captures of the published dashboard, based on the historical AdventureWorks 2022 sample. The deployed site serves a reviewed aggregate rather than querying a live database.</p><DashboardScreenshot view="overview" /><DashboardScreenshot view="trends" /></section>
    <section className="case-section section-shell"><p className="case-eyebrow">06 / Lineage</p><h2>Trace the models behind the sales summary.</h2><p>I built the lineage viewer to make reporting dependencies visible alongside the dashboard. Visitors can select a model or source, inspect its details and highlight upstream or downstream dependencies. The viewer uses reviewed dbt metadata, not metadata generated from a production database at runtime.</p><EvidenceLink href={project.lineage}>Explore the lineage viewer</EvidenceLink><EvidenceLink href={project.lineageDocs}>Read the lineage documentation</EvidenceLink></section>
    <section className="case-section section-shell"><p className="case-eyebrow">07 / Explore</p><h2>Two perspectives on one system.</h2><CaseLinks /></section>
  </>;
}
