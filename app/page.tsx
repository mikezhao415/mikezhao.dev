const work = [
  {
    eyebrow: "Analytics engineering",
    title: "BI as Code",
    description:
      "Treating analytics as an engineered system: version-controlled models, automated validation, reusable metrics, and CI/CD.",
    href: "https://github.com/mikezhao415/bi-as-code",
  },
  {
    eyebrow: "Software engineering",
    title: "Production systems",
    description:
      "Building full-stack applications while applying deliberate architecture, testing, security, and deployment practices.",
    href: "#about",
  },
];

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-8 sm:px-10 lg:px-16">
      <nav className="flex items-center justify-between border-b border-[var(--line)] pb-5 text-sm">
        <a href="#" className="font-semibold tracking-tight">Mike Zhao</a>
        <div className="flex gap-5 text-[var(--muted)]">
          <a href="#work" className="hover:text-[var(--foreground)]">Work</a>
          <a href="#about" className="hover:text-[var(--foreground)]">About</a>
          <a href="https://github.com/mikezhao415" className="hover:text-[var(--foreground)]">GitHub</a>
        </div>
      </nav>

      <section className="grid min-h-[70vh] content-center py-20 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Data · Analytics · Software
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-7xl">
            I build analytics and software with an engineering mindset.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            I&apos;m Mike Zhao, a data analyst moving deeper into analytics engineering and software development.
            My current focus is BI as Code: bringing version control, testing, automation, and CI/CD into the analytics workflow.
          </p>
        </div>
      </section>

      <section id="work" className="border-t border-[var(--line)] py-20">
        <div className="mb-12 flex items-baseline justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight">Selected work</h2>
          <span className="text-sm text-[var(--muted)]">Building in public</span>
        </div>
        <div className="grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
          {work.map((item) => (
            <a key={item.title} href={item.href} className="group bg-[var(--background)] p-8 transition hover:bg-white">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent)]">{item.eyebrow}</p>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 max-w-md leading-7 text-[var(--muted)]">{item.description}</p>
              <p className="mt-8 text-sm font-medium">Explore <span aria-hidden="true">↗</span></p>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="grid gap-10 border-t border-[var(--line)] py-20 lg:grid-cols-12">
        <h2 className="text-3xl font-semibold tracking-tight lg:col-span-4">The journey</h2>
        <div className="max-w-2xl lg:col-span-7 lg:col-start-6">
          <p className="text-2xl leading-9 tracking-tight">
            Data Analyst <span className="text-[var(--muted)]">→</span> Analytics / BI Engineer <span className="text-[var(--muted)]">→</span> Software Builder
          </p>
          <p className="mt-6 leading-7 text-[var(--muted)]">
            I&apos;m documenting not only finished dashboards and applications, but the architecture, automation,
            testing, and decisions behind them. The goal is reliable systems—not just polished outputs.
          </p>
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-[var(--line)] py-8 text-sm text-[var(--muted)] sm:flex-row sm:justify-between">
        <span>Mike Zhao · San Diego, California</span>
        <a href="https://github.com/mikezhao415" className="hover:text-[var(--foreground)]">github.com/mikezhao415</a>
      </footer>
    </main>
  );
}
