import assert from 'node:assert/strict';

const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:3000';
const fetchRoute = async (path) => {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff', `${path}: nosniff`);
  assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin', `${path}: referrer policy`);
  return response;
};

const html = await (await fetchRoute('/')).text();
const approvedDescription = "Explore Mike Zhao's professional analytics experience and independent software projects, including AdventureWorks Analytics, a published BI-as-Code case study.";
const socialAlt = "Mike Zhao: From data analysis to software development.";

assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const expected of [
  'Project Management Professional (PMP)', 'AWS Certified Cloud Practitioner',
  'Tableau Desktop Certified Associate', 'Certified Scrum Product Owner (CSPO)',
  'September 2026', 'January 2024', 'March 2020', 'Power BI',
  'Management Science', 'mailto:hello@mikezhao.dev',
  'https://www.linkedin.com/in/mikezhao415/',
  'https://github.com/mikezhao415/mikezhao.dev',
  'Separately, I explore BI as Code through independent projects.', 'Independent analytics engineering project',
  'Built with fictional Microsoft AdventureWorks 2022 sample data.',
  'Get in touch', 'My experience',
]) {
  assert.ok(html.includes(expected), `Missing retained content: ${expected}`);
}
assert.ok(!/September 28, 2026|January 12, 2024|March 9, 2020/.test(html), 'Public career dates must not include days');
assert.ok(!html.includes('credential-expired') && !html.includes('Expires Aug 2027'));
assert.ok(!html.includes('mailto:mikezhao415@gmail.com'), 'Old contact email must not be public');
assert.ok(html.includes('href="#journey"') && html.includes('My experience'));
assert.ok(html.includes('href="#contact"') && html.includes('Get in touch'));
assert.ok(html.includes('/icon.svg'));
assert.ok(!html.includes('https://github.com/mikezhao415/bi-as-code'));
assert.ok(!html.includes('Python coursework'));
assert.ok(html.includes('Building at the intersection of data and software.'));
assert.ok(html.includes('I built a reproducible analytics pipeline using Python, dbt, and DuckDB, with automated validation and a published dashboard.'));
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(html.includes(`id="${match[1]}"`), `Broken anchor: ${match[1]}`);
}
assert.ok(html.includes('rel="canonical" href="https://mikezhao.dev"'));
assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
assert.ok(html.includes('property="og:title"'));
assert.ok(html.includes('property="og:description"'));
assert.ok(html.includes('name="twitter:image"') || html.includes('property="og:image"'));
const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
assert.ok(match, 'Person structured data is missing');
const identity = JSON.parse(match[1]);
assert.equal(identity['@type'], 'Person');
assert.equal(identity.jobTitle, 'Principal Data Informatics Analyst');
const caseRoutes = [
  {
    path: '/projects/adventureworks-analytics',
    title: 'AdventureWorks Analytics | Mike Zhao',
    description: 'An independent BI-as-Code case study: transactional extraction, tested analytical models, reconciliation and a published sales dashboard.',
    content: ['From transactional data to trusted analytics', '23 real-source dbt models', 'Two perspectives on one system'],
  },
  {
    path: '/projects/adventureworks-analytics/business',
    title: 'The Business Case for Better Analytics | Mike Zhao',
    description: 'Why an analytical layer can improve the consistency and maintainability of reporting, and what the AdventureWorks experiment does and does not prove.',
    content: ['Better analytics starts before the dashboard', 'Conceptual comparison, not a measured benchmark.', 'What the experiment actually demonstrates'],
  },
  {
    path: '/projects/adventureworks-analytics/technical',
    title: 'Technical Implementation | AdventureWorks Analytics | Mike Zhao',
    description: 'A reproducible SQL Server, Python, Parquet, DuckDB and dbt analytics workflow with independent validation and a Next.js dashboard.',
    content: ['Engineering analytics as a reproducible system', '31,465', '121,317', 'Historical extraction baseline'],
  },
];
// Read attributes independently of tag attribute order and decode HTML metadata.
const decodeAttribute = (value) => value.replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decodeAttribute(match[2])]));
const homeMetadata = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
for (const key of ['description', 'og:description', 'twitter:description']) {
  assert.equal(homeMetadata.find(tag => tag.name === key || tag.property === key)?.content, approvedDescription);
}
assert.equal(homeMetadata.find(tag => tag.property === 'og:image:alt')?.content, socialAlt);
assert.equal(homeMetadata.find(tag => tag.name === 'twitter:image:alt')?.content, socialAlt);
assert.ok(html.includes('class="capability-list"'));
assert.ok(!html.includes('capability-card'));
for (const route of caseRoutes) {
  const routeHtml = await (await fetchRoute(route.path)).text();
  const eyebrow = route.path.endsWith('/business') ? 'Business perspective' : route.path.endsWith('/technical') ? 'Technical perspective' : 'BI-AS-CODE';
  assert.ok(routeHtml.includes(`<p class="case-eyebrow">${eyebrow}</p>`), `${route.path}: hero eyebrow`);
  assert.ok(routeHtml.includes('https://adventureworks.mikezhao.dev/'));
  for (const [, target] of routeHtml.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(routeHtml.includes(`id="${target}"`), `${route.path}: broken fragment ${target}`);
  }
  assert.equal((routeHtml.match(/<h1\b/g) || []).length, 1, `${route.path}: one h1`);
  assert.equal(decodeAttribute(routeHtml.match(/<title>(.*?)<\/title>/s)?.[1] || ''), route.title, `${route.path}: HTML title`);
  for (const content of route.content) {
    assert.ok(routeHtml.includes(content), `${route.path}: missing ${content}`);
  }
  const metaTags = [...routeHtml.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const meta = (key) => {
    const matches = metaTags.filter((tag) => tag.name === key || tag.property === key);
    assert.equal(matches.length, 1, `${route.path}: exactly one ${key}`);
    assert.ok(matches[0].content, `${route.path}: nonempty ${key}`);
    return matches[0].content;
  };
  const canonical = [...routeHtml.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).filter((tag) => tag.rel === 'canonical');
  assert.equal(canonical.length, 1, `${route.path}: one canonical`);
  assert.equal(canonical[0].href, `https://mikezhao.dev${route.path}`);
  assert.equal(meta('og:url'), canonical[0].href);
  assert.equal(meta('og:title'), route.title);
  assert.equal(meta('twitter:title'), route.title);
  assert.equal(meta('description'), route.description);
  assert.equal(meta('og:description'), route.description);
  assert.equal(meta('twitter:description'), meta('description'));
  assert.equal(meta('twitter:card'), 'summary_large_image');
  for (const key of ['og:image', 'twitter:image']) {
    const imageUrl = new URL(meta(key));
    assert.equal(imageUrl.origin, 'https://mikezhao.dev');
    assert.equal(imageUrl.pathname, '/opengraph-image');
  }
  assert.equal(meta('og:image:width'), '1200');
  assert.equal(meta('og:image:height'), '630');
  if (route.path.endsWith('/technical')) {
    assert.ok(routeHtml.includes('https://github.com/mikezhao415/adventureworks-analytics/blob/main/docs/reproducibility.md'));
    assert.ok(routeHtml.includes('The reproduction guide separates running the dashboard locally'));
    assert.ok(routeHtml.includes('A fresh full-source run is separate from this documentation.'));
    assert.ok(!routeHtml.includes('a consolidated reproduction guide is part of the remaining publication work'));
  }
  assert.equal(meta('og:image:alt'), socialAlt);
  assert.equal(meta('twitter:image:alt'), socialAlt);
}
const sitemap = await (await fetchRoute('/sitemap.xml')).text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'Sitemap entries must be unique');
for (const expected of ['https://mikezhao.dev', ...caseRoutes.map(({ path }) => `https://mikezhao.dev${path}`)]) {
  assert.ok(sitemapUrls.includes(expected), `Missing sitemap entry: ${expected}`);
}
const robots = await (await fetchRoute('/robots.txt')).text();
assert.ok(robots.includes('https://mikezhao.dev/sitemap.xml'));
const imageResponse = await fetchRoute('/opengraph-image');
assert.match(imageResponse.headers.get('content-type') || '', /^image\/png/);
const image = Buffer.from(await imageResponse.arrayBuffer());
assert.equal(image.toString('ascii', 1, 4), 'PNG');
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
const icon = await (await fetchRoute('/icon.svg')).text();
assert.ok(icon.includes('#202b26'));
for (const [pattern, type] of [
  [/<script[^>]+src="([^"]+)"/, /javascript/],
  [/<link\b(?=[^>]*rel="stylesheet")[^>]*href="([^"]+)"/, /text\/css/],
]) {
  const asset = html.match(pattern)?.[1];
  assert.ok(asset, `Missing emitted asset: ${type}`);
  const response = await fetchRoute(decodeAttribute(asset));
  assert.match(response.headers.get('content-type') || '', type);
}
console.log('Portfolio and AdventureWorks content, metadata, images, sitemap, headers and asset MIME types passed.');
