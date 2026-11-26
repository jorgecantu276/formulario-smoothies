import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
function open(saved) {
  return new JSDOM(html, { url: 'https://intake.test.invalid/', runScripts: 'dangerously',
    beforeParse(window) {
      window.confirm = () => true;
      if (saved) window.localStorage.setItem('smoothies.captura.v1', JSON.stringify(saved));
    } });
}
function submit(window, kind, values) {
  const form = window.document.getElementById(`${kind}-form`);
  for (const [name, value] of Object.entries(values)) form.elements.namedItem(name).value = value;
  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
}
const state = window => JSON.parse(window.eval('JSON.stringify(state)'));

test('menu identity matches the final cashier name, including spacing and Único', () => {
  const dom = open(), { window } = dom;
  try {
    submit(window, 'menu', { name: 'Mango', size: 'Grande', price: '85' });
    submit(window, 'menu', { name: 'Mango Grande', size: 'Único', price: '85' });
    assert.equal(state(window).menu.length, 1);
    assert.match(window.document.getElementById('notice').textContent, /mismo nombre en caja/);
    submit(window, 'menu', { name: 'MANGO   GRANDE', size: 'único', price: '85' });
    assert.equal(state(window).menu.length, 1);
    submit(window, 'menu', { name: 'Mango', size: 'Chico', price: '60' });
    assert.equal(state(window).menu.length, 2);
    assert.equal(window.readyToShare(), true);
  } finally { window.close(); }
});

test('inventory and extras reject duplicate names with the same normalization as POS', () => {
  const { window } = open();
  try {
    submit(window, 'menu', { name: 'Mango', size: 'Único', price: '85' });
    submit(window, 'stock', { name: 'Mango congelado', unit: 'kg', quantity: '', cost: '' });
    submit(window, 'stock', { name: ' MANGO   CONGELADO ', unit: 'kg', quantity: '2', cost: '95' });
    assert.equal(state(window).stock.length, 1);
    assert.equal(state(window).stock[0].quantity, null);
    submit(window, 'extras', { name: 'Leche de avena', price: '5', scope: 'all' });
    submit(window, 'extras', { name: 'LECHE  DE AVENA', price: '5', scope: 'all' });
    assert.equal(state(window).extras.length, 1);
  } finally { window.close(); }
});

test('a legacy conflicting draft remains editable but cannot be shared until corrected', () => {
  const legacy = { version: 1, menu: [
      { id: '11111111-1111-4111-8111-111111111111', name: 'Mango', size: 'Grande', price: 85, notes: '' },
      { id: '22222222-2222-4222-8222-222222222222', name: 'Mango Grande', size: 'Único', price: 85, notes: '' },
      { id: '33333333-3333-4333-8333-333333333333', name: 'Fresa', size: 'Grande', price: 85, notes: '' },
      { id: '44444444-4444-4444-8444-444444444444', name: 'Fresa Grande', size: 'Único', price: 85, notes: '' },
    ], stock: [], extras: [] };
  const { window } = open(legacy);
  try {
    assert.equal(state(window).menu.length, 4);
    assert.equal(window.readyToShare(), false);
    const edit = window.document.querySelector('[data-action="edit"][data-id="22222222-2222-4222-8222-222222222222"]');
    edit.click();
    submit(window, 'menu', { name: 'Mango especial', size: 'Único', price: '85' });
    assert.equal(state(window).menu.length, 4);
    assert.equal(state(window).menu[1].name, 'Mango especial');
    assert.equal(window.readyToShare(), false);
    window.document.querySelector('[data-action="edit"][data-id="44444444-4444-4444-8444-444444444444"]').click();
    submit(window, 'menu', { name: 'Fresa especial', size: 'Único', price: '85' });
    assert.equal(window.readyToShare(), true);
    const restored = window.parseCopy(JSON.stringify(state(window))).state;
    assert.equal(restored.menu[1].id, legacy.menu[1].id);
  } finally { window.close(); }
});
