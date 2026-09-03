# Poster VETC Parking - social 1:1

Poster vuông 1080x1080 cho kênh social (Facebook, Zalo), dựng bằng HTML tĩnh theo
bộ nhận diện VETC (Brand Guideline Nov 2025).

## File

| File | Mô tả |
|---|---|
| `poster-1x1.html` | Bản dựng gốc, mở trực tiếp bằng trình duyệt |
| `vetc-parking-poster-1x1.png` | Ảnh xuất, 2160x2160 (deviceScaleFactor 2) |
| `vetc-parking-poster-1x1.pdf` | Bản PDF 1080x1080 để in hoặc lưu trữ |
| `motion-1x1.html` | Bản motion graphic, có bộ tween tất định `setTime(t)` |
| `vetc-parking-motion-1x1.mp4` | Video 1080x1080, 30fps, 8 giây, H.264 |
| `vetc-parking-motion-1x1.gif` | GIF 540x540, 15fps, dùng cho chat và email |
| `styles.css`, `tokens/`, `fonts/` | Token màu, chữ, khoảng cách và font VETC Sans |
| `assets/` | Logo lock-up VETC Parking và bộ icon thương hiệu |

## Tuân thủ nhận diện

- Nền: chỉ hai màu, xanh VETC `#0BB260` và trắng. Không gradient, không hoa văn.
- Thứ tự bố cục: logo, headline, Smart Line, dải liên hệ.
- Ba cỡ chữ: 88 headline, 28 dẫn nhập và tiêu đề bước, 20 chú thích.
- Lề 56px, lưới 4px, không đổ bóng, không emoji.
- Smart Line neo đáy, không xoay, chiếm dưới một phần ba bố cục.

## Motion graphic

Dài 8 giây, ghép vòng lặp liền mạch (khung đầu và khung cuối trùng khít).
Kịch bản: logo, eyebrow, headline hai dòng, dẫn nhập, tấm xanh trượt xuống mở ra
khối trắng, ba bước hiện lần lượt, Smart Line chạy từ trái sang phải, dải liên hệ
trượt lên, giữ hình, rồi khép về nền xanh.

Bám quy tắc chuyển động trong guideline: mỗi bước 400ms, nhịp `cubic-bezier(.2,0,0,1)`,
chỉ trượt và mờ dần, không nảy, không phóng to, Smart Line không xoay.

## Xuất lại

Cần Node và Chromium (Playwright), thêm ffmpeg có H.264 cho phần video.
Từ thư mục này:

```bash
npm i playwright-core ffmpeg-static
node render.mjs                                   # poster PNG và PDF
FFMPEG_PATH=$(node -p "require('ffmpeg-static')") node render-motion.mjs   # MP4 và GIF
```

Đổi đường dẫn Chromium bằng biến `CHROMIUM_PATH` nếu máy cài chỗ khác.

## Cần rà trước khi đăng

- Nội dung mô tả cơ chế trừ phí và tên tính năng trong ứng dụng VETC cần phòng
  sản phẩm hoặc phòng vận hành Parking xác nhận đúng với bản app đang chạy.
- Nếu bổ sung số liệu (số bãi liên kết, thời gian qua barie), phải có nguồn nội bộ
  đã duyệt.
- Người có thẩm quyền ký duyệt trước khi phát hành.
