#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.dirname(new URL(import.meta.url).pathname);
const LOCALE = 'en-US';

const SHOPIFY_PAGES = [
  'https://shop.biotechusa.fr/products.json?limit=250&page=1',
  'https://shop.biotechusa.fr/products.json?limit=250&page=2',
];

const APPAREL_TYPES = new Set(['BiotechUSA Apparel', 'T-Shirt', 'Shakers']);

const COLOR_HEX = {
  'noir': '#000000',
  'blanc': '#ffffff',
  'blanc cassé': '#f5f1e6',
  'bleu': '#2b4e8a',
  'bleu rétro': '#3e6aa0',
  'brun': '#5a3a22',
  'marron': '#5a3a22',
  'cerise': '#9b1b30',
  'gris': '#8a8a8a',
  'gris clair': '#c4c4c4',
  'gris pierre': '#8f8a82',
  'stone grey': '#8f8a82',
  'jaune': '#f2c94c',
  'kaki': '#6b6b3d',
  'nude': '#e4c8b4',
  'rose': '#f2a5b9',
  'vert': '#3d6b3a',
  'corail': '#ff7a5c',
  'beige': '#d9c6a6',
  'anthracite': '#2c2c2c',
  'papaya': '#ff8a5c',
  'camel': '#c69b6d',
};
const LIGHT_COLORS = new Set(['blanc', 'blanc cassé', 'nude', 'gris clair', 'beige']);

const COLLECTIONS = ['rise', 'elevate', 'essence', 'seamless', 'core', 'last-chance'];

function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function fetchJson(url) {
  return fetch(url).then(r => {
    if (!r.ok) throw new Error(`${url}: ${r.status}`);
    return r.json();
  });
}

async function loadAllProducts() {
  let all = [];
  for (const url of SHOPIFY_PAGES) {
    const data = await fetchJson(url);
    if (!data.products?.length) break;
    all = all.concat(data.products);
  }
  return all;
}

function detectGender(p) {
  const t = `${p.title} ${p.tags.join(' ')}`.toLowerCase();
  if (t.includes('pour femmes') || t.includes('femme') || t.includes('nem_pour femmes')) return 'femme';
  if (t.includes('pour hommes') || t.includes('homme') || t.includes('nem_pour hommes')) return 'homme';
  if (t.includes('unisexe') || t.includes('unisex')) return 'unisexe';
  return null;
}

function detectCategory(p, gender) {
  const t = `${p.title} ${p.product_type}`.toLowerCase();
  if (p.product_type === 'Shakers' || /shaker|bouteille|gallon/.test(t)) return 'shakers';
  if (/chaussette/.test(t)) return 'chaussettes';
  if (/brassière|soutien-gorge|sports? bra|brassiere/.test(t)) return 'soutiens-gorge-de-sport';
  if (/combinaison/.test(t)) return 'combinaisons';
  if (/gant/.test(t)) return 'gants';
  if (/ceinture/.test(t)) return 'ceintures';
  if (/sac/.test(t)) return 'sacs-de-sport';
  const g = gender === 'homme' ? 'hommes' : 'femmes';
  if (/sweat|hoodie|pull/.test(t)) return `sweatshirts-${g}`;
  if (/pantalon|jogger|legging|short|survêtement|combishort/.test(t)) return `pantalons-${g}`;
  if (/t-shirt|tshirt|débardeur|debardeur|haut|crop|top|veste/.test(t)) return `t-shirts-${g}`;
  return `t-shirts-${g}`;
}

function detectCollection(p) {
  const t = p.title.toLowerCase();
  for (const c of COLLECTIONS) {
    if (t.includes(c.replace('-', ' '))) return c;
  }
  if (/last chance/.test(t)) return 'last-chance';
  return 'other';
}

function extractColor(p) {
  const szin = p.tags.find(t => t.toLowerCase().startsWith('szin_'));
  if (!szin) return null;
  const name = szin.slice(5).trim();
  const key = name.toLowerCase();
  const hex = COLOR_HEX[key] || null;
  return {
    name,
    hex,
    hasBorder: LIGHT_COLORS.has(key),
  };
}

function extractSizes(p) {
  const sizeOpt = p.options.find(o => /méret|taille|size/i.test(o.name));
  if (!sizeOpt) return null;
  return { available: sizeOpt.values };
}

function stripColorFromHandle(handle, colorName) {
  if (!colorName) return handle;
  const slug = slugify(colorName);
  return handle.replace(new RegExp(`-${slug}(-\\d+)?$`), '');
}

function assetId(handle, idx) {
  // Stable, deterministic asset id within 64 char limit
  return `img-${handle}-${idx}`.slice(0, 64).replace(/-+$/,'');
}

function assetFromImage(handle, img, idx, productTitle) {
  const urlNoQs = img.src.split('?')[0];
  const ext = urlNoQs.split('.').pop().toLowerCase();
  const contentType = ({ jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' })[ext] || 'image/jpeg';
  const fileName = `${handle}-${idx}.${ext}`;
  return {
    sys: { id: assetId(handle, idx), type: 'Asset' },
    fields: {
      title: { [LOCALE]: `${productTitle} ${idx + 1}` },
      file: {
        [LOCALE]: {
          contentType,
          fileName,
          url: img.src,
        },
      },
    },
  };
}

function entryLink(id) {
  return { sys: { type: 'Link', linkType: 'Entry', id } };
}
function assetLink(id) {
  return { sys: { type: 'Link', linkType: 'Asset', id } };
}

function mapProduct(p) {
  const gender = detectGender(p);
  const category = detectCategory(p, gender);
  const color = extractColor(p);
  const sizes = extractSizes(p);
  const collection = detectCollection(p);
  const v0 = p.variants[0];
  const price = parseFloat(v0.price);
  const compare = parseFloat(v0.compare_at_price || '0');
  const originalPrice = compare > price ? compare : null;
  const sizeChartKey = category === 'chaussettes' ? 'chaussettes' :
    category === 'shakers' ? null :
    gender === 'homme' ? 'homme' : gender === 'femme' ? 'femme' : 'unisexe';
  const inStock = p.variants.some(v => v.available);

  const images = (p.images || []).slice(0, 8);
  const assets = images.map((img, i) => assetFromImage(p.handle, img, i, p.title));
  const primary = assets[0];
  const hover = assets[1] || null;
  const gallery = assets.slice(2);

  const fields = {
    name: { [LOCALE]: p.title },
    slug: { [LOCALE]: p.handle },
    brand: { [LOCALE]: 'BiotechUSA Apparel' },
    category: { [LOCALE]: category },
    price: { [LOCALE]: price },
    inStock: { [LOCALE]: inStock },
  };
  if (gender) fields.gender = { [LOCALE]: gender };
  if (collection) fields.collection = { [LOCALE]: collection };
  if (originalPrice) fields.originalPrice = { [LOCALE]: originalPrice };
  if (primary) fields.image = { [LOCALE]: assetLink(primary.sys.id) };
  if (hover) fields.hoverImage = { [LOCALE]: assetLink(hover.sys.id) };
  if (gallery.length) fields.galleryImages = { [LOCALE]: gallery.map(a => assetLink(a.sys.id)) };
  if (color?.name) fields.colorName = { [LOCALE]: color.name };
  if (color?.hex) fields.colorHex = { [LOCALE]: color.hex };
  if (color?.hasBorder) fields.colorHasBorder = { [LOCALE]: true };
  if (sizes) fields.sizes = { [LOCALE]: sizes };
  if (sizeChartKey) fields.sizeChartKey = { [LOCALE]: sizeChartKey };
  if (p.body_html) fields.descriptionHtml = { [LOCALE]: p.body_html };

  const entry = {
    sys: {
      id: `prod-${p.handle}`.slice(0, 64),
      type: 'Entry',
      contentType: { sys: { type: 'Link', linkType: 'ContentType', id: 'clothingProduct' } },
    },
    fields,
  };

  return { entry, assets, baseHandle: stripColorFromHandle(p.handle, color?.name) };
}

async function main() {
  console.log('Fetching Shopify products...');
  const all = await loadAllProducts();
  console.log(`Fetched ${all.length} products.`);
  const apparel = all.filter(p => APPAREL_TYPES.has(p.product_type));
  console.log(`Apparel: ${apparel.length}`);

  // Dedupe by handle (page overlap)
  const seen = new Set();
  const unique = apparel.filter(p => seen.has(p.handle) ? false : (seen.add(p.handle), true));
  console.log(`Unique: ${unique.length}`);

  const entries = [];
  const assets = [];
  const assetIdsSeen = new Set();
  const groups = {};

  for (const p of unique) {
    const { entry, assets: a, baseHandle } = mapProduct(p);
    entries.push(entry);
    for (const asset of a) {
      if (assetIdsSeen.has(asset.sys.id)) continue;
      assetIdsSeen.add(asset.sys.id);
      assets.push(asset);
    }
    groups[baseHandle] = groups[baseHandle] || [];
    groups[baseHandle].push(entry.sys.id);
  }

  // Link sibling variants
  for (const entry of entries) {
    const baseHandle = Object.keys(groups).find(b => groups[b].includes(entry.sys.id));
    const siblings = groups[baseHandle].filter(id => id !== entry.sys.id);
    if (siblings.length) {
      entry.fields.linkedVariants = { [LOCALE]: siblings.map(id => entryLink(id)) };
    }
  }

  const importFile = { entries, assets };
  const outPath = path.join(OUT_DIR, 'import.json');
  fs.writeFileSync(outPath, JSON.stringify(importFile, null, 2));
  console.log(`Wrote ${entries.length} entries, ${assets.length} assets → ${outPath}`);

  // Summary
  const catCount = {};
  entries.forEach(e => {
    const c = e.fields.category?.[LOCALE];
    catCount[c] = (catCount[c] || 0) + 1;
  });
  console.log('By category:', catCount);
}

main().catch(e => { console.error(e); process.exit(1); });
