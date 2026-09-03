# Bóc băng audio và video bằng faster-whisper

Công cụ nhận dạng giọng nói chạy tại máy, dùng cho việc làm phụ đề video social, bóc băng phỏng vấn, họp nội bộ, ghi âm hội thảo. Nền tảng là [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper), bản Whisper tối ưu bằng CTranslate2, nhanh hơn và nhẹ RAM hơn bản gốc của OpenAI.

Toàn bộ xử lý diễn ra trên máy chạy lệnh. Không có file nào được gửi lên dịch vụ bên ngoài, chỉ có phần tải model ở lần chạy đầu.

## Cài đặt

```bash
bash tools/transcribe/setup.sh
```

Script tạo môi trường ảo `.venv-whisper` ở gốc repo và cài `faster-whisper`. Yêu cầu Python 3.9 trở lên. Không cần cài ffmpeg vì việc giải mã audio và video do PyAV lo.

Lần chạy đầu tiên sẽ tải model từ huggingface.co về `~/.cache/huggingface`. Các lần sau chạy offline được.

## Dùng

```bash
# Một video, xuất SRT và TXT cạnh file gốc
.venv-whisper/bin/python tools/transcribe/transcribe.py video.mp4

# Cả thư mục, model chính xác hơn, lưu riêng một chỗ
.venv-whisper/bin/python tools/transcribe/transcribe.py ghi-am/ --model medium --outdir ban-boc

# File tiếng Anh, tự nhận ngôn ngữ, xuất thêm VTT cho web
.venv-whisper/bin/python tools/transcribe/transcribe.py hoi-thao.m4a --lang auto --formats srt,vtt,txt
```

Định dạng đầu vào: mp3, wav, m4a, aac, flac, ogg, opus, wma, mp4, mov, mkv, webm, avi.
Định dạng đầu ra: `srt` cho phụ đề, `vtt` cho web, `txt` cho bản chữ liền, `json` kèm mốc thời gian và độ tin cậy.

## Chọn model cho tiếng Việt

| Model | Dung lượng | Tốc độ trên CPU | Dùng khi |
|---|---|---|---|
| `tiny` | 75 MB | rất nhanh | thử nhanh, kiểm tra luồng chạy |
| `base` | 145 MB | nhanh | nội dung dễ, một người nói rõ |
| `small` | 500 MB | vừa | mặc định, phụ đề video social |
| `medium` | 1.5 GB | chậm trên CPU | phỏng vấn, nhiều người nói, có tạp âm |
| `large-v3` | 3 GB | cần GPU | bản chính xác nhất, tài liệu quan trọng |

Máy có GPU NVIDIA thì công cụ tự dùng CUDA. Máy chỉ có CPU thì tự chạy lượng tử hóa int8 cho nhẹ. Muốn ép thì dùng `--device` và `--compute-type`.

Ước lượng thô trên CPU 8 nhân: model `small` xử lý một file 10 phút mất khoảng 3 tới 5 phút.

## Tham số hay dùng

| Tham số | Mặc định | Ý nghĩa |
|---|---|---|
| `--model` | `small` | Tên model hoặc đường dẫn thư mục model đã tải sẵn |
| `--lang` | `vi` | Mã ngôn ngữ, `auto` để tự nhận |
| `--formats` | `srt,txt` | Danh sách định dạng xuất |
| `--outdir` | cạnh file gốc | Thư mục lưu kết quả |
| `--beam-size` | `5` | Tăng thì chính xác hơn, chậm hơn |
| `--max-chars` | `42` | Số ký tự tối đa mỗi dòng phụ đề, đặt `0` để tắt ngắt dòng |
| `--no-vad` | tắt | Bỏ bộ lọc khoảng lặng, dùng khi công cụ cắt mất tiếng nói nhỏ |

## Từ điển thuật ngữ

File `vetc-tu-dien.txt` chứa các thuật ngữ được mồi cho model để viết đúng tên riêng như VETC, ETC, VETC Parking, tài khoản giao thông. Thêm bớt từ trong file này khi cần. Muốn tắt thì dùng `--khong-mo-tu-dien`.

## Lưu ý khi dùng cho công việc

Bản bóc băng là bản nháp do máy tạo. Tên riêng, số liệu, mức phí, phát ngôn của lãnh đạo phải có người rà lại trước khi dùng cho nội dung đối ngoại hoặc báo cáo.

Ghi âm có dữ liệu khách hàng như biển số, số điện thoại, số thẻ thì ẩn danh phần chữ trước khi đưa nội dung đi tiếp. Không đưa file ghi âm gốc chứa dữ liệu khách hàng ra ngoài hệ thống nội bộ.

## Bản mẫu đầu ra

Thư mục `vi-du/` chứa bốn file SRT, VTT, TXT, JSON của một video social dài 35 giây để xem trước hình dạng kết quả.
