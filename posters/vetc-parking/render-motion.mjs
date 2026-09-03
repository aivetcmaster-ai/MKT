// Dựng motion graphic: chụp từng khung hình bằng Chromium rồi ghép bằng ffmpeg.
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const dir = dirname(fileURLToPath(import.meta.url));
const frames = join(dir, '.frames');
const FPS = 30;

const chromePath = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';

rmSync(frames, { recursive: true, force: true });
mkdirSync(frames, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath });
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
await page.goto('file://' + join(dir, 'motion-1x1.html'));
await page.waitForTimeout(800);

const duration = await page.evaluate(() => window.DURATION);
const total = Math.round(duration * FPS);
const poster = await page.$('#poster');

for (let i = 0; i < total; i++) {
  await page.evaluate(t => window.setTime(t), i / FPS);
  await poster.screenshot({ path: join(frames, String(i).padStart(4, '0') + '.png') });
}
await browser.close();
console.log('đã chụp ' + total + ' khung hình');

const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });

// MP4 H.264, yuv420p để chạy được trên mọi nền tảng social
run(['-framerate', String(FPS), '-i', join(frames, '%04d.png'),
     '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
     '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
     join(dir, 'vetc-parking-motion-1x1.mp4')]);

// GIF 540x540, 15fps, bảng màu tối ưu cho nền xanh phẳng
const palette = join(frames, 'palette.png');
run(['-i', join(dir, 'vetc-parking-motion-1x1.mp4'),
     '-vf', 'fps=15,scale=540:-1:flags=lanczos,palettegen=max_colors=128', palette]);
run(['-i', join(dir, 'vetc-parking-motion-1x1.mp4'), '-i', palette,
     '-lavfi', 'fps=15,scale=540:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3',
     '-loop', '0', join(dir, 'vetc-parking-motion-1x1.gif')]);

rmSync(frames, { recursive: true, force: true });
console.log('xong');
