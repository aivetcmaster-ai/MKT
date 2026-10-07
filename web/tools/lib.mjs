// Tiện ích chung cho các script trong web/tools.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const WEB_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const DEMOS_DIR = join(WEB_DIR, 'demos');
export const ORG_URL = 'https://github.com/codrops';

// Tên repo Codrops chỉ gồm chữ, số, gạch ngang, gạch dưới và dấu chấm.
// Chặn sớm để không ghép được tham số lạ vào lệnh git hoặc đi ra ngoài web/demos.
export function assertDemoName(name) {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(name) || name.includes('..')) {
    throw new Error(`Tên demo không hợp lệ: ${name}`);
  }
  return name;
}

export function shallowClone(name) {
  assertDemoName(name);
  const tmp = mkdtempSync(join(tmpdir(), 'codrops-'));
  const dest = join(tmp, name);
  try {
    execFileSync('git', ['clone', '--depth', '1', '--quiet', `${ORG_URL}/${name}.git`, dest], {
      stdio: ['ignore', 'inherit', 'inherit'],
    });
  } catch (err) {
    rmSync(tmp, { recursive: true, force: true });
    throw new Error(`Không tải được ${ORG_URL}/${name} . Kiểm tra tên demo và mạng.`);
  }
  return { tmp, dest };
}

export function walk(root, { skipGit = true } = {}) {
  const out = [];
  (function recurse(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (skipGit && (entry.name === '.git' || entry.name === 'node_modules')) continue;
      if (entry.name === '.DS_Store') continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) recurse(full);
      else if (entry.isFile()) out.push(full);
    }
  })(root);
  return out;
}

export function copyInto(srcRoot, files, destRoot) {
  let bytes = 0;
  for (const file of files) {
    const rel = relative(srcRoot, file);
    const target = join(destRoot, rel);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(file, target);
    bytes += statSync(file).size;
  }
  return bytes;
}

export function humanBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
