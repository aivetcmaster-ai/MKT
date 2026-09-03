// Render không cần mở trình duyệt bằng tay: bật dev server, điều khiển editor
// Motion Canvas bằng Chromium headless, bấm Render và chờ file trong output/.
//
// Dùng: node scripts/render.mjs [--scale 1.0|0.5|0.25] [--fps 30|60]
import {chromium} from 'playwright-core';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {existsSync, readdirSync, rmSync, statSync} from 'node:fs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, 'output');

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const scale = flag('scale', '1.0');
const fps = flag('fps', '30');
const timeoutMs = Number(flag('timeout', '300')) * 1000;

const chromePath =
  process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const scaleLabel = {
  '0.25': '0.25x (Quarter)',
  '0.5': '0.5x (Half)',
  '1.0': '1.0x (Full)',
  '2.0': '2.0x (Double)',
}[scale];
if (!scaleLabel) throw new Error(`--scale không hợp lệ: ${scale}`);

rmSync(outputDir, {recursive: true, force: true});

console.log('> khởi động vite');
// detached để kill được cả nhóm tiến trình, tránh vite sống sót và treo script.
const server = spawn(join(root, 'node_modules', '.bin', 'vite'), [
  '--port', '9123', '--strictPort',
], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'inherit'],
  detached: true,
});
let stopped = false;
const stop = () => {
  if (stopped) return;
  stopped = true;
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {
    server.kill('SIGTERM');
  }
};
process.on('exit', stop);

await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('vite không khởi động kịp')), 60000);
  server.stdout.on('data', chunk => {
    if (chunk.toString().includes('ready in')) {
      clearTimeout(timer);
      resolve();
    }
  });
  server.on('exit', code => reject(new Error(`vite thoát sớm, mã ${code}`)));
});

const browser = await chromium.launch({executablePath: chromePath});
const page = await browser.newPage({viewport: {width: 1600, height: 1000}});
page.on('pageerror', e => console.error('  lỗi trang:', e.message));

console.log('> mở editor');
await page.goto('http://localhost:9123/', {waitUntil: 'domcontentloaded', timeout: 60000});
await page.waitForSelector('select', {timeout: 60000});
await page.evaluate(() => document.fonts.ready);

// Các select không có id ổn định, nên tìm theo nhãn của option.
const pickSelect = async (label, occurrence = 0) => {
  const selects = await page.$$('select');
  let seen = 0;
  for (const select of selects) {
    const labels = await select.$$eval('option', os => os.map(o => o.text));
    if (!labels.includes(label)) continue;
    if (seen++ < occurrence) continue;
    await select.selectOption({label});
    return;
  }
  throw new Error(`không tìm thấy select chứa "${label}" (lần ${occurrence})`);
};

// Hai select đầu là preview, hai select sau là rendering nên lấy occurrence 1.
await pickSelect(`${fps} FPS`, 1);
await pickSelect(scaleLabel, 1);
await pickSelect('Video (FFmpeg)');
console.log(`> render ${fps}fps, scale ${scale}`);

await page.locator('button:has-text("RENDER")').first().click();

const findVideo = () =>
  existsSync(outputDir)
    ? readdirSync(outputDir)
        .filter(f => f.endsWith('.mp4'))
        .map(f => join(outputDir, f))[0]
    : undefined;

const deadline = Date.now() + timeoutMs;
let video;
let lastSize = -1;
while (Date.now() < deadline) {
  await page.waitForTimeout(2000);
  const found = findVideo();
  if (found) {
    const size = statSync(found).size;
    // File coi như xong khi kích thước ngừng tăng qua một nhịp kiểm tra.
    if (size > 0 && size === lastSize) {
      video = found;
      break;
    }
    lastSize = size;
  }
}

await browser.close();
stop();

if (!video) {
  console.error('THẤT BẠI: hết giờ mà chưa có file mp4 trong output/');
  process.exit(1);
}

console.log(`OK: ${video} (${(statSync(video).size / 1024).toFixed(0)} KB)`);
process.exit(0);
