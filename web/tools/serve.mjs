#!/usr/bin/env node
// Server tĩnh để xem demo và trang starter. Nhiều demo cần http, mở bằng file:// sẽ lỗi module.
//
//   node tools/serve.mjs            rồi mở http://localhost:4173
//   node tools/serve.mjs 8080
import { createServer } from 'node:http';
import { createReadStream, statSync, readdirSync, existsSync } from 'node:fs';
import { join, extname, normalize, sep } from 'node:path';
import { WEB_DIR } from './lib.mjs';

const port = Number(process.argv[2]) || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.avif': 'image/avif', '.gif': 'image/gif', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
  '.glb': 'model/gltf-binary', '.mp3': 'audio/mpeg', '.md': 'text/plain; charset=utf-8',
};

function index() {
  const demos = readdirSync(join(WEB_DIR, 'demos'), { withFileTypes: true })
    .filter((d) => d.isDirectory()).map((d) => d.name).sort();
  const items = demos.map((n) => `<li><a href="/demos/${n}/index.html">${n}</a></li>`).join('\n');
  return `<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Kho demo Codrops</title>
<style>body{font-family:Inter,Arial,sans-serif;max-width:720px;margin:48px auto;padding:0 16px;line-height:1.55;color:#000}
h1{color:#0BB260}a{color:#009647}ul{columns:2;column-gap:32px}li{break-inside:avoid;margin:4px 0}
p.note{background:#D6EBD8;padding:12px 16px;border-radius:8px}</style></head><body>
<h1>Kho demo Codrops</h1>
<p><a href="/vetc-starter/index.html">Khung starter VETC</a> | <a href="/catalog.md">Catalog 345 demo</a></p>
<p class="note">Repo chỉ lưu code, không lưu ảnh và font của demo. Demo thiếu hình thì chạy
<code>node tools/restore-assets.mjs TenDemo</code> rồi tải lại trang.</p>
<h2>${demos.length} demo có sẵn</h2><ul>${items}</ul></body></html>`;
}

createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (urlPath === '/' || urlPath === '/index.html') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    return res.end(index());
  }
  // Chặn đi ra ngoài WEB_DIR.
  const target = join(WEB_DIR, normalize(urlPath).replace(/^(\.\.(\/|\\|$))+/, ''));
  if (!target.startsWith(WEB_DIR + sep)) {
    res.writeHead(403); return res.end('403');
  }
  let file = target;
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    return res.end(`<p>404 ${urlPath}</p><p>Thiếu ảnh hoặc font? Chạy <code>node tools/restore-assets.mjs</code>.</p>`);
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`Kho demo Codrops: http://localhost:${port}`);
  console.log('Ctrl+C để dừng.');
});
