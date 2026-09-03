import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Config } from '@remotion/cli/config';

// Chụp khung hình bằng PNG để giữ nền xanh phẳng, không nhiễu.
// Codec, CRF và pixel format đặt ở từng lệnh render, vì mỗi định dạng đầu ra một khác.
Config.setVideoImageFormat('png');
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('angle');

/** Tìm Chromium headless shell có sẵn trong máy, tránh tải thêm một bản riêng.
 *  Bản Chrome đầy đủ không chạy được chế độ headless cũ, nên phải dùng headless_shell. */
const findHeadlessShell = (): string | null => {
  if (process.env.CHROMIUM_PATH) {
    return process.env.CHROMIUM_PATH;
  }
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  if (!existsSync(root)) {
    return null;
  }
  for (const dir of readdirSync(root)) {
    if (!dir.startsWith('chromium_headless_shell')) {
      continue;
    }
    const candidate = join(root, dir, 'chrome-linux', 'headless_shell');
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
};

const browser = findHeadlessShell();
if (browser) {
  Config.setBrowserExecutable(browser);
}
