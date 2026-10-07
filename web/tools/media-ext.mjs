// Danh sách đuôi file media. Dùng chung cho fetch-demo.mjs và restore-assets.mjs.
// Repo chỉ lưu phần code của demo, media tải lại khi cần để repo không phình.
export const MEDIA_EXT = [
  '.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif',
  '.mp4', '.webm', '.mov',
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
  '.glb', '.gltf', '.hdr',
  '.mp3', '.wav',
];

export function isMedia(filePath) {
  const lower = filePath.toLowerCase();
  return MEDIA_EXT.some((ext) => lower.endsWith(ext));
}
