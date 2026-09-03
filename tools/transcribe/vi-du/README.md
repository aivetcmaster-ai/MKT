# Bản mẫu đầu ra

Bốn file trong thư mục này minh hoạ đúng những gì `transcribe.py` xuất ra cho một video social dài 35 giây.

| File | Dùng cho |
|---|---|
| `.srt` | Phụ đề nạp vào Premiere, CapCut, YouTube |
| `.vtt` | Phụ đề cho web, thẻ `<track>` trong HTML5 video |
| `.txt` | Bản chữ liền để biên tập lại thành caption, bài viết |
| `.json` | Mốc thời gian và thông tin nhận dạng để xử lý tiếp bằng script |

Lưu ý về nguồn gốc: phần lời thoại trong các file này do người viết để làm mẫu, không phải kết quả bóc băng từ một file ghi âm thật. Phần định dạng, mốc thời gian và ngắt dòng là do chính code trong `transcribe.py` sinh ra.
