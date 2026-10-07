# mikezhao.dev

Source for [mikezhao.dev](https://mikezhao.dev), Mike Zhao's personal career and portfolio website.

**Data · Analytics Engineering · Software** connects a career in project management, process improvement, data informatics, and reporting architecture with personal software development. BI as Code is described as an early-stage exploration.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, GitHub, and Vercel. The portfolio uses server-rendered content without additional client libraries or form infrastructure.

## Development

```bash
npm ci
npm run dev
```

Validation and production serving:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Content

- `content/portfolio.ts`: experience, selected work, capabilities, and certifications.
- `app/page.tsx`: narrative and section layout.
- `app/globals.css`: typography, palette, responsive layout, focus states, and reduced-motion support.
- `app/layout.tsx`, `app/opengraph-image.tsx`, `app/robots.ts`, and `app/sitemap.ts`: identity and search/social metadata.

Preserve exact titles and promotion dates. Label expired credentials accurately and distinguish professional responsibilities from personal projects. Keep employer examples generalized; never add proprietary implementation details, unapproved metrics, customer information, or credential IDs. Professional examples are personal descriptions, not employer endorsements.

## Deployment and review

Vercel is the sole production platform through Git integration; `main` is the production branch. PR branches ordinarily create previews. The `feature/career-portfolio` branch is explicitly excluded from automatic deployment in `vercel.json` while its content awaits publication approval. After approval, remove that branch exclusion if a Preview deployment is desired. Merging into `main` triggers production deployment.

Follow `AGENTS.md` for local-assisted and remote validation. Remote PRs use the `remote-validation` label to run the existing Node 22 CI checks.
