# mikezhao.dev

Source for [mikezhao.dev](https://mikezhao.dev), Mike Zhao's personal career and portfolio website.

**Data · Engineering · Design** connects professional analytics and business intelligence work with independent software development and engineering experiments. BI as Code is presented as exploration, not a claim of organization-wide adoption.

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

The smoke test checks current public content, fragment links, metadata, structured data, robots, sitemap, favicon, and the 1200 × 630 Open Graph image. It is not a substitute for Lighthouse, accessibility, production HTTP, or social-preview verification.

## Content

- `content/portfolio.ts`: experience, selected work, capabilities, and certifications.
- `app/portfolio-home.tsx`: narrative and section layout; `app/page.tsx`: Person structured data.
- `app/globals.css`: typography, palette, responsive layout, focus states, and reduced-motion support.
- `app/layout.tsx`, `app/opengraph-image.tsx`, `app/robots.ts`, and `app/sitemap.ts`: identity and search/social metadata.

Use **month and year only** for public career dates. Show certification names, issuers, and issue dates without public expiration/status labels; maintain accurate private records. Distinguish professional responsibilities from personal projects. Keep employer examples generalized; never add proprietary implementation details, unapproved metrics, customer information, or credential IDs. Professional examples are personal descriptions, not employer endorsements.

The secondary hero CTA **My experience** links to the on-page Professional Direction section (`#journey`); do not replace it with a résumé link without a new decision.

## Deployment and review

Vercel is the sole production platform through Git integration; `main` is the production branch. PR branches ordinarily create previews. Merging into `main` triggers production deployment.

Follow `AGENTS.md` for local-assisted and remote validation. Remote PRs use the `remote-validation` label to run the existing Node 22 CI checks.
