const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');
const source = ts.transpileModule(fs.readFileSync('src/lib/propertyPresentation.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const utils = { exports: {} };
new Function('module', 'exports', source)(utils, utils.exports);
const { propertyOperations, formatPropertyPrice, propertyPriceBasis, filterProperties, defaultPropertyFilters, propertyShareUrl } = utils.exports;

test('recognizes Spanish, English and combined operations without inventing a sale', () => {
  for (const value of ['Renta', 'rental', 'FOR RENT']) assert.deepEqual(propertyOperations({ operation_type: value }), ['rent']);
  for (const value of ['Venta', 'sale', 'FOR SALE']) assert.deepEqual(propertyOperations({ tag: value }), ['sale']);
  assert.deepEqual(propertyOperations({ operation_type: 'Venta y renta' }), ['sale', 'rent']);
  assert.deepEqual(propertyOperations({ operation_type: 'Por confirmar' }), []);
});
test('preserves the actual price terms and distinguishes total from per-m² amounts', () => {
  const perArea = { price: 60, currency: 'MXN', price_text: '$60 MXN por m² · 200 hectáreas' };
  const total = { price: 56750000, price_text: '$56,750,000 MXN | $10,000 MXN por m²' };
  assert.equal(formatPropertyPrice(perArea), perArea.price_text);
  assert.equal(formatPropertyPrice(total), total.price_text);
  assert.equal(propertyPriceBasis(perArea), 'perArea');
  assert.equal(propertyPriceBasis(total), 'total');
  assert.equal(formatPropertyPrice({ price: null }, 'fr'), 'Prix sur demande');
  assert.equal(formatPropertyPrice({ price: 200, currency: 'MXN' }), '200 MXN');
});
const properties = [
  { id: 1, title: 'Local en renta', address: 'Cuautitlán', location: 'Estado de México', property_type: 'Local', operation_type: 'Renta', currency: 'MXN', price: 200, price_text: '$200 MXN por m² al mes', area: 300, easybroker_id: 'EB-ABC' },
  { id: 2, title: 'Casa', address: 'Cancún', location: 'Quintana Roo', property_type: 'Casa', operation_type: 'sale', currency: 'USD', price: 300000, area: 100 },
  { id: 3, title: 'Local vacío', address: 'Cuautitlán', location: 'Estado de México', property_type: 'Local', operation_type: 'Venta y renta', currency: 'MXN', price: 400, area: 500 },
  { id: 4, title: 'Casa sin precio', address: '', property_type: 'Casa', operation_type: 'Venta', price: 0 },
];
const filter = changes => filterProperties(properties, { ...defaultPropertyFilters, ...changes }).map(p => p.id);
test('combines operation, type, locality, price, currency and basis filters', () => {
  assert.deepEqual(filter({ operation: 'rent', type: 'Local', location: 'Estado de México', min: '100', max: '250', currency: 'MXN', basis: 'perArea' }), [1]);
  assert.deepEqual(filter({ operation: 'sale', type: 'Local' }), [3]);
  assert.deepEqual(filter({ q: 'cuautitlan renta' }), [1]);
  assert.deepEqual(filter({ q: 'eb-abc' }), [1]);
  assert.deepEqual(filter({ q: 'no match' }), []);
  assert.deepEqual(filter({ min: '500', max: '200' }), []);
});
test('sorts results, leaves unpriced properties last and does not mutate source data', () => {
  assert.deepEqual(filter({ sort: 'priceAsc' }), [1, 3, 2, 4]);
  assert.deepEqual(filter({ sort: 'priceDesc' }), [2, 3, 1, 4]);
  assert.deepEqual(filter({ sort: 'areaDesc' }), [3, 1, 2, 4]);
  assert.deepEqual(properties.map(p => p.id), [1, 2, 3, 4]);
  assert.deepEqual(filter({}), [4, 3, 2, 1]);
});
test('share links contain the exact property ID on the public domain', () => {
  assert.equal(propertyShareUrl(2), 'https://www.zevicapital.com/listing_details_01?id=2');
  assert.equal(propertyShareUrl('a&b'), 'https://www.zevicapital.com/listing_details_01?id=a%26b');
});
