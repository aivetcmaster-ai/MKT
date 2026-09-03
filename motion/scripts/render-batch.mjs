// Dựng hàng loạt clip từ một file JSON nội dung.
// Bundle một lần rồi render lần lượt, nhanh hơn gọi remotion render từng clip.
//
//   node scripts/render-batch.mjs [đường dẫn JSON] [--only=<id>]
//
// Mặc định đọc data/clips.json và xuất ra out/.
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { findHeadlessShell } from './find-chromium.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith('--only='))?.slice('--only='.length);
const dataPath = resolve(root, args.find((a) => !a.startsWith('--')) ?? 'data/clips.json');

const data = JSON.parse(readFileSync(dataPath, 'utf8'));
const clips = (data.clips ?? []).filter((clip) => !only || clip.id === only);

if (clips.length === 0) {
  console.error(`Không có clip nào để dựng trong ${dataPath}`);
  process.exit(1);
}

const outDir = join(root, 'out');
mkdirSync(outDir, { recursive: true });

const browserExecutable = findHeadlessShell();

console.log(`Đang đóng gói dự án, ${clips.length} clip trong hàng đợi...`);
const serveUrl = await bundle({
  entryPoint: join(root, 'src/index.ts'),
  onProgress: () => undefined,
});

for (const [i, clip] of clips.entries()) {
  if (!clip.id || !clip.composition) {
    throw new Error('Mỗi clip phải có "id" và "composition"');
  }

  const inputProps = clip.props ?? {};
  const composition = await selectComposition({
    serveUrl,
    id: clip.composition,
    inputProps,
    browserExecutable,
  });

  const outputLocation = join(outDir, `${clip.id}.mp4`);
  let lastShown = -1;

  await renderMedia({
    composition,
    serveUrl,
    codec: 'h264',
    crf: 18,
    pixelFormat: 'yuv420p',
    imageFormat: 'png',
    browserExecutable,
    inputProps,
    outputLocation,
    onProgress: ({ progress }) => {
      const percent = Math.floor(progress * 100);
      if (percent >= lastShown + 20) {
        lastShown = percent;
        console.log(`[${i + 1}/${clips.length}] ${clip.id} ${percent}%`);
      }
    },
  });

  const seconds = (composition.durationInFrames / composition.fps).toFixed(1);
  console.log(`[${i + 1}/${clips.length}] xong ${clip.id} - ${seconds}s - ${outputLocation}`);
}

console.log('Đã dựng xong toàn bộ clip. Nhớ để người có thẩm quyền duyệt trước khi đăng.');
process.exit(0);
