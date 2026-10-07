# AGENTS.md

## Purpose

This repository is the canonical source for Mike Zhao's professional site at mikezhao.dev.

The site should demonstrate the same engineering discipline it describes: clear architecture, accessible UI, automated validation, reviewable changes, and a reliable deployment.

## Product direction

Position Mike's professional journey as:

**Data Analyst → Analytics / BI Engineer → Software Builder**

Primary themes:
- BI as Code
- analytics engineering
- automation
- software development
- responsible AI-assisted engineering

Favor evidence and case studies over generic skill lists. Do not expose private employer information, credentials, secrets, or proprietary source code. Commercial/private projects may be described only through sanitized case studies.

## Engineering

- Next.js App Router + TypeScript
- Tailwind CSS
- Vercel deployment through the repository's Git integration
- Keep dependencies minimal.
- Prefer semantic HTML and accessible interactions.
- Keep content easy to update without redesigning components.
- Never commit secrets or environment-specific credentials.

## Workflow

- GitHub is the public source of truth. Develop changes on focused branches and review them through pull requests.
- Before merging application changes, run lint, typecheck, and build.
- Local-assisted development means the user has the repository locally and runs validation locally. Do not duplicate routine validation in GitHub Actions unless requested.
- Remote development should use GitHub validation before merge: add the `remote-validation` PR label to run CI on PR updates. Manual validation is also available through CI's `workflow_dispatch` trigger.
- Validation uses Node 22 and consists of `npm ci`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- Never claim local validation unless it actually ran successfully.
- Keep `main` deployable.
- Vercel is the sole production deployment platform. `main` is the production branch; pull requests and non-production branches receive Vercel Preview deployments.
- Do not add a second production deployment path through GitHub Pages or GitHub Actions unless explicitly requested.
- Deployment configuration changes must preserve the local-assisted vs. remote-validation workflow above.
