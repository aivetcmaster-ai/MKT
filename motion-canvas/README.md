# Motion Canvas cho VETC

Workspace [Motion Canvas](https://motioncanvas.io) dùng để dựng motion graphic bằng code (TypeScript), phục vụ nội dung social và truyền thông VETC.

## Cài đặt

```bash
cd motion-canvas
npm install
```

## Chạy editor

```bash
npm run serve
```

Mở địa chỉ Vite in ra terminal (mặc định http://localhost:9000) để xem timeline, tua và chỉnh trực tiếp.

## Xuất video

Trong editor, chọn tab Video Settings, đặt Exporter là FFmpeg rồi bấm Render. File nằm trong thư mục `output/`.

## Cấu trúc

- `src/project.ts` khai báo project và danh sách scene
- `src/scenes/` mỗi file là một scene animation
- `src/brand.ts` màu và font theo nhận diện VETC, import vào scene để giữ đồng bộ
- `vite.config.ts` nạp plugin Motion Canvas và FFmpeg exporter

## Thêm scene mới

1. Tạo `src/scenes/ten-scene.tsx` theo mẫu `example.tsx`
2. Import vào `src/project.ts` với hậu tố `?scene` và thêm vào mảng `scenes`

## Ghi chú

- Font Be Vietnam Pro cần được cài trên máy hoặc nhúng thêm để render đúng; nếu chưa có, hệ thống sẽ fallback về Arial.
- Kiểm tra kiểu dữ liệu: `npm run typecheck`
