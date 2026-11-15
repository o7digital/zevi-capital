import assert from 'node:assert/strict';
import test from 'node:test';

const base = process.env.TEST_BASE_URL || 'http://localhost:3100';
const canonicalBase = 'https://www.zevicapital.com';
const routes = ['/', '/about_us_01', '/services', '/insurance', '/contact', '/services/industrial-logistics', '/services/retail-expansion', '/services/capital-markets', '/services/research-market-intelligence'];
const titles = new Set();

async function page(path) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, `${path} responds successfully`);
  return { response, html: await response.text() };
}

for (const route of routes) {
  test(`${route}: rendered content, metadata, canonical and indexability`, async () => {
    const { response, html } = await page(route);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, 'one server-rendered H1');
    assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/, 'public route can be indexed');
    assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/);
    const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
    assert.equal(canonical?.[1], `${canonicalBase}${route}`, 'canonical URL remains stable');
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title?.includes('ZeVi Capital'));
    assert.ok(!titles.has(title), 'unique page title');
    titles.add(title);
    assert.match(html, /<meta[^>]+name="description"[^>]+content="[^"]{40,}"/);
    assert.match(html, /href="\/contact(?:\?|&quot;|")/);
    if (route === '/') {
      assert.equal(title, 'Inversión Inmobiliaria en Zona Esmeralda y Estado de México | ZeVi Capital', 'protect established homepage title');
      assert.match(html, /Consultoría inmobiliaria en Zona Esmeralda/);
      assert.match(html, /<h2[^>]*>Inversión inmobiliaria en Zona Esmeralda y Estado de México<\/h2>/);
      const image = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/)?.[1];
      assert.ok(image, 'homepage has a share image');
      assert.equal((await fetch(`${base}${new URL(image).pathname}`)).status, 200, 'share image exists');
    }
    if (route.startsWith('/services/') || route === '/insurance') {
      const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
      const serviceGraph = scripts.find(value => value['@graph']);
      assert.ok(serviceGraph, 'service structured data is valid JSON');
      assert.ok(serviceGraph['@graph'].some(value => value['@type'] === 'Service'));
      const breadcrumb = serviceGraph['@graph'].find(value => value['@type'] === 'BreadcrumbList');
      assert.equal(breadcrumb?.itemListElement.at(-1)?.item, `${canonicalBase}${route}`);
    }
  });
}

test('sitemap contains all public service routes and omits demonstration pages', async () => {
  const { html } = await page('/sitemap.xml');
  for (const route of routes) assert.ok(html.includes(`<loc>${canonicalBase}${route === '/' ? '' : route}</loc>`) || (route === '/' && html.includes(`<loc>${canonicalBase}/</loc>`)), route);
  assert.doesNotMatch(html, /\/home-two|\/insights|\/service_01/);
});

test('robots allows established URLs and keeps template pages excluded', async () => {
  const { html } = await page('/robots.txt');
  assert.match(html, /Allow: \/services/);
  assert.match(html, /Allow: \/listing_details_01/);
  assert.match(html, /Disallow: \/dashboard\//);
  assert.match(html, /Sitemap: https:\/\/www\.zevicapital\.com\/sitemap\.xml/);
  const demo = await page('/home-two');
  assert.match(demo.response.headers.get('x-robots-tag') || '', /noindex/);
});

test('unknown service paths return 404', async () => {
  const response = await fetch(`${base}/services/not-a-service`);
  assert.equal(response.status, 404);
});
