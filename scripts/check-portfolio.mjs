import assert from 'node:assert/strict';

const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:3100';
const fetchRoute = async (path) => {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  return response;
};

const html = await (await fetchRoute('/')).text();
assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const expected of [
  'Project Management Professional (PMP)', 'AWS Certified Cloud Practitioner',
  'Tableau Desktop Certified Associate', 'Certified Scrum Product Owner (CSPO)',
  'September 2026', 'January 2024', 'March 2020', 'Power BI',
  'Management Science', 'mailto:hello@mikezhao.dev',
  'https://www.linkedin.com/in/mikezhao415/',
  'https://github.com/mikezhao415/mikezhao.dev',
  'This work is at an early stage.', 'Get in touch', 'My experience',
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
const sitemap = await (await fetchRoute('/sitemap.xml')).text();
assert.ok(sitemap.includes('https://mikezhao.dev'));
const robots = await (await fetchRoute('/robots.txt')).text();
assert.ok(robots.includes('https://mikezhao.dev/sitemap.xml'));
const image = Buffer.from(await (await fetchRoute('/opengraph-image')).arrayBuffer());
assert.equal(image.toString('ascii', 1, 4), 'PNG');
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
const icon = await (await fetchRoute('/icon.svg')).text();
assert.ok(icon.includes('#202b26'));
console.log('Portfolio content, links, metadata, structured data, and SEO routes passed.');
