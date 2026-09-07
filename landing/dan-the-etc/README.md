# Landing page mẫu: dán thẻ VETC

Khung landing page dựng theo Quy chuẩn nhận diện đồ họa VETC 2026, dùng làm
điểm xuất phát cho các trang đích của dịch vụ thu phí không dừng.

## File

| File | Dùng khi nào |
|---|---|
| `index.html` | Bản nguồn, dùng để sửa. Nạp token và phông từ `../../posters/vetc-parking`. |
| `index.standalone.html` | Bản tự chứa một file, gửi qua email hoặc mở offline. |
| `artifact.html` | Bản đã bỏ thẻ bao, dùng để publish lên Artifact. |
| `build-standalone.py` | Sinh lại hai file trên sau khi sửa `index.html`. |

Sau mỗi lần sửa `index.html`, chạy lại:

```
python3 build-standalone.py
python3 build-standalone.py --artifact
```

## Quyết định thiết kế cần biết

- **Nền xanh mang chữ nhỏ dùng `#00803D`.** Chữ trắng trên xanh VETC `#0BB260`
  chỉ đạt 2.78:1, không đủ cho cả ngưỡng 3:1 của chữ lớn. `#00803D` là token
  `--action-primary-active` sẵn có trong hệ màu, chữ trắng đạt 5.05:1.
  Xanh `#0BB260` vẫn giữ vai trò màu nhấn, nút, smartlines và chữ tiêu điểm.
- **Logo trong repo là biến thể White_on_Black**, nền đen đặc. Trên nền xanh
  đang phải khử nền bằng `mix-blend-mode: screen`. Khi bổ sung được file bản
  White nền trong suốt từ bộ nhận diện, thay file và bỏ hai dòng
  `mix-blend-mode` trong CSS.
- **Không có JavaScript, không accordion.** Toàn bộ nội dung hiển thị tĩnh để
  in được, gửi được và đọc được ngoài môi trường chat.
- **Không đánh số 01-04 cho khối lý do**, vì đó không phải một chuỗi tuần tự.
  Chỉ khối ba bước đăng ký mới đánh số.

## Trước khi phát hành

- Điền các ô `[chờ điền]` ở dải số liệu theo nguồn nội bộ mới nhất.
- Rà lại phần hỏi đáp theo quy định hiện hành, nhất là câu về kênh nạp tiền.
- Biển số `29X-000.00` là dữ liệu giả, giữ nguyên hoặc thay bằng dữ liệu giả khác.
- Bỏ dải cảnh báo bản nháp ở đầu trang và ghi chú cuối chân trang.
- Chốt tagline dùng cho trang này: "Sống hiện đại - Lái văn minh" hay
  "Giải pháp thu phí giao thông thông minh".
