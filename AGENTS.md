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

## Portfolio design and content conventions (October 2026)

- The personal portfolio is not a studio or agency services page. Prefer clear, accurate language about data, systems, engineering practice, and professional growth; avoid overstating emerging work as delivered production outcomes.
- Preserve the established visual language and existing CSS theme tokens. Do not introduce new hex colors or a new palette for incremental polish. Keep Capabilities cards visually consistent, with legible contrast and intentional accent differences.
- Review both desktop and narrow mobile layouts. Avoid hard-coded heading line breaks that create awkward wrapping on phones; use responsive font sizing, line height, and natural text wrapping. Keep illustration eyebrow and footer labels secondary to the main artwork.
- Avoid decorative diagonal arrow glyphs that can render as emoji on mobile. Keep functional directional indicators only when they convey meaningful navigation.
- Use internal fragment links for on-page navigation, including Connect to `#contact`; use `mailto:hello@mikezhao.dev` for public email links. External GitHub/LinkedIn links open in a new tab with `target="_blank" rel="noopener noreferrer"`. Never publish a private forwarding inbox.
- Keep project metadata and illustration labels purposeful. Avoid redundant serial numbers and decorative labels when they add no value.
- Public certifications are historical entries: show name, issuer, and issue date in reverse chronological order. Do not add expiration/status fields or expired badges to the public content model. The private `mikezhao415/career` repository retains accurate expiration/verification records; removing public labels does not make an expired credential current.
- Keep the personal website, GitHub profile, and private career master consistent where relevant, while preserving private detail in the career repository. Do not modify unrelated CurrentArray, Coilbay, or First Course Studio repositories.

## Validation and deployment lessons (October 2026)

- When writing or appending CSS through connector/API scripts, distinguish actual newline characters from literal backslash-n text. **Never insert literal `\\n` tokens between CSS rules.** This twice caused PostCSS `CssSyntaxError: Unknown word \\n` in Vercel builds.
- After automated edits, re-fetch changed files and inspect the exact tail/changed region for syntax errors, unexpected escapes, and accidental formatting damage before considering the change complete.
- A successful earlier Preview deployment does not validate later commits. Confirm the **latest PR head SHA** has a successful Vercel build; do not report the PR as merge-ready based on a prior green deployment.
- If a build fails, inspect the deployment logs and fix the reported filename and line instead of guessing. Keep the branch and PR open while iterating, and do not claim validation passed without actual results.
- Review the complete PR diff for accidental changes, responsive regressions, stale presentation fields, and links. User approval of a visual Preview is useful but does not replace automated checks or a final diff review.
- Batch related visual refinements on the existing feature branch, keep commits reviewable, and prefer a squash merge after all checks and user approval.
