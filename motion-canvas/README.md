# Motion Canvas cho VETC

Workspace [Motion Canvas](https://motioncanvas.io) 3.17.2 để dựng motion graphic bằng
code TypeScript, phục vụ nội dung social và truyền thông VETC.

## Cài đặt

```bash
cd motion-canvas
npm install
```

## Kiểm thử

Một câu lệnh, chạy hết chuỗi build và render thật ra file mp4:

```bash
npm test
```

Lệnh này chạy `tsc`, `vite build`, rồi bật dev server, điều khiển editor bằng Chromium
headless để render ở scale 0.25 và kiểm tra file `output/project.mp4` được tạo ra.
Mất khoảng 25 giây.

## Chạy editor

```bash
npm run serve
```

Mở http://localhost:9000 để xem timeline, tua và chỉnh trực tiếp.

## Xuất video

Trong editor: tab Video Settings, đặt exporter là "Video (FFmpeg)" rồi bấm RENDER.

Hoặc render không cần mở trình duyệt:

```bash
npm run render                      # 1920x1080, 30fps
npm run render -- --scale 0.5       # nửa độ phân giải
npm run render -- --fps 60          # 60fps
```

File ra `output/project.mp4`.

## Cấu trúc

| Đường dẫn | Vai trò |
|---|---|
| `src/project.ts` | Khai báo project và danh sách scene |
| `src/scenes/` | Mỗi file một scene animation |
| `src/brand.ts` | Màu và font VETC, import vào scene để giữ đồng bộ |
| `src/fonts.css` | Khai báo `@font-face` cho VETC Sans |
| `public/fonts/` | File woff2 VETC Sans, copy từ `posters/vetc-parking/fonts` |
| `scripts/render.mjs` | Render headless qua Playwright |
| `vite.config.ts` | Nạp plugin Motion Canvas và FFmpeg exporter |

## Nhận diện

Màu và font lấy từ `posters/vetc-parking/tokens/colors.css`, tức VETC Brand Guideline
tháng 11/2025: xanh VETC `#0BB260`, font VETC Sans. Khi thêm scene mới, luôn lấy màu từ
`src/brand.ts` thay vì gõ mã màu trực tiếp.

## Thêm scene mới

1. Tạo `src/scenes/ten-scene.tsx` theo mẫu `example.tsx`
2. Import vào `src/project.ts` với hậu tố `?scene` và thêm vào mảng `scenes`

## Ghi chú

- Editor in ra lỗi `Failed to fetch` khi không có mạng ra ngoài. Đây là bước tự kiểm tra
  bản cập nhật của Motion Canvas, không ảnh hưởng tới render.
- `scripts/render.mjs` dùng Chromium tại `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
  Máy khác thì đặt biến môi trường `CHROMIUM_PATH`.
