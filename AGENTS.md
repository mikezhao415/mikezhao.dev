# AGENTS.md

## Purpose

This repository is the canonical source for Mike Zhao's professional site at mikezhao.dev.

The site should demonstrate the same engineering discipline it describes: clear architecture, accessible UI, automated validation, reviewable changes, and a reliable static deployment.

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
- Static export for GitHub Pages
- Keep dependencies minimal.
- Prefer semantic HTML and accessible interactions.
- Keep content easy to update without redesigning components.
- Never commit secrets or environment-specific credentials.

## Workflow

- Develop changes on focused branches and review them through pull requests.
- Before merging application changes, run lint, typecheck, and build.
- Keep main deployable.
- GitHub Actions publishes the static export to GitHub Pages after validation on main.
