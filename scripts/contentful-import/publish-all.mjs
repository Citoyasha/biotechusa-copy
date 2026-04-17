#!/usr/bin/env node
/**
 * Bulk-publish all draft clothingProduct entries and their linked assets
 * via Contentful Management API (REST, no SDK needed).
 */
const SPACE = 'k2dfb8mizjh9';
const ENV = 'master';
const TOKEN = 'iqJF7CnISvv-BsVr6bpKxPC9by0GCBjltEiJigFEseI';
const BASE = `https://api.contentful.com/spaces/${SPACE}/environments/${ENV}`;
const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/vnd.contentful.management.v1+json',
};

async function api(path, opts = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, { headers: HEADERS, ...opts });
  if (res.status === 429) {
    const wait = parseInt(res.headers.get('x-contentful-ratelimit-reset') || '2', 10);
    console.log(`  rate-limited, waiting ${wait}s...`);
    await new Promise(r => setTimeout(r, wait * 1000));
    return api(path, opts);
  }
  return res;
}

async function fetchAll(path) {
  let items = [], skip = 0;
  while (true) {
    const res = await api(`${path}${path.includes('?') ? '&' : '?'}skip=${skip}&limit=100`);
    const data = await res.json();
    if (!data.items?.length) break;
    items = items.concat(data.items);
    skip += data.items.length;
    if (skip >= data.total) break;
  }
  return items;
}

async function publishItem(type, item) {
  const id = item.sys.id;
  const ver = item.sys.version;
  const endpoint = type === 'Asset' ? `/assets/${id}/published` : `/entries/${id}/published`;
  const res = await api(endpoint, {
    method: 'PUT',
    headers: { ...HEADERS, 'X-Contentful-Version': String(ver) },
  });
  if (res.ok) return true;
  const err = await res.text();
  console.error(`  FAIL ${type} ${id}: ${res.status} ${err.slice(0, 200)}`);
  return false;
}

async function processAssets() {
  // Also process any unprocessed assets (the 2 timeouts)
  const assets = await fetchAll('/assets?sys.publishedAt[exists]=false');
  console.log(`Found ${assets.length} unpublished assets`);

  // Check for unprocessed (no url in file field)
  const unprocessed = assets.filter(a => {
    const f = a.fields?.file?.['en-US'];
    return f && !f.url && f.upload;
  });
  if (unprocessed.length) {
    console.log(`Processing ${unprocessed.length} unprocessed assets...`);
    for (const a of unprocessed) {
      const res = await api(`/assets/${a.sys.id}/files/en-US/process`, {
        method: 'PUT',
        headers: { ...HEADERS, 'X-Contentful-Version': String(a.sys.version) },
      });
      console.log(`  process ${a.sys.id}: ${res.status}`);
      // Wait for processing
      await new Promise(r => setTimeout(r, 3000));
    }
    // Refetch
    return processAssets();
  }

  let ok = 0, fail = 0;
  for (const a of assets) {
    const success = await publishItem('Asset', a);
    if (success) ok++; else fail++;
    if ((ok + fail) % 50 === 0) console.log(`  assets: ${ok} published, ${fail} failed / ${assets.length}`);
  }
  console.log(`Assets done: ${ok} published, ${fail} failed`);
}

async function publishEntries() {
  const entries = await fetchAll('/entries?content_type=clothingProduct&sys.publishedAt[exists]=false');
  console.log(`Found ${entries.length} unpublished entries`);
  let ok = 0, fail = 0;
  for (const e of entries) {
    const success = await publishItem('Entry', e);
    if (success) ok++; else fail++;
    if ((ok + fail) % 50 === 0) console.log(`  entries: ${ok} published, ${fail} failed / ${entries.length}`);
  }
  console.log(`Entries done: ${ok} published, ${fail} failed`);
}

async function main() {
  console.log('Publishing assets...');
  await processAssets();
  console.log('Publishing entries...');
  await publishEntries();
  console.log('Done.');
}

main().catch(e => { console.error(e); process.exit(1); });
