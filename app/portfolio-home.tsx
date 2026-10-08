import { capabilities, certifications, experience, selectedWork } from "../content/portfolio";

const projects = selectedWork.map((item, index) => ({
  ...item,
  number: String(index + 1).padStart(2, "0"),
  type: item.category,
  visual: item.title === "This portfolio" ? "portfolio" : "bi",
}));

const practices = [
  "Version control",
  "Automated testing",
  "CI / CD",
  "Reusable metrics",
  "Code-driven analytics",
];

const technologies = ["Next.js", "React", "TypeScript", "Tailwind CSS"];

export function PortfolioHome() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div id="top" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Mike Zhao, home">
          <span className="wordmark-mark" aria-hidden="true">M</span>
          <span>Mike Zhao</span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#journey">Journey</a>
          <a href="#practice">Practice</a>
          <a className="nav-contact" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <span className="status-dot" aria-hidden="true" />
            <span>San Diego, California</span>
          </div>

          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">Delivery · Analytics · Software</p>
              <h1 id="hero-title">
                Mike Zhao<span className="hero-period">.</span>
                <span className="hero-subtitle">Building at the intersection of data and software.</span>
              </h1>
              <p className="hero-description">
                I&apos;m a Principal Data Informatics Analyst with a foundation in project
                management, process improvement, and product delivery. My professional
                work spans analytics and business intelligence; outside that role,
                I build software and explore more reliable ways to work.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#work">
                  Explore selected work <span aria-hidden="true">↓</span>
                </a>
                <a className="text-link" href="https://github.com/mikezhao415" target="_blank" rel="noopener noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <aside className="hero-note" aria-label="Professional direction">
              <p className="note-label">The throughline</p>
              <p className="note-statement">Better systems.<br />More useful data.<br />Thoughtful software.</p>
              <div className="note-bottom">
                <span>CURIOUS BY DESIGN</span>
              </div>
            </aside>
          </div>

          <div className="hero-bottomline" aria-hidden="true">
            <span>INDEPENDENT THINKING</span>
            <span className="bottomline-rule" />
            <span>ENGINEERING PRACTICE</span>
            <span className="bottomline-rule" />
            <span>CONTINUOUS LEARNING</span>
          </div>
        </section>

        <section className="work-section section-shell" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Selected work</p>
              <h2 id="work-title">Ideas, made tangible.</h2>
            </div>
            <p className="section-intro editorial-callout">A small, growing collection of work and the thinking behind it.</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card project-card-${project.visual}`} key={project.number}>
                <div className="project-art" aria-hidden="true">
                  {project.visual === "bi" ? (
                    <>
                      <div className="art-topline"><span>ANALYTICS SYSTEM</span><span>001 / BI</span></div>
                      <div className="art-flow">
                        <span className="flow-node">SOURCE</span>
                        <span className="flow-connector" />
                        <span className="flow-node flow-node-active">MODEL</span>
                        <span className="flow-connector" />
                        <span className="flow-node">INSIGHT</span>
                      </div>
                      <div className="art-bottomline"><span>TESTED</span><span>VERSIONED</span><span>REPEATABLE</span></div>
                    </>
                  ) : (
                    <>
                      <div className="art-topline"><span>FIELD NOTES</span><span>002 / NOW</span></div>
                      <div className="portfolio-art-title">Build with<br />a point of view<span>.</span></div>
                      <div className="art-bottomline"><span>THOUGHTFUL BY DEFAULT</span></div>
                    </>
                  )}
                </div>
                <div className="project-body">
                  <div className="project-meta"><span>{project.type}</span><span>{project.number}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p className="project-note">{project.note}</p>
                  {project.href && (
                    <a className="project-link" href={project.href} target={project.href?.startsWith("http") ? "_blank" : undefined} rel={project.href?.startsWith("http") ? "noopener noreferrer" : undefined}>
                      {project.linkLabel} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="journey-section section-shell" id="journey" aria-labelledby="journey-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / Professional direction</p>
              <h2 id="journey-title">A career in motion.</h2>
            </div>
            <p className="section-intro">Different disciplines, connected by a single question: how can we build it better?</p>
          </div>

          <div className="career-narrative">
            <p>I started in project management, bringing people, priorities, and delivery together. Earning my PMP in August 2018 strengthened my approach to planning, stakeholder alignment, and execution. Lean Six Sigma reinforced my interest in removing friction and repetitive work.</p>
            <p>At Mitchell International, that interest led from Excel and VBA automation to Oracle SQL, Tableau, analytical data modeling, and reporting architecture. As a Senior Analyst, I developed Power BI expertise through self-directed learning and hands-on delivery.</p>
            <p>Since my promotion to Principal on September 28, 2026, I am collaborating with my manager and colleagues to explore BI as Code. This is early-stage work; my personal software projects offer another place to learn, experiment, and build.</p>
          </div>
          <div className="journey-panel">
            <div className="journey-aside">
              <span className="note-index">THE ARC / DELIVERY TO ENGINEERING</span>
              <p>A project-management foundation, growing into technical ownership.</p>
            </div>
            <ol className="journey-list">
              {experience.map((role, index) => (
                <li key={role.title + role.company}>
                  <span className="journey-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{role.title}{index === 0 && <span className="current-role">Current</span>}</h3>
                    <p className="role-meta">{role.company} · {role.dates}</p>
                    <p>{role.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="practice-section section-shell" id="practice" aria-labelledby="practice-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / Technical practice</p>
              <h2 id="practice-title">Tools are the means.<br />Good systems are the point.</h2>
            </div>
            <p className="section-intro">The practices behind the work, plus the stack powering this site.</p>
          </div>

          <div className="practice-content">
            <div className="practice-group">
              <p className="practice-label">Analytics engineering</p>
              <ul className="practice-list">
                {practices.map((practice, index) => (
                  <li key={practice}><span>0{index + 1}</span>{practice}</li>
                ))}
              </ul>
            </div>
            <div className="practice-group tech-group">
              <p className="practice-label">Current site stack</p>
              <ul className="tech-list">
                {technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>

            </div>
          </div>
        </section>

        <section className="practice-section section-shell" id="capabilities" aria-labelledby="capabilities-title">
          <div className="section-heading"><div><p className="eyebrow">04 / Capabilities</p><h2 id="capabilities-title">Experience across disciplines.</h2></div></div>
          <div className="project-grid">
            {capabilities.map((group) => (
              <article className="project-card project-body capability-card" key={group.title}>
                <h3>{group.title}</h3><p>{group.description}</p>
                <ul className="tech-list capability-skills">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>
        <section className="practice-section section-shell" id="credentials" aria-labelledby="credentials-title">
          <div className="section-heading"><div><p className="eyebrow">05 / Foundations & continued learning</p><h2 id="credentials-title">Education & certifications.</h2></div></div>
          <div className="education"><h3>University of California, San Diego</h3><p>BS, Management Science · 2014</p></div>
          <ul className="credential-list">
            {certifications.map((item) => (
              <li key={item.name}><div><h3>{item.name}{item.expired && <span className="credential-expired"> (expired)</span>}</h3><p>{item.issuer} · Issued {item.issued}</p></div></li>
            ))}
          </ul>
        </section>

        <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
          <div className="contact-card">
            <div className="contact-copy">
              <p className="eyebrow">06 / Contact</p>
              <h2 id="contact-title">Good work starts<br />with a conversation<span>.</span></h2>
              <p>I&apos;m interested in thoughtful teams, useful problems, and the space where analytics meets software.</p>
            </div>
            <div className="contact-action">
              <span className="contact-label">FIND ME ON</span>
              <a href="https://github.com/mikezhao415" target="_blank" rel="noopener noreferrer" aria-label="Mike Zhao on GitHub">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href="https://www.linkedin.com/in/mikezhao415/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <span className="contact-label contact-email-label">GET IN TOUCH</span>
              <a className="contact-email" href="mailto:hello@mikezhao.dev">hello@mikezhao.dev <span aria-hidden="true">↗</span></a>
              <span className="contact-location">San Diego, CA · Pacific Time</span>
            </div>
            <span className="contact-index" aria-hidden="true">MZ / 2026</span>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <a className="wordmark footer-wordmark" href="#top"><span className="wordmark-mark" aria-hidden="true">M</span><span>Mike Zhao</span></a>
        <span>Built with care in San Diego, California.</span>
        <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </>
  );
}

export default PortfolioHome;
