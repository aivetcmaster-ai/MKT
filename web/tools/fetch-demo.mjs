#!/usr/bin/env node
// Tải một demo mới từ github.com/codrops về web/demos.
// Mặc định chỉ giữ code, bỏ media, để repo không phình. Thêm --with-assets nếu muốn cả media.
//
//   node tools/fetch-demo.mjs OnScrollShapeMorph
//   node tools/fetch-demo.mjs OnScrollShapeMorph --with-assets
import { existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { isMedia } from './media-ext.mjs';
import { DEMOS_DIR, ORG_URL, shallowClone, walk, copyInto, humanBytes, assertDemoName } from './lib.mjs';

function safeName(name) {
  try {
    return assertDemoName(name);
  } catch (err) {
    console.error(err.message);
    console.error('Tên demo là tên repo trên github.com/codrops, ví dụ ScrollTextMotion.');
    process.exit(1);
  }
}

const args = process.argv.slice(2);
const withAssets = args.includes('--with-assets');
const force = args.includes('--force');
const names = args.filter((a) => !a.startsWith('--')).map(safeName);

if (names.length === 0) {
  console.error('Cách dùng: node tools/fetch-demo.mjs <TenDemo> [--with-assets] [--force]');
  console.error('Tra tên demo: node tools/list-demos.mjs <tu-khoa>');
  process.exit(1);
}

for (const name of names) {
  const demoDir = join(DEMOS_DIR, name);
  if (existsSync(demoDir) && !force) {
    console.error(`${name} đã có trong web/demos. Thêm --force để tải lại.`);
    continue;
  }
  process.stdout.write(`${name} ... `);
  let tmp;
  try {
    const cloned = shallowClone(name);
    tmp = cloned.tmp;
    const all = walk(cloned.dest).filter((f) => {
      const base = f.split('/').pop();
      return base !== '.gitignore' && base !== '.gitattributes';
    });
    const picked = withAssets ? all : all.filter((f) => !isMedia(f));
    if (force) rmSync(demoDir, { recursive: true, force: true });
    mkdirSync(demoDir, { recursive: true });
    const bytes = copyInto(cloned.dest, picked, demoDir);
    console.log(`${picked.length} file, ${humanBytes(bytes)}${withAssets ? '' : ' (chưa có media)'}`);

    const license = ['LICENSE', 'LICENSE.md', 'license'].map((f) => join(demoDir, f)).find(existsSync);
    const licenseLine = license ? readFileSync(license, 'utf8').split('\n')[0].trim() : 'không có file LICENSE, xem README của demo';
    console.log(`  nguồn:      ${ORG_URL}/${name}`);
    console.log(`  giấy phép:  ${licenseLine}`);
    console.log(`  ghi vào NOTICE.md trước khi dùng trong sản phẩm VETC.`);
    if (!withAssets) console.log(`  xem bản đủ: node tools/restore-assets.mjs ${name}`);
  } catch (err) {
    console.log(`lỗi: ${err.message}`);
  } finally {
    if (tmp) rmSync(tmp, { recursive: true, force: true });
  }
}
