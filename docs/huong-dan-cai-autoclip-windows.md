# Hướng dẫn cài AutoClip trên Windows

Bản ghi nhận ngày 07/10/2026. Đối chiếu trực tiếp với repo `zhouxiaoka/autoclip` và trang Releases.
Phiên bản mới nhất tại thời điểm rà: v1.5.5 (phát hành 06/10/2026).

## 1. Kết luận trước khi làm

Dùng bản desktop cài sẵn. Không cần Docker, không cần cài Python, Node, Redis hay FFmpeg thủ công.

Lý do: AutoClip chạy native trên Windows không được, vì bộ script gốc giả định môi trường Unix (Redis, Celery, shell script). Nhưng tác giả có đóng gói bản desktop cho Windows x64, bên trong đã kèm Python và FFmpeg. Đây là đường ngắn nhất và đúng nhất cho máy Windows.

Bản Docker chỉ nên dùng khi cần chạy trên server dùng chung cho nhiều người. Xem mục 7.

## 2. Yêu cầu máy

| Hạng mục | Mức cần |
| --- | --- |
| Hệ điều hành | Windows 10 hoặc 11, bản 64-bit (x64) |
| RAM | tối thiểu 8 GB, nên có 16 GB |
| Ổ đĩa trống | tối thiểu 20 GB. Video gốc, model transcribe, file tạm và bản xuất đều ăn dung lượng |
| Mạng | cần cho lúc tải bộ cài, tải WebView2 nếu thiếu, và cho mỗi lần gọi model đám mây |
| Quyền | cài theo user, không cần quyền admin |

Chuẩn bị thêm một API key của nhà cung cấp model. Không có key thì cài xong vẫn không chạy được bước phân tích. Xem mục 5.

## 3. Tải bộ cài

Vào trang Releases, lấy đúng file dành cho Windows:

https://github.com/zhouxiaoka/autoclip/releases/latest

File cần tải: `AutoClip.Desktop_1.5.5_x64-setup.exe`, dung lượng khoảng 197 MB.

Lưu ý quan trọng: không tải file `Source code (zip)` hay `Source code (tar.gz)`. Đó là mã nguồn, không phải bộ cài. File `.dmg` là của macOS, file `.zip` có chữ `cli-mcp` là bản dòng lệnh, đều không dùng cho việc này.

## 4. Cài đặt

1. Chạy file `AutoClip.Desktop_1.5.5_x64-setup.exe`.
2. Windows SmartScreen sẽ cảnh báo, vì bộ cài chưa được ký số. Đây là tình trạng đã được tác giả ghi nhận trong release note, không phải lỗi. Bấm "More info" rồi bấm "Run anyway". Trước khi bấm, kiểm tra lại là file vừa tải từ đúng trang Releases của repo nêu trên.
3. Nếu máy chưa có Microsoft Edge WebView2, bộ cài sẽ tự tải về. Giữ kết nối mạng trong lúc này.
4. Theo hướng dẫn trên màn hình cho tới khi xong, rồi mở AutoClip Desktop từ Start Menu.

Bộ cài cho Windows đã kèm Microsoft C++ runtime, nên máy cũ không cần cài thêm.

## 5. Cấu hình model, làm trước khi import video

Mở "Settings" trong ứng dụng, vào khu vực cấu hình model.

Chọn một nhà cung cấp, điền API key và tên model, bấm test connection, rồi bấm save. Các nhà cung cấp được hỗ trợ: Qwen, OpenAI, Gemini, DeepSeek, Doubao Seed, Kimi, GLM, Grok, hoặc model chạy local qua Ollama và LM Studio.

Hai điểm dễ sai:
- Cấu hình đã lưu trong trang Settings có thể được ưu tiên hơn biến môi trường. Đổi nhà cung cấp thì phải test lại và save lại.
- Phí gọi model do nhà cung cấp thu, không phải do AutoClip. Cần theo dõi chi phí nếu xử lý nhiều video.

Về phụ đề:
- Có sẵn file `.srt` khớp timeline thì import kèm video. Đây là đường chạy mặc định và nhanh nhất.
- Không có phụ đề thì phải chuẩn bị bộ transcribe local (Whisper) trong Settings. Lần đầu tải model khá lâu. Dung lượng model tuỳ cấp: `tiny` 39 MB, `base` 74 MB, `small` 244 MB, `medium` 769 MB, `large` khoảng 1,5 GB. Model càng lớn càng chính xác và càng chậm.

Khuyến nghị cho lần chạy thử đầu tiên: lấy một video ngắn 3 đến 5 phút kèm sẵn file `.srt`, để tách bạch lỗi cấu hình model và lỗi transcribe.

## 6. Ba hạn chế cần biết trước, riêng với nhu cầu tiếng Việt

Đây là phần quan trọng nhất, nên đọc trước khi quyết định triển khai rộng.

**Giao diện chưa có tiếng Việt.** Ứng dụng hỗ trợ 8 ngôn ngữ: Trung giản thể, Anh, Nhật, Hàn, Tây Ban Nha, Bồ Đào Nha (Brazil), Nga, Pháp. Không có tiếng Việt. Dùng giao diện tiếng Anh là hợp lý nhất.

**Nội dung AI sinh ra sẽ không tự ra tiếng Việt.** Toàn bộ prompt của hệ thống nằm trong thư mục `prompt/` và được viết bằng tiếng Trung, định hướng theo thị hiếu nền tảng Bilibili. Trong repo không có tham số chọn ngôn ngữ đầu ra, và tài liệu i18n của chính dự án ghi rõ: đổi ngôn ngữ giao diện không làm đổi ngôn ngữ prompt hay ngôn ngữ nội dung được sinh ra. Hệ quả thực tế: đưa video tiếng Việt vào, phần cắt cảnh theo timeline vẫn chạy, nhưng tiêu đề và mô tả do AI đề xuất rất dễ ra tiếng Trung và mang giọng Bilibili, không dùng trực tiếp được cho kênh VETC. Toàn bộ tiêu đề và caption phải viết lại bằng tiếng Việt theo giọng thương hiệu.

**Mỗi lần xử lý là một lần đưa dữ liệu ra ngoài.** Khi chọn model đám mây, phụ đề của video và, nếu bật phân tích hình ảnh, cả khung hình được gửi tới API của nhà cung cấp bên thứ ba. Chiếu theo nguyên tắc phân tầng dữ liệu của VETC: chỉ đưa vào AutoClip những video đã công khai hoặc đã được duyệt cho phát hành. Video nội bộ chưa duyệt, tư liệu có biển số, CCCD, thông tin khách hàng hay nội dung liên quan sự cố thì không đưa lên model đám mây. Nếu buộc phải xử lý nhóm tư liệu này, chuyển sang model local qua Ollama hoặc LM Studio để dữ liệu không rời khỏi máy, và xin ý kiến phòng phụ trách dữ liệu trước.

Ngoài ra, tác giả ghi rõ đây là dự án cá nhân làm ngoài giờ, không có cam kết SLA, không có hỗ trợ triển khai một đối một. Không nên đặt AutoClip vào mắt xích bắt buộc của một quy trình sản xuất có deadline cứng.

## 7. Phương án dự phòng, chạy bằng Docker

Chỉ dùng khi cần một bản chạy chung cho nhiều người trên server, hoặc khi bản desktop lỗi. Trên Windows cần Docker Desktop với backend WSL2.

Nên clone repo vào trong hệ thống file của WSL2, ví dụ `~/autoclip` trong Ubuntu, thay vì để ở ổ `C:`. Lý do là hiệu năng truy cập file và quyền sở hữu file cho đúng.

Chạy trong terminal của WSL2:

```bash
git clone https://github.com/zhouxiaoka/autoclip.git
cd autoclip
cp env.example .env
```

Sửa file `.env`, điền ba dòng sau theo nhà cung cấp đang dùng:

```dotenv
LLM_PROVIDER=dashscope
API_MODEL_NAME=qwen-plus
API_DASHSCOPE_API_KEY=dien_api_key_vao_day
```

Sau đó:

```bash
mkdir -p data logs uploads
docker compose build
docker compose run --rm --no-deps --user root --entrypoint sh autoclip \
  -c 'chown -R autoclip:autoclip /app/data /app/logs /app/uploads'
docker compose up -d
docker compose ps
```

Lệnh `chown` là để user `autoclip` trong container ghi được vào ba thư mục mount. Không đặt quyền `777`.

Các địa chỉ truy cập sau khi chạy:

| Cổng vào | Địa chỉ |
| --- | --- |
| Giao diện web | http://localhost:3000 |
| Tài liệu API | http://localhost:8000/docs |
| Health check | http://localhost:8000/api/v1/health/ |
| Theo dõi task | http://localhost:5555 |

Bản Docker này dành cho máy cá nhân hoặc mạng nội bộ tin cậy. Nếu đưa ra Internet thì phải có lớp kiểm soát truy cập riêng, và tuyệt đối không mở trực tiếp cổng Redis (6379) và cổng Flower (5555).

## 8. Khi gặp lỗi

```bash
docker compose ps
docker compose logs --tail=100 autoclip celery-worker
```

| Hiện tượng | Kiểm tra |
| --- | --- |
| Không mở được trang | Container `autoclip` có chạy không, cổng 3000 và 8000 có bị tiến trình khác chiếm không |
| Project treo ở trạng thái chờ | `celery-worker` và Redis có khoẻ không, có giữ nguyên tham số hàng đợi riêng trong compose không |
| Permission denied, database read-only | Ba thư mục `data/`, `logs/`, `uploads/` có cho container ghi không |
| Test model thất bại | Nhà cung cấp, tên model, API key, Base URL đã lưu. Model local thì kiểm tra container có gọi tới máy host được không |
| Không sinh ra clip nào | Lần theo bốn chặng: phụ đề, phân tích, chấm điểm, xuất file |

Đổi cổng thì chỉ sửa phía bên trái của phần mapping, ví dụ `"3001:3000"`, rồi truy cập bằng cổng mới. Không xoá database để chữa lỗi khởi động.

## 9. Dữ liệu và sao lưu

Thư mục dữ liệu mặc định của bản desktop trên Windows: `%APPDATA%\AutoClip`. Log thường nằm trong thư mục `logs` bên trong đó.

Bản Docker dùng ba thư mục mount: `./data` chứa database và project, `./logs` chứa log, `./uploads` chứa file tải lên.

Trước khi sao lưu, chờ các task chạy xong rồi dừng service. Bản sao lưu phải gồm cả file project, database và file cấu hình. Lưu ý file cấu hình có chứa API key, cần giữ cẩn thận và không đưa vào repo hay chat.

Không coi việc xoá database hay dọn sạch thư mục dữ liệu là bước xử lý sự cố thông thường. Cũng không mặc định là đã có bản backup tự động.

## 10. Việc cần làm sau khi cài

1. Cài xong, chạy thử một video ngắn công khai kèm `.srt` để xác nhận luồng hoạt động.
2. Đánh giá chất lượng điểm cắt trên tư liệu thật của VETC, vì đây là thứ AutoClip làm tốt nhất.
3. Chốt cách xử lý phần tiêu đề và caption. Thực tế sẽ phải viết lại bằng tiếng Việt, nên cần người phụ trách nội dung nhận phần này ngay từ đầu.
4. Chốt với phòng phụ trách dữ liệu danh mục tư liệu nào được phép đưa lên model đám mây, tư liệu nào phải xử lý bằng model local.

Mọi nội dung do AutoClip sinh ra đều là bản nháp. Người có thẩm quyền phải rà và duyệt trước khi phát hành.
