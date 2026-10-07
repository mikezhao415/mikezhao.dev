const projects = [
  {
    number: "01",
    type: "Analytics engineering · Open source",
    title: "BI as Code",
    description:
      "A code-driven approach to analytics: version control, automated testing, CI/CD, and reusable models for more reliable business intelligence.",
    href: "https://github.com/mikezhao415/bi-as-code",
    linkLabel: "Explore the repository",
    visual: "bi",
  },
  {
    number: "02",
    type: "Software · In progress",
    title: "A portfolio built with intent",
    description:
      "An evolving home for the work, decisions, and engineering practices behind a career moving from data analysis toward software building.",
    href: "#journey",
    linkLabel: "Read the story",
    visual: "portfolio",
  },
];

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
        <section className="hero section-shell" id="top" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <span className="status-dot" aria-hidden="true" />
            <span>San Diego, California</span>
            <span className="kicker-divider" aria-hidden="true">/</span>
            <span>Open to what's next</span>
          </div>

          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">Data · Analytics · Software</p>
              <h1 id="hero-title">
                Mike Zhao<span className="hero-period">.</span>
                <span className="hero-subtitle">Building at the intersection of data and software.</span>
              </h1>
              <p className="hero-description">
                I'm a technology professional whose work spans project management,
                product development, and analytics. Now I'm bringing that
                perspective into software engineering—with a focus on making
                analytics more reliable, testable, and built to last.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#work">
                  Explore selected work <span aria-hidden="true">↓</span>
                </a>
                <a className="text-link" href="https://github.com/mikezhao415">
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <aside className="hero-note" aria-label="Professional direction">
              <span className="note-index">A / 01</span>
              <p className="note-label">The throughline</p>
              <p className="note-statement">Better systems.<br />More useful data.<br />Thoughtful software.</p>
              <div className="note-bottom">
                <span>CURIOUS BY DESIGN</span>
                <span aria-hidden="true">↘</span>
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
            <p className="section-intro">A small, growing collection of work and the thinking behind it.</p>
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
                      <div className="art-bottomline"><span>THOUGHTFUL BY DEFAULT</span><span>↗</span></div>
                    </>
                  )}
                </div>
                <div className="project-body">
                  <div className="project-meta"><span>{project.type}</span><span>{project.number}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a className="project-link" href={project.href}>
                    {project.linkLabel} <span aria-hidden="true">↗</span>
                  </a>
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

          <div className="journey-panel">
            <div className="journey-aside">
              <span className="note-index">THE ARC / 01—03</span>
              <p>Not a list of titles. A progression of perspective.</p>
            </div>
            <ol className="journey-list">
              <li>
                <span className="journey-number">01</span>
                <div><h3>Data analyst</h3><p>Turning information into understanding and better decisions.</p></div>
                <span className="journey-symbol" aria-hidden="true">↘</span>
              </li>
              <li>
                <span className="journey-number">02</span>
                <div><h3>Analytics / BI engineer</h3><p>Bringing structure, testing, and repeatability into analytics.</p></div>
                <span className="journey-symbol" aria-hidden="true">↘</span>
              </li>
              <li>
                <span className="journey-number">03</span>
                <div><h3>Software builder</h3><p>Applying an engineering mindset to useful, durable products.</p></div>
                <span className="journey-symbol journey-symbol-current" aria-label="Current direction">↗</span>
              </li>
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
                  <li key={practice}><span>0{index + 1}</span>{practice}<span aria-hidden="true">↗</span></li>
                ))}
              </ul>
            </div>
            <div className="practice-group tech-group">
              <p className="practice-label">Current site stack</p>
              <ul className="tech-list">
                {technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              <div className="certifications">
                <p className="practice-label">Certifications</p>
                <p>No certifications are listed here. This site stays focused on work and experience that can be directly shown.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
          <div className="contact-card">
            <div className="contact-copy">
              <p className="eyebrow">04 / Contact</p>
              <h2 id="contact-title">Good work starts<br />with a conversation<span>.</span></h2>
              <p>I'm interested in thoughtful teams, useful problems, and the space where analytics meets software.</p>
            </div>
            <div className="contact-action">
              <span className="contact-label">FIND ME ON</span>
              <a href="https://github.com/mikezhao415" aria-label="Mike Zhao on GitHub">
                GitHub <span aria-hidden="true">↗</span>
              </a>
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

export const metadataDescription =
  "Mike Zhao is a technology professional working across analytics, BI engineering, and software—with an engineering mindset.";

export const metadataTitle = "Mike Zhao — Analytics, BI & Software";

export const metadataUrl = "https://mikezhao.dev";

export const metadataImageAlt = "Mike Zhao — Analytics, BI & Software";

export const metadataAuthor = "Mike Zhao";

export const metadataKeywords = ["Mike Zhao", "analytics engineering", "BI as Code", "software"];
