// Tìm Chromium headless shell có sẵn trong máy, tránh tải thêm một bản riêng.
// Bản Chrome đầy đủ không chạy được chế độ headless cũ, nên phải dùng headless_shell.
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/** @returns {string | null} đường dẫn tới headless_shell, hoặc null nếu không có */
export const findHeadlessShell = () => {
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
