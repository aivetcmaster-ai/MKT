#!/usr/bin/env node
// Tải lại ảnh, video, font của một demo đã có trong web/demos.
// Repo chỉ lưu code, nên demo mới clone về sẽ thiếu media. Chạy script này để xem đúng bản gốc.
//
//   node tools/restore-assets.mjs ScrollTextMotion
//   node tools/restore-assets.mjs --all
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { isMedia } from './media-ext.mjs';
import { DEMOS_DIR, shallowClone, walk, copyInto, humanBytes, assertDemoName } from './lib.mjs';

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
if (args.length === 0) {
  console.error('Cách dùng: node tools/restore-assets.mjs <TenDemo> | --all');
  process.exit(1);
}

const targets = args.includes('--all')
  ? readdirSync(DEMOS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
  : args.map(safeName);

let total = 0;
for (const name of targets) {
  const demoDir = join(DEMOS_DIR, name);
  if (!existsSync(demoDir)) {
    console.error(`Bỏ qua ${name}: chưa có trong web/demos. Dùng tools/fetch-demo.mjs để tải mới.`);
    continue;
  }
  process.stdout.write(`${name} ... `);
  let tmp;
  try {
    const cloned = shallowClone(name);
    tmp = cloned.tmp;
    const media = walk(cloned.dest).filter(isMedia);
    const bytes = copyInto(cloned.dest, media, demoDir);
    total += bytes;
    console.log(`${media.length} file, ${humanBytes(bytes)}`);
  } catch (err) {
    console.log(`lỗi: ${err.message}`);
  } finally {
    if (tmp) rmSync(tmp, { recursive: true, force: true });
  }
}
console.log(`\nTổng media đã tải: ${humanBytes(total)}`);
console.log('Media nằm trong .gitignore nên sẽ không bị commit.');
