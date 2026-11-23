const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const path = require('node:path');
const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../src/lib/propertySeo.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const mod = { exports: {} };
new Function('module', 'exports', source)(mod, mod.exports);
const seo = mod.exports;

const land = { id: 163, status: 'published', title: 'Terreno en venta en La Paz, Baja California Sur | 79 hectáreas', description: '<p>Terreno en venta en La Paz, Baja California Sur, con una superficie de 79 hectáreas.</p>', location: 'La Paz, Baja California Sur, México', property_type: 'Terreno', operation_type: 'venta', price: 28000000, currency: 'USD' };

test('uses actual state and municipality, handles accents and never invents missing geography', () => {
  assert.deepEqual(seo.propertyGeography(land), { location: land.location, state: 'Baja California Sur', city: 'La Paz', stateSlug: 'baja-california-sur', citySlug: 'la-paz' });
  assert.equal(seo.propertyGeography({ location: 'Centro, Mérida, Yucatán' }).citySlug, 'merida');
  assert.equal(seo.propertyGeography({ location: 'Guadalupe Inn, Álvaro Obregón, CDMX' }).state, 'Ciudad de México');
  assert.equal(seo.propertyGeography({ location: 'Cuautitlan Izcalli' }).state, '');
  assert.equal(seo.propertyGeography({}).state, '');
  assert.equal(seo.propertyGeography({ address: 'Mérida, Yucatán' }).state, 'Yucatán');
});

test('preserves existing listing URLs and existing title wording in automatic metadata', () => {
  assert.equal(seo.propertyPath(land), '/listing_details_01?id=163');
  const result = seo.propertySeo(land);
  assert.equal(result.url, 'https://www.zevicapital.com/listing_details_01?id=163');
  assert.equal(result.title, land.title + ' | ZeVi Capital');
  assert.ok(result.searchPhrases.includes('terreno en venta en La Paz, Baja California Sur'));
  assert.ok(!result.description.includes('<p>'));
  assert.ok(result.description.length <= 160);
});

test('does not advertise a guessed transaction or a guessed location', () => {
  assert.deepEqual(seo.propertyTransactions({ operation_type: 'Por confirmar', tag: 'FOR SALE' }), []);
  assert.deepEqual(seo.propertyTransactions({ operation_type: 'rental', tag: 'FOR SALE' }), ['renta']);
  assert.deepEqual(seo.propertyTransactions({ operation_type: 'Venta y renta' }), ['venta', 'renta']);
  const unlocated = { id: 9, title: 'Desarrollo A', property_type: 'Desarrollo', operation_type: 'Por confirmar' };
  assert.deepEqual(seo.propertySearchPhrases(unlocated), []);
  assert.ok(!seo.propertySeo(unlocated).title.includes('Estado de México'));
  assert.ok(!seo.propertySeo(unlocated).description.includes('venta'));
});

test('newly published inventory creates geographic URLs and crosses the indexing threshold automatically', () => {
  const future = { id: 999, status: 'published', title: 'Nuevo terreno', property_type: 'Terreno', operation_type: 'Venta', location: 'Mérida, Yucatán' };
  assert.deepEqual(seo.propertyTypes({ ...future, property_type: 'Terreno industrial' }).map(type => type.slug), ['terrenos']);
  const one = seo.buildPropertyCatalogs([future]);
  assert.equal(one.get('/propiedades/yucatan/merida').properties[0].id, 999);
  assert.equal(one.get('/propiedades/yucatan/merida').indexable, false);
  assert.ok(one.has('/propiedades/yucatan/merida/tipo/terrenos'));
  const three = seo.buildPropertyCatalogs([future, { ...future, id: 1000 }, { ...future, id: 1001 }]);
  assert.equal(three.get('/propiedades/yucatan/merida/tipo/terrenos').indexable, true);
  assert.equal(three.has('/propiedades/yucatan/ciudad-inventada'), false);
  assert.ok(seo.propertyGeographicLinks(future).every(link => three.has(link.path)));
  assert.equal(seo.propertyPath({ ...future, title: 'Título modificado' }), seo.propertyPath(future));
});

test('every generated navigation link resolves to an actual collection and no collection is empty', () => {
  const inventory = [land, { ...land, id: 164 }, { ...land, id: 165 }, { id: 170, title: 'Oficina', property_type: 'Oficina', location: 'Centro, Mérida, Yucatán', operation_type: 'renta' }];
  const catalogs = seo.buildPropertyCatalogs(inventory);
  for (const catalog of catalogs.values()) {
    assert.ok(catalog.properties.length > 0);
    for (const link of seo.catalogChildLinks(catalog, catalogs)) assert.ok(catalogs.has(link.path));
  }
  for (const p of inventory) for (const link of seo.propertyGeographicLinks(p)) assert.ok(catalogs.has(link.path));
});

test('does not publish false prices, per-area prices as totals, or empty geocoordinates', () => {
  const schema = seo.propertyListingSchema(land, []);
  assert.equal(schema.offers.price, 28000000);
  assert.equal(schema.offers.priceCurrency, 'USD');
  assert.ok(!seo.propertyListingSchema({ ...land, price: 0 }, []).offers);
  assert.ok(!seo.propertyListingSchema({ ...land, currency: undefined }, []).offers);
  assert.ok(!seo.propertyListingSchema({ ...land, price: 200, price_text: '$200 MXN por m²' }, []).offers);
  assert.ok(!seo.propertyListingSchema({ ...land, operation_type: 'Por confirmar' }, []).offers);
  assert.ok(!seo.propertyListingSchema({ ...land, latitude: '', longitude: '' }, []).about.geo);
  assert.deepEqual(seo.propertyListingSchema({ ...land, latitude: 24.14, longitude: -110.31 }, []).about.geo, { '@type': 'GeoCoordinates', latitude: 24.14, longitude: -110.31 });
});

test('cleans HTML entities and prevents listing data from breaking out of JSON-LD scripts', () => {
  assert.equal(seo.propertyPlainText('<p>M&eacute;rida &amp; Yucat&aacute;n &#x2014; 42 m&sup2;</p><script>alert(1)</script>'), 'Mérida & Yucatán — 42 m²');
  const unsafe = { title: '</script><script>alert(1)</script>' };
  const json = seo.serializeSeoJson(unsafe);
  assert.ok(!json.includes('</script>'));
  assert.deepEqual(JSON.parse(json), unsafe);
});
