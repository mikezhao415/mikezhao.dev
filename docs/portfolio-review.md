# Portfolio publication review

## Implemented scope

A single-page personal portfolio with About, Experience, Selected Work, Capabilities, Education & Certifications, and Contact. Preserves the existing cream/green palette and minimal Next.js stack. Adds semantic landmarks, keyboard focus and skip navigation, responsive grids, reduced-motion support, canonical metadata, an Open Graph image, Person structured data, sitemap, and robots configuration.

Contact uses direct email and profile links. No contact form, tracking service, or new application dependency is introduced.

## Publication decisions

Before approving deployment, review:

- The generalized professional reporting descriptions, including technical ownership and Power BI introduction. Product names, model dimensions, schemas, customer references, technology constraints, and numerical outcomes are omitted.
- Career narrative, exact titles/dates, and Entra Health / CRF Health naming.
- Credential names and supplied expiration dates. No credential IDs are included; credentials have not been independently verified with issuers.
- Tone and level of detail. BI as Code remains explicitly exploratory, and personal software experience is separately labeled.

The public BI-as-Code repository was empty during the audit, so it is not presented as an implemented project. This website is the verified personal software example. Additional projects can be added after inspecting their actual implementation and agreeing on public descriptions.

## Approval boundary

Do not merge or deploy the new content until Mike approves. `vercel.json` excludes this feature branch from automatic deployment. Production remains controlled by the existing `main` Git integration.

## Validation

- `npm ci`, lint, typecheck, and production build passed in the Work environment (Node 24.19.0).
- Built HTML checks passed for exact chronology, expired credentials, anchor targets, a single h1, JSON-LD, Open Graph metadata, and omitted confidential information.
- Built sitemap and robots content verified; generated social image confirmed as a 1200 × 630 PNG and visually reviewed.
- Mobile/desktop browser and keyboard interaction verification remains outstanding: Chromium download returned truncated archives, and an alternate bundled Chromium extraction failed in this environment. Responsive breakpoints, semantic markup, skip navigation, focus styles, and reduced-motion support were reviewed in source; this does not replace browser testing.
- Existing Node 22 GitHub CI requested with `remote-validation`; its result is tracked on the PR.
