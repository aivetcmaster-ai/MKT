# Xưởng motion graphic VETC (Remotion)

Dự án Remotion 4 để dựng video và motion graphic theo bộ nhận diện VETC
(Brand Guideline Nov 2025). Mỗi cảnh là một component React, dựng bằng token
màu, chữ và nhịp chuyển động dùng chung, xuất ra MP4 hoặc GIF bằng một lệnh.

## Cài đặt

Cần Node 18 trở lên. Từ thư mục này:

```bash
npm install
```

Remotion cần Chromium ở chế độ headless cũ (`headless_shell`). File
`remotion.config.ts` tự tìm bản có sẵn trong `PLAYWRIGHT_BROWSERS_PATH`
(mặc định `/opt/pw-browsers`). Máy cài chỗ khác thì chỉ đường dẫn bằng biến
`CHROMIUM_PATH`. Không tìm thấy bản nào, Remotion tự tải một bản riêng ở lần
render đầu tiên. Bản Chrome đầy đủ không dùng được, phải là `headless_shell`.

## Lệnh thường dùng

| Lệnh | Việc |
|---|---|
| `npm run studio` | Mở Remotion Studio, xem và tinh chỉnh trực tiếp trên trình duyệt |
| `npm run compositions` | Liệt kê các composition đang có |
| `npm run render:parking` | Xuất MP4 1080x1080, 30fps, H.264, CRF 18 |
| `npm run gif:parking` | Xuất GIF 540x540, 15fps cho chat và email |
| `npm run render:tips` | Dựng cả loạt clip dọc 9:16 từ `data/clips.json` |
| `npm run typecheck` | Kiểm tra kiểu TypeScript |
| `npm run render -- <id> out/<file>.mp4` | Xuất một composition bất kỳ |

File xuất nằm trong `out/`, thư mục này không đưa vào git. Chép sang thư mục
chiến dịch tương ứng khi bản dựng đã được duyệt.

## Cấu trúc

```
src/
  index.ts                     điểm vào, đăng ký root
  Root.tsx                     khai báo composition và kích thước
  brand/tokens.ts              màu, chữ, khoảng cách theo guideline
  brand/motion.ts              nhịp chuyển động chuẩn VETC
  brand/fonts.ts               nạp VETC Sans trước khi chụp khung hình
  brand/SmartLine.tsx          đồ hoạ Smart Line
  compositions/                từng cảnh, mỗi file một sản phẩm
public/
  fonts/                       VETC Sans woff2
  assets/logo, assets/icons    lock-up và bộ icon thương hiệu
data/
  clips.json                   nội dung các clip dựng hàng loạt
scripts/
  render-batch.mjs             dựng cả loạt clip từ file JSON
  find-chromium.mjs            tìm Chromium có sẵn trong máy
```

## Composition đang có

| ID | Kích thước | Dài | Mô tả |
|---|---|---|---|
| `VetcParking1x1` | 1080x1080 | 8 giây | Motion graphic VETC Parking cho social, ghép vòng lặp liền mạch |
| `VetcTip9x16` | 1080x1920 | tự tính | Template dọc cho TikTok, Reels, Zalo: một tiêu đề lớn và tối đa bốn ý |

`VetcParking1x1` là bản chuyển từ `posters/vetc-parking/motion-1x1.html` sang
Remotion, giữ nguyên kịch bản và nhịp. Bản HTML cũ và script `render-motion.mjs`
vẫn còn nguyên trong thư mục đó, không bị thay thế.

`VetcTip9x16` không cố định độ dài. Càng nhiều ý thì clip càng dài, độ dài tính
trong `tipTimeline` rồi trả về cho Remotion qua `calculateMetadata`, nên không
phải chỉnh tay mỗi lần đổi nội dung.

Toàn bộ chữ trên cảnh nằm trong `defaultProps`, sửa được ngay trong Studio hoặc
truyền lúc render bằng `--props`.

## Dựng cả loạt clip từ một file JSON

Không cần sửa mã để ra clip mới. Mở `data/clips.json`, thêm một mục vào mảng
`clips`, chạy một lệnh là có đủ video:

```json
{
  "id": "ten-file-khong-dau",
  "composition": "VetcTip9x16",
  "props": {
    "eyebrow": "Mẹo cho bác tài",
    "headline": ["Dòng một", "dòng hai"],
    "lead": "Một câu dẫn nhập ngắn.",
    "tips": [{ "title": "Ý thứ nhất", "detail": "Câu giải thích ngắn." }],
    "note": "Ghi chú cuối, bỏ được nếu không cần.",
    "hotline": "1900 6010",
    "website": "vetc.com.vn",
    "tagline": "Sống hiện đại - Lái văn minh"
  }
}
```

```bash
npm run render:tips                                  # dựng toàn bộ clip trong file
node scripts/render-batch.mjs --only=ten-file-khong-dau   # chỉ dựng một clip
node scripts/render-batch.mjs data/chien-dich-x.json      # dùng file nội dung khác
```

Script đóng gói dự án một lần rồi render lần lượt, ra `out/<id>.mp4`. Người làm
nội dung chỉ đụng vào file JSON, không cần biết React.

Mẹo viết nội dung cho khổ dọc: headline tối đa ba dòng, mỗi clip tối đa bốn ý,
mỗi ý một câu. Dài hơn thì tách thành clip khác cho bác tài còn kịp đọc.

## Logo trên nền xanh

File `assets/logo/vetc-wordmark-white.png` trong bộ nhận diện là chữ trắng trên
nền đen đặc, đặt lên nền xanh sẽ lòi ra khối đen. Bản
`assets/logo/vetc-wordmark-white-alpha.png` là chính file đó đã tách nền, giữ
nguyên nét chữ, dùng cho nền xanh. Bộ phận thương hiệu nên xác nhận lại bản tách
nền này trước khi dùng cho ấn phẩm đối ngoại.

Lock-up dịch vụ như `sub-parking-white.png` vốn đã trong nền, dùng thẳng được.

## Quy tắc nhận diện phải giữ

- Nền chỉ hai màu, xanh VETC `#0BB260` và trắng. Không gradient, không hoa văn.
- Tối đa ba cỡ chữ trong một bố cục, cỡ chia hết cho 4, lề 56px, lưới 4px.
- Chuyển động: mỗi bước 400ms, nhịp `cubic-bezier(.2,0,0,1)`, chỉ trượt và mờ
  dần, không nảy, không phóng to.
- Smart Line chạy trái sang phải hoặc neo đáy, không xoay, không đè lên logo,
  không quá một phần ba bố cục.
- Không đổ bóng, không emoji.

Thêm cảnh mới thì tạo file trong `src/compositions/`, dùng token trong
`src/brand/` thay vì tự đặt màu và cỡ chữ rời.

## Cần rà trước khi đăng

- Nội dung mô tả tính năng, cơ chế trừ phí phải được phòng sản phẩm hoặc vận
  hành xác nhận đúng với bản app đang chạy.
- Số liệu đưa vào cảnh phải có nguồn nội bộ đã duyệt.
- Người có thẩm quyền ký duyệt trước khi phát hành.
