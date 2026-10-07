import assert from 'node:assert/strict';

const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:3100';
const response = await fetch(base);
assert.equal(response.status, 200);
const html = await response.text();
assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const expected of ['Project Management Professional (PMP)', 'Expires Aug 2027', 'Expired Sep 2025', 'Expired Jun 2022', 'Expired Dec 2021', 'September 28, 2026', 'January 12, 2024', 'March 9, 2020', 'Power BI', 'Management Science', 'mailto:mikezhao415@gmail.com', 'https://www.linkedin.com/in/mikezhao415/', 'https://github.com/mikezhao415/mikezhao.dev', 'Early-stage exploration', 'Generalized professional example']) {
  assert.ok(html.includes(expected), `Missing retained content: ${expected}`);
}
assert.ok(!html.includes('https://github.com/mikezhao415/bi-as-code'), 'Exploration must not link to an empty implementation');
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(html.includes(`id="${match[1]}"`), `Broken anchor: ${match[1]}`);
}
assert.ok(html.includes('rel="canonical" href="https://mikezhao.dev"'));
assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
const identity = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
assert.equal(identity['@type'], 'Person');
assert.equal(identity.jobTitle, 'Principal Data Informatics Analyst');
for (const path of ['/sitemap.xml', '/robots.txt', '/opengraph-image']) {
  const result = await fetch(new URL(path, base));
  assert.equal(result.status, 200, path);
  if (path === '/opengraph-image') {
    const bytes = Buffer.from(await result.arrayBuffer());
    assert.equal(bytes.readUInt32BE(16), 1200);
    assert.equal(bytes.readUInt32BE(20), 630);
  } else assert.ok((await result.text()).includes('https://mikezhao.dev'));
}
console.log('Portfolio content, anchors, metadata, structured data, and SEO routes passed.');
