// Xuất poster ra PNG và PDF bằng Chromium (Playwright).
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const dir = dirname(fileURLToPath(import.meta.url));
const executablePath = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2 });
await page.goto('file://' + dir + '/poster-1x1.html');
await page.waitForTimeout(600);

const poster = await page.$('.poster');
await poster.screenshot({ path: dir + '/vetc-parking-poster-1x1.png' });
await page.pdf({
  path: dir + '/vetc-parking-poster-1x1.pdf',
  width: '1080px', height: '1080px',
  printBackground: true, pageRanges: '1',
});
await browser.close();
