# mikezhao.dev

The source code for [mikezhao.dev](https://mikezhao.dev), my personal portfolio bringing together experience in data analytics, business intelligence, software engineering, and design.

**Data · Engineering · Design**

The site also provides a home for technical experiments exploring modern analytics architectures, BI as Code, and practical applications of software engineering to business problems. These experiments represent independent exploration, not claims of organization-wide adoption.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, GitHub, and Vercel. The portfolio uses server-rendered content with small client components for contextual navigation and back-to-top interaction.

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
# In another terminal, check the running production server at http://127.0.0.1:3000:
npm test
```

The smoke test defaults to `http://127.0.0.1:3000`. Set `PORTFOLIO_TEST_URL` to check a server running at a different address. It checks homepage content and fragment links, all three AdventureWorks case-study routes and their canonical and social metadata, structured data, robots, explicit sitemap entries, favicon, and the 1200 x 630 Open Graph image. It is not a substitute for Lighthouse, accessibility, production HTTP, or social-preview verification.

## Project structure

- `content/portfolio.ts`: experience, selected work, capabilities, and certifications.
- `app/portfolio-home.tsx`: narrative and section layout; `app/page.tsx`: Person structured data.
- `app/globals.css`: typography, palette, responsive layout, focus states, and reduced-motion support.
- `app/layout.tsx`, `app/opengraph-image.tsx`, `app/robots.ts`, and `app/sitemap.ts`: identity and search/social metadata.

## Deployment and review

Vercel is the production platform through Git integration; `main` is the production branch. Pull requests ordinarily create preview deployments. Merging into `main` triggers production deployment.

See [AGENTS.md](AGENTS.md) for repository conventions and validation workflows. Remote pull requests can use the `remote-validation` label to run Node 22 CI checks.

## Browser interaction tests

After `npm ci`, install the test browser once with `npx playwright install chromium`.
Run `npm run build`, then `npm run test:e2e`. Playwright starts a production server
on port 3100 and checks shared navigation, mobile dismissal and keyboard behavior,
active pages, narrow layouts, and back-to-top behavior including reduced motion.
Use `npm test` separately against the production server (port 3000 by default,
or set `PORTFOLIO_TEST_URL`). No GitHub Actions workflow changes are required.
