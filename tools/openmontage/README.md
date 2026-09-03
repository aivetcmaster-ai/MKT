# OpenMontage - hướng dẫn cài đặt và dùng thử

OpenMontage (`calesthio/OpenMontage`) là hệ thống sản xuất video theo hướng agentic,
mã nguồn mở. Người dùng mô tả video bằng ngôn ngữ tự nhiên, trợ lý lập trình sẽ
nghiên cứu chủ đề, viết kịch bản, sinh hoặc tìm tư liệu, dựng timeline và render
thành phẩm. Giấy phép AGPLv3.

Thư mục này chỉ chứa script cài đặt và tài liệu. Mã nguồn OpenMontage không được
đưa vào repo MKT để tránh ràng buộc giấy phép AGPL lên tài sản nội bộ.

## Yêu cầu môi trường

| Thành phần | Phiên bản | Ghi chú |
|---|---|---|
| Python | 3.10 trở lên | kèm `venv` |
| Node.js | 18 trở lên | khuyến nghị 22 cho HyperFrames |
| FFmpeg | bản mới | bắt buộc, dùng cho mọi khâu xử lý media |
| Git, make | bản mới | |

Cài nhanh phần nền:

```bash
# macOS
brew install git node ffmpeg python@3.11

# Ubuntu / Debian
sudo apt update && sudo apt install -y git nodejs npm ffmpeg python3 python3-venv make
```

## Cài đặt

```bash
bash tools/openmontage/setup-openmontage.sh          # cài vào ~/openmontage
bash tools/openmontage/setup-openmontage.sh /duong/dan/khac
```

Script sẽ kiểm tra công cụ nền, clone mã nguồn, chạy `make setup` (tạo `.venv`,
cài thư viện Python, cài Remotion composer, cài piper-tts, tạo `.env` từ mẫu),
rồi in danh sách công cụ khả dụng.

Nếu không muốn dùng script, làm thủ công:

```bash
git clone https://github.com/calesthio/OpenMontage.git ~/openmontage
cd ~/openmontage
make setup
```

## Kiểm chứng sau khi cài

```bash
cd ~/openmontage
make preflight                                   # liệt kê công cụ và trạng thái
make demo-list                                   # ba bản demo không cần API key
.venv/bin/python render_demo.py world-in-numbers # render thử
```

Kết quả nằm ở `projects/demos/renders/`. Bản demo `world-in-numbers` cho ra file
MP4 1920x1080, 30fps, khoảng 23 giây, H.264 kèm audio AAC.

## API key

Toàn bộ key đều tùy chọn, khai báo trong `~/openmontage/.env`. Không có key nào
thì vẫn dùng được nhánh Remotion để dựng video từ chữ, số liệu và đồ họa, cùng
giọng đọc offline piper-tts.

Nhóm key đáng cân nhắc trước cho nhu cầu marketing:

- `PEXELS_API_KEY`, `PIXABAY_API_KEY`, `UNSPLASH_ACCESS_KEY`: kho ảnh và footage
  miễn phí, đủ cho phần lớn video tư liệu thực tế.
- `FAL_KEY` hoặc `ATLASCLOUD_API_KEY`: cổng tổng hợp cho sinh ảnh và sinh video.
- `ELEVENLABS_API_KEY` hoặc `GOOGLE_API_KEY`: giọng đọc chất lượng cao.
- `SUNO_API_KEY`: nhạc nền.

Danh sách đầy đủ xem `.env.example` trong thư mục cài đặt.

Lưu ý bảo mật: `.env` nằm trong `.gitignore` của OpenMontage. Không đưa key vào
repo MKT, không dán key vào khung chat, không chia sẻ qua kênh không mã hóa.

## Cách dùng

Mở thư mục `~/openmontage` bằng trợ lý lập trình (Claude Code, Cursor, Copilot,
Windsurf, Codex) rồi mô tả yêu cầu. Ví dụ:

```
Làm video dọc 45 giây giới thiệu VETC Parking cho tài xế,
giọng gần gũi, có phụ đề tiếng Việt, dùng footage thực tế.
```

Trước khi làm việc thật, đọc `AGENT_GUIDE.md` và `PROJECT_CONTEXT.md` trong thư
mục cài đặt. Quy trình sản xuất đi qua `pipeline_defs/` và `skills/pipelines/`,
không nên tự chế biến ngoài luồng.

## Lưu ý cho VETC

- Mọi video có nhận diện VETC phải theo bộ quy chuẩn thương hiệu: màu chính
  `#2DBE60`, font VETC Sans cho digital, tagline "Sống hiện đại - Lái văn minh".
- Không đưa dữ liệu khách hàng (biển số, CCCD, số thẻ, số dư, số điện thoại) vào
  prompt hay tư liệu đầu vào. Ẩn danh trước khi dùng.
- Video đối ngoại phải qua người có thẩm quyền duyệt trước khi phát hành.
- Kiểm tra bản quyền và điều khoản sử dụng của từng nguồn tư liệu, kể cả tư liệu
  miễn phí, trước khi dùng cho mục đích thương mại.
- OpenMontage là AGPLv3. Chỉ dùng như công cụ nội bộ. Nếu có ý định tích hợp vào
  sản phẩm hoặc dịch vụ cung cấp ra ngoài, cần rà soát pháp lý trước.

## Sự cố thường gặp

**`make` báo thiếu Python 3.10+**: cài `uv` (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
hoặc cài Python mới rồi chạy lại.

**`npm install` lỗi `ERR_INVALID_ARG_TYPE` trên Windows**: dùng `npx --yes npm install`.

**Render Remotion báo không tải được Chrome Headless Shell**: máy cần tải một lần
từ `remotion.media`. Nếu mạng nội bộ chặn, mở allowlist cho host này, hoặc trỏ
sang Chrome sẵn có bằng `--browser-executable=/duong/dan/toi/chrome`.

**Render báo lỗi font hoặc `NetworkError` sau proxy chặn TLS**: thêm cờ
`--ignore-certificate-errors` khi gọi `npx remotion render`, hoặc cài chứng chỉ
CA của proxy vào trust store của máy.

**Không có ffmpeg**: các công cụ phân tích và ghép nối sẽ báo `unavailable` trong
`make preflight`. Cài ffmpeg rồi chạy lại.
