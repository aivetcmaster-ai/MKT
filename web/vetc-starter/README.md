# Khung starter VETC

Khung dựng trang web và landing page có hiệu ứng, đúng bộ nhận diện VETC 2026.
Dựa trên cấu trúc demo của Codrops (`index.html`, `css/base.css`, `js/index.js`)
nhưng thay toàn bộ phần nhận diện bằng token VETC.

## Mở xem

```bash
cd web
node tools/serve.mjs
# mở http://localhost:4173/vetc-starter/index.html
```

Nên mở qua server. Mở bằng `file://` thì trình duyệt chặn nạp phông, trang sẽ rơi
về Inter hoặc Arial. Phần lớn demo trong `web/demos` cũng cần server.

## File

| File | Vai trò |
|---|---|
| `index.html` | Bố cục mẫu: khối xanh, ba bước, khối nền nhạt, dải liên hệ |
| `css/fonts.css`, `fonts/` | VETC Sans tự host, bốn định lượng Regular, Medium, SemiBold, Bold |
| `css/vetc-tokens.css` | Token màu, chữ, khoảng cách. Bản sao từ skill `vetc-design`, không sửa tay |
| `css/base.css` | Bố cục riêng của trang. Chỉ dùng biến, không hard-code mã màu |
| `js/index.js` | Hiệu ứng hiện nội dung khi cuộn, có nhánh giảm chuyển động |
| `js/gsap.min.js`, `js/ScrollTrigger.min.js` | GSAP, lấy từ demo Codrops ScrollTextMotion |

## Cách ghép một hiệu ứng Codrops vào đây

1. Tra demo: `node tools/list-demos.mjs <tu-khoa>`, ví dụ `node tools/list-demos.mjs scroll text`.
2. Tải nếu chưa có: `node tools/fetch-demo.mjs <TenDemo>`, rồi `node tools/restore-assets.mjs <TenDemo>` để xem bản đủ hình.
3. Đọc `index.html` và `js/index.js` của demo, chép phần logic cần dùng sang `js/index.js` của starter.
4. Chép CSS của hiệu ứng sang `css/base.css`, đổi mọi mã màu sang biến `--vetc-*`.
5. Ghi demo đã dùng vào `web/NOTICE.md`.

## Rà trước khi phát hành

- Toàn bộ chữ trong `index.html` là nội dung mẫu, phải thay.
- Số liệu, mức phí, tên tính năng trong ứng dụng cần phòng sản phẩm hoặc vận hành xác nhận.
- Pháp nhân, địa chỉ, hotline cần đối chiếu lại trước mỗi lần phát hành.
- Chạy checklist nhận diện trong skill `vetc-design` trước khi gửi duyệt.
- Người có thẩm quyền ký duyệt.
