import {
  capabilities,
  certifications,
  experience,
  selectedWork,
} from "../content/portfolio";

const navigation = [
  ["About", "about"],
  ["Experience", "experience"],
  ["Work", "work"],
  ["Contact", "contact"],
];

function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="section-heading">
      <p className="eyebrow">
        {number} / {subtitle}
      </p>
      <h2>{title}</h2>
    </header>
  );
}

export default function Home() {
  const identity = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mike Zhao",
    url: "https://mikezhao.dev",
    jobTitle: "Principal Data Informatics Analyst",
    sameAs: [
      "https://github.com/mikezhao415",
      "https://www.linkedin.com/in/mikezhao415/",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of California, San Diego",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(identity).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="shell">
        <header className="site-header">
          <a className="wordmark" href="#main" aria-label="Mike Zhao, home">
            Mike Zhao<span aria-hidden="true">.</span>
          </a>
          <nav aria-label="Main navigation">
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </header>
        <main id="main">
          <section className="hero" aria-labelledby="hero-title">
            <div>
              <p className="eyebrow">Data · Analytics Engineering · Software</p>
              <h1 id="hero-title">
                Understanding systems.
                <br />
                <span>Building better ways to work.</span>
              </h1>
              <p className="hero-copy">
                I’m Mike Zhao, a Principal Data Informatics Analyst. My work
                connects project delivery, process improvement, and analytics
                engineering. Outside my professional role, I build software and
                explore how engineering practices can make complex work more
                reliable.
              </p>
              <div className="hero-actions">
                <a className="button" href="#work">
                  Explore selected work <span aria-hidden="true">↘</span>
                </a>
                <a className="text-link" href="#about">
                  Meet Mike <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <aside className="hero-note">
              <span className="eyebrow">Based in</span>
              <p>
                San Diego,
                <br />
                California
              </p>
              <span className="note-line" />
              <span className="eyebrow">Current focus</span>
              <p>
                Reporting architecture.
                <br />
                BI as Code.
                <br />
                Software development.
              </p>
            </aside>
          </section>
          <section
            id="about"
            className="section about"
            aria-labelledby="about-title"
          >
            <div>
              <p className="eyebrow">01 / The through-line</p>
              <h2 id="about-title">
                A career built
                <br />
                on improving systems.
              </h2>
              <p className="journey">
                Deliver → Optimize → Analyze → Engineer → Build and influence
              </p>
            </div>
            <div className="prose">
              <p>
                I started in project management, learning to bring people,
                priorities, and delivery together. Earning my Project Management
                Professional (PMP) certification in August 2018 helped build
                that foundation, strengthening my approach to planning,
                stakeholder alignment, and execution.
              </p>
              <p>
                Lean Six Sigma reinforced my interest in removing friction and
                repetitive work. At Mitchell International, that interest led me
                into data informatics: first Excel and VBA automation, then
                Oracle SQL and Tableau, and eventually analytical data modeling
                and reporting architecture.
              </p>
              <p>
                As a Senior Data Informatics Analyst, I independently owned
                complex reporting solutions and developed Power BI expertise
                through self-directed learning and hands-on delivery. The work
                taught me to investigate unfamiliar data, test assumptions, and
                make technical decisions understandable to others.
              </p>
              <p>
                Since my promotion to Principal on September 28, 2026, I’m
                collaborating with my manager and colleagues to explore BI as
                Code. It’s an early conversation about bringing software
                engineering practices into analytics. My personal software
                projects give me another place to learn, experiment, and build.
              </p>
            </div>
          </section>
          <section id="experience" className="section" aria-label="Experience">
            <SectionHeading
              number="02"
              title="Experience"
              subtitle="From delivery to technical ownership"
            />
            <ol className="timeline">
              {experience.map((role, index) => (
                <li key={role.title + role.company}>
                  <div className="timeline-meta">
                    <p className="eyebrow">{role.company}</p>
                    <p className="dates">{role.dates}</p>
                  </div>
                  <div>
                    <h3>
                      {role.title}
                      {index === 0 && <span className="current">Current</span>}
                    </h3>
                    <p>{role.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <section id="work" className="section" aria-label="Selected work">
            <SectionHeading
              number="03"
              title="Selected work & ideas"
              subtitle="Practice, ownership, exploration"
            />
            <div className="work-grid">
              {selectedWork.map((item, index) => (
                <article className="work-card" key={item.title}>
                  <div className="card-top">
                    <p className="eyebrow">{item.category}</p>
                    <span aria-hidden="true">0{index + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="card-bottom">
                    <small>{item.note}</small>
                    {"href" in item && (
                      <a className="text-link" href={item.href}>
                        {item.linkLabel} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section id="skills" className="section" aria-label="Capabilities">
            <SectionHeading
              number="04"
              title="Capabilities"
              subtitle="Tools with a purpose"
            />
            <div className="skills-grid">
              {capabilities.map((group) => (
                <article key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <ul>
                    {group.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section
            id="credentials"
            className="section"
            aria-label="Education and certifications"
          >
            <SectionHeading
              number="05"
              title="Education & certifications"
              subtitle="Foundations and continued learning"
            />
            <div className="education">
              <p className="eyebrow">University of California, San Diego</p>
              <h3>BS, Management Science</h3>
              <p>2014</p>
            </div>
            <ul className="credentials">
              {certifications.map((item) => (
                <li key={item.name}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      {item.issuer} · Issued {item.issued}
                    </p>
                  </div>
                  <span
                    className={
                      item.expired
                        ? "credential-status expired"
                        : "credential-status"
                    }
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section
            id="contact"
            className="section contact"
            aria-labelledby="contact-title"
          >
            <div>
              <p className="eyebrow">06 / Start a conversation</p>
              <h2 id="contact-title">Let’s connect.</h2>
              <p>
                Interested in data, analytics engineering, or thoughtful
                software development? I’d enjoy comparing notes.
              </p>
            </div>
            <div className="contact-links">
              <a href="mailto:mikezhao415@gmail.com">
                mikezhao415@gmail.com <span aria-hidden="true">↗</span>
              </a>
              <a href="https://github.com/mikezhao415">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href="https://www.linkedin.com/in/mikezhao415/">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <p>Mike Zhao · San Diego, California</p>
          <p>A personal portfolio. Views are my own.</p>
          <a href="#main">Back to top ↑</a>
        </footer>
      </div>
    </>
  );
}
