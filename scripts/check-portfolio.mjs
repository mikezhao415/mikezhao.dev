import assert from 'node:assert/strict';

const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:3100';
const response = await fetch(base);
assert.equal(response.status, 200);
const html = await response.text();
assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const expected of ['Project Management Professional (PMP)', 'AWS Certified Cloud Practitioner', 'Tableau Desktop Certified Associate', 'Certified Scrum Product Owner (CSPO)', 'September 28, 2026', 'January 12, 2024', 'March 9, 2020', 'Power BI', 'Management Science', 'mailto:mikezhao415@gmail.com', 'https://www.linkedin.com/in/mikezhao415/', 'https://github.com/mikezhao415/mikezhao.dev', 'Early-stage exploration', 'Generalized professional example']) {
  assert.ok(html.includes(expected), `Missing retained content: ${expected}`);
}
assert.equal((html.match(/<span class="credential-expired"> \(expired\)<\/span>/g) || []).length, 3);
assert.ok(!html.includes('Expires Aug 2027') && !html.includes('Expired Sep 2025'));
assert.ok(html.includes('/icon.svg'));
assert.ok(!html.includes('https://github.com/mikezhao415/bi-as-code'), 'Exploration must not link to an empty implementation');
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(html.includes(`id="${match[1]}"`), `Broken anchor: ${match[1]}`);
}
assert.ok(html.includes('rel="canonical" href="https://mikezhao.dev"'));
assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
const identity = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
assert.equal(identity['@type'], 'Person');
assert.equal(identity.jobTitle, 'Principal Data Informatics Analyst');
for (const path of ['/sitemap.xml', '/robots.txt', '/opengraph-image', '/icon.svg']) {
  const result = await fetch(new URL(path, base));
  assert.equal(result.status, 200, path);
  if (path === '/opengraph-image') {
    const bytes = Buffer.from(await result.arrayBuffer());
    assert.equal(bytes.readUInt32BE(16), 1200);
    assert.equal(bytes.readUInt32BE(20), 630);
  } else if (path === '/icon.svg') assert.ok((await result.text()).includes('#202b26'));
  else assert.ok((await result.text()).includes('https://mikezhao.dev'));
}
console.log('Portfolio content, anchors, metadata, structured data, and SEO routes passed.');
