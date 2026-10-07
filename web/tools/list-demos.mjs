#!/usr/bin/env node
// Tra demo Codrops theo từ khoá, tên hoặc nhóm. Đọc catalog.json trong web/.
//
//   node tools/list-demos.mjs scroll
//   node tools/list-demos.mjs --tag typography
//   node tools/list-demos.mjs --vendored
//   node tools/list-demos.mjs --tags
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { WEB_DIR } from './lib.mjs';

const catalog = JSON.parse(readFileSync(join(WEB_DIR, 'catalog.json'), 'utf8'));
const args = process.argv.slice(2);

if (args.includes('--tags')) {
  const counts = new Map();
  for (const d of catalog.demos) for (const t of d.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  for (const [tag, n] of [...counts].sort((a, b) => b[1] - a[1])) console.log(`${String(n).padStart(4)}  ${tag}`);
  process.exit(0);
}

const tagIdx = args.indexOf('--tag');
const wantTag = tagIdx !== -1 ? args[tagIdx + 1] : null;
const onlyVendored = args.includes('--vendored');
const terms = args.filter((a, i) => !a.startsWith('--') && i !== tagIdx + 1).map((s) => s.toLowerCase());

let hits = catalog.demos;
if (wantTag) hits = hits.filter((d) => d.tags.includes(wantTag));
if (onlyVendored) hits = hits.filter((d) => d.vendored);
if (terms.length) {
  hits = hits.filter((d) => {
    const hay = `${d.name} ${d.description ?? ''} ${d.tags.join(' ')}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}

if (!hits.length) {
  console.log('Không tìm thấy. Xem các nhóm có sẵn: node tools/list-demos.mjs --tags');
  process.exit(0);
}

for (const d of hits.sort((a, b) => a.name.localeCompare(b.name))) {
  console.log(`${d.vendored ? '*' : ' '} ${d.name}`);
  console.log(`    ${d.description ?? '(không có mô tả)'}`);
  console.log(`    ${d.tags.join(', ') || 'khong-nhom'} | ${d.url}`);
}
console.log(`\n${hits.length}/${catalog.total} demo. Dấu * là demo đã có trong web/demos.`);
if (hits.some((d) => !d.vendored)) console.log('Tải thêm: node tools/fetch-demo.mjs <TenDemo>');
