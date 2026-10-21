import { ExternalPageIcon } from "./external-page-icon";
import type { Metadata } from "next";
import { ArchitectureDiagram, CaseLinks, EvidenceLink } from "./components";
import { project } from "../../../content/adventureworks";

export const metadata: Metadata = {
  title: "AdventureWorks Analytics | Mike Zhao",
  description: "An independent BI-as-Code case study: transactional extraction, tested analytical models, reconciliation and a published sales dashboard.",
  alternates: { canonical: project.root },
  openGraph: { title: "AdventureWorks Analytics | Mike Zhao", description: "From transactional data to trusted analytics.", url: project.root },
};
export default function ProjectOverview() {
  return <>
    <section className="case-hero section-shell">
      <p className="case-eyebrow">Independent project / BI-as-Code</p>
      <h1>From transactional data to trusted analytics<span>.</span></h1>
      <p className="case-lead">I built an end-to-end analytics engineering case study to explore how version control, modular modeling, automated testing and reproducible workflows can make business intelligence more dependable.</p>
      <div className="case-actions"><a href={project.dashboard} target="_blank" rel="noopener noreferrer">Explore the live dashboard <ExternalPageIcon /></a><a href={project.source} target="_blank" rel="noopener noreferrer">Browse source code <ExternalPageIcon /></a></div>
    </section>
    <section className="case-section section-shell"><p className="case-eyebrow">01 / Motivation</p><h2>Analytics should be engineered, not just assembled.</h2><p>Business reporting often begins with a straightforward request: turn operational data into useful information. As reporting requirements expand, SQL logic can become duplicated, calculations can diverge, and validation can depend heavily on individual developers.</p><p>I wanted to explore a different approach—one where analytics development follows the engineering principles used to build reliable software.</p></section>
    <section className="case-section section-shell"><p className="case-eyebrow">02 / Experiment</p><h2>A transactional database. A modern analytical workflow.</h2><p>Using Microsoft's fictional AdventureWorks 2022 sample database, I built a workflow that extracts sales data, organizes it into analytical models, validates business metrics and publishes an interactive dashboard.</p><p>The emphasis is correctness, traceability and repeatable execution—not an unmeasured claim of faster reporting or reduced costs.</p></section>
    <section className="case-section section-shell"><p className="case-eyebrow">03 / Architecture</p><h2>Separate the responsibilities. Verify the handoffs.</h2><ArchitectureDiagram /></section>
    <section className="case-section section-shell"><p className="case-eyebrow">04 / Outcome</p><h2>A working system with verifiable results.</h2><p>The project includes 23 real-source dbt models, documented sales metric contracts, independent reconciliation and a publicly accessible dashboard. The deployed application consumes a reviewed, precomputed aggregate artifact rather than a live analytical database.</p><EvidenceLink href={project.source + "/blob/main/README.md"}>Review the implementation and evidence</EvidenceLink></section>
    <section className="case-section section-shell"><p className="case-eyebrow">05 / Explore</p><h2>Two perspectives on one system.</h2><CaseLinks /></section>
  </>;
}
