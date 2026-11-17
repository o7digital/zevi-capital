const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const path = require('node:path');

function load(relative, mocks = {}) {
  const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, relative), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const mod = { exports: {} };
  new Function('module', 'exports', 'require', source)(mod, mod.exports, name => {
    if (Object.prototype.hasOwnProperty.call(mocks, name)) return mocks[name];
    throw new Error(`Unexpected import ${name}`);
  });
  return mod.exports;
}

const pure = load('../src/lib/propertySeo.ts');
process.env.NEXT_PUBLIC_DIRECTUS_URL = 'https://properties.example.invalid';
const backend = load('../src/lib/publishedProperties.server.ts', { 'server-only': {}, react: { cache: fn => fn }, './propertySeo': pure });
const realFetch = global.fetch;

test('never exposes draft or missing properties and rejects invalid IDs before fetching', async () => {
  try {
    let called = 0;
    global.fetch = async () => { called++; return { ok: true, status: 200, json: async () => ({ data: { id: 20, status: 'draft', title: 'Draft' } }) }; };
    assert.equal(await backend.getPublishedProperty('../private'), null);
    assert.equal(await backend.getPublishedProperty('not-a-property-id'), null);
    assert.equal(await backend.getPublishedProperty('0'), null);
    assert.equal(called, 0);
    assert.equal(await backend.getPublishedProperty('20'), null);
    global.fetch = async () => ({ ok: false, status: 404 });
    assert.equal(await backend.getPublishedProperty('404'), null);
  } finally { global.fetch = realFetch; }
});

test('a backend outage throws instead of reporting that properties were removed', async () => {
  try {
    global.fetch = async () => ({ ok: false, status: 503 });
    await assert.rejects(backend.getPublishedProperties(), /503/);
    await assert.rejects(backend.getPublishedProperty('163'), /503/);
    global.fetch = async () => ({ ok: false, status: 403 });
    await assert.rejects(backend.getPublishedProperties(), /unavailable/);
  } finally { global.fetch = realFetch; }
});

test('only published titled inventory enters collections, and only public fields reach rendering', async () => {
  try {
    let requested;
    global.fetch = async url => { requested = String(url); return { ok: true, status: 200, json: async () => ({ data: [
      { id: 1, status: 'published', title: 'Terreno', cover_image: { id: 'cover', private_metadata: 'secret' }, seller_commission_amount: 99, photos: [{ id: 5, image: { id: 'photo', private_metadata: 'secret' }, commission_notes: 'secret' }] },
      { id: 2, status: 'draft', title: 'Draft' }, { id: 3, status: 'published', title: '' },
    ] }) }; };
    const data = await backend.getPublishedProperties();
    assert.deepEqual(data.map(p => p.id), [1]);
    assert.ok(!JSON.stringify(data).includes('secret'));
    assert.equal(data[0].seller_commission_amount, undefined);
    const query = new URL(requested).searchParams;
    assert.equal(query.get('filter[status][_eq]'), 'published');
    assert.ok(!query.get('fields').includes('*'));
    assert.equal(data[0].photos[0].image.id, 'photo');
  } finally { global.fetch = realFetch; }
});
