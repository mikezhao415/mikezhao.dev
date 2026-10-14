# mikezhao.dev

The source code for [mikezhao.dev](https://mikezhao.dev), my personal portfolio bringing together experience in data analytics, business intelligence, software engineering, and design.

**Data · Engineering · Design**

The site also provides a home for technical experiments exploring modern analytics architectures, BI as Code, and practical applications of software engineering to business problems. These experiments represent independent exploration, not claims of organization-wide adoption.

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
# In another terminal, check the running production server:
npm test
```

The smoke test checks public content, fragment links, metadata, structured data, robots, sitemap, favicon, and the 1200 × 630 Open Graph image. It is not a substitute for Lighthouse, accessibility, production HTTP, or social-preview verification.

## Project structure

- `content/portfolio.ts`: experience, selected work, capabilities, and certifications.
- `app/portfolio-home.tsx`: narrative and section layout; `app/page.tsx`: Person structured data.
- `app/globals.css`: typography, palette, responsive layout, focus states, and reduced-motion support.
- `app/layout.tsx`, `app/opengraph-image.tsx`, `app/robots.ts`, and `app/sitemap.ts`: identity and search/social metadata.

## Deployment and review

Vercel is the production platform through Git integration; `main` is the production branch. Pull requests ordinarily create preview deployments. Merging into `main` triggers production deployment.

See [AGENTS.md](AGENTS.md) for repository conventions and validation workflows. Remote pull requests can use the `remote-validation` label to run Node 22 CI checks.
