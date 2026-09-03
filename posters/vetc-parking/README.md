# Poster VETC Parking - social 1:1

Poster vuông 1080x1080 cho kênh social (Facebook, Zalo), dựng bằng HTML tĩnh theo
bộ nhận diện VETC (Brand Guideline Nov 2025).

## File

| File | Mô tả |
|---|---|
| `poster-1x1.html` | Bản dựng gốc, mở trực tiếp bằng trình duyệt |
| `vetc-parking-poster-1x1.png` | Ảnh xuất, 2160x2160 (deviceScaleFactor 2) |
| `vetc-parking-poster-1x1.pdf` | Bản PDF 1080x1080 để in hoặc lưu trữ |
| `styles.css`, `tokens/`, `fonts/` | Token màu, chữ, khoảng cách và font VETC Sans |
| `assets/` | Logo lock-up VETC Parking và bộ icon thương hiệu |

## Tuân thủ nhận diện

- Nền: chỉ hai màu, xanh VETC `#0BB260` và trắng. Không gradient, không hoa văn.
- Thứ tự bố cục: logo, headline, Smart Line, dải liên hệ.
- Ba cỡ chữ: 88 headline, 28 dẫn nhập và tiêu đề bước, 20 chú thích.
- Lề 56px, lưới 4px, không đổ bóng, không emoji.
- Smart Line neo đáy, không xoay, chiếm dưới một phần ba bố cục.

## Xuất lại ảnh

Cần Node và Chromium (Playwright). Từ thư mục này:

```bash
npm i playwright-core
node render.mjs
```

## Cần rà trước khi đăng

- Nội dung mô tả cơ chế trừ phí và tên tính năng trong ứng dụng VETC cần phòng
  sản phẩm hoặc phòng vận hành Parking xác nhận đúng với bản app đang chạy.
- Nếu bổ sung số liệu (số bãi liên kết, thời gian qua barie), phải có nguồn nội bộ
  đã duyệt.
- Người có thẩm quyền ký duyệt trước khi phát hành.
