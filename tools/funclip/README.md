# FunClip cho đội nội dung VETC

FunClip (modelscope/FunClip) là công cụ mã nguồn mở của Alibaba TONGYI Speech Lab, chạy hoàn toàn trên máy cục bộ. Cách dùng: đưa video vào, công cụ nhận dạng giọng nói ra transcript kèm timestamp, bạn bôi đen đoạn chữ muốn giữ, bấm cắt, và nhận về đoạn video tương ứng cùng file phụ đề SRT.

Phiên bản cài đặt: **v2.2.1**. Kho gốc: https://github.com/modelscope/FunClip

## Trước khi cài, đọc phần này

**FunClip chưa hỗ trợ tiếng Việt.** Các model ASR đi kèm chỉ nhận dạng được:

| Model | Ngôn ngữ |
| --- | --- |
| SeACo-Paraformer (mặc định) | tiếng Trung |
| Paraformer English (`-l en`) | tiếng Anh |
| SenseVoiceSmall (`-m sensevoice`) | Trung, Quảng Đông, Anh, Nhật, Hàn |
| Fun-ASR-Nano (`-m fun-asr-nano`) | Trung, Anh, Nhật và các phương ngữ Trung |

Nghĩa là với video tiếng Việt của VETC (TVC, phóng sự, clip bác tài, livestream), phần nhận dạng lời thoại sẽ không dùng được. Chỉ hai nhóm việc sau còn giá trị:

1. Cắt video theo timestamp thủ công và xuất phụ đề, dùng phần cắt của FunClip mà bỏ phần ASR.
2. Xử lý nội dung tiếng Anh hoặc tiếng Trung, ví dụ tư liệu ETC nước ngoài, hội thảo quốc tế.

Nếu mục tiêu là tự động hoá cắt clip tiếng Việt, cần một hướng khác (Whisper large-v3 hoặc dịch vụ ASR tiếng Việt trong nước). Trao đổi lại với người phụ trách trước khi đầu tư thời gian vào FunClip.

## Yêu cầu hệ thống

- Python 3.10 đến 3.12
- ffmpeg trong PATH
- git
- Khoảng 6 GB trống: 2-3 GB thư viện Python, 3 GB model
- Máy vào được `modelscope.cn` để tải model. Nếu mạng công ty chặn, phải tải model ở máy khác rồi chép thư mục cache sang.
- GPU không bắt buộc. CPU chạy được, chỉ chậm hơn.

## Cài đặt

### macOS hoặc Linux

```bash
bash tools/funclip/install.sh ~/funclip
```

Cài ffmpeg trước nếu chưa có: `brew install ffmpeg` (macOS) hoặc `sudo apt-get install -y ffmpeg` (Ubuntu, Debian).

### Windows

```powershell
.\tools\funclip\install.ps1 -TargetDir C:\funclip
```

Cài sẵn phụ thuộc nếu thiếu:

```powershell
winget install Python.Python.3.11
winget install Git.Git
winget install Gyan.FFmpeg
```

Script cài đặt viết bằng ký tự không dấu để tránh lỗi hiển thị trên console Windows. Nội dung hướng dẫn đầy đủ nằm ở file này.

## Tải model trước

Chạy một lần, sau đó FunClip khởi động nhanh và không phụ thuộc mạng:

```bash
~/funclip/venv/bin/python tools/funclip/download_models.py
# thêm --with-sensevoice nếu cần model đa ngôn ngữ
```

Model lưu ở `~/.cache/modelscope`. Có thể nén thư mục này và chép sang máy khác trong đội để khỏi tải lại.

## Chạy

Giao diện web:

```bash
cd ~/funclip/FunClip
~/funclip/venv/bin/python funclip/launch.py
# -l en cho video tiếng Anh
# -p 7861 để đổi cổng
```

Mở `http://localhost:7860`. Quy trình: tải video lên, chờ nhận dạng, copy đoạn chữ cần giữ vào ô "Text to Clip", chỉnh phụ đề nếu muốn, bấm "Clip" hoặc "Clip and Generate Subtitles".

Dòng lệnh, không cần giao diện:

```bash
# Bước 1: nhận dạng, xuất transcript và SRT
~/funclip/venv/bin/python funclip/videoclipper.py --stage 1 \
    --file video.mp4 --output_dir ./output

# Bước 2: cắt theo đoạn chữ
~/funclip/venv/bin/python funclip/videoclipper.py --stage 2 \
    --file video.mp4 --output_dir ./output \
    --dest_text 'đoạn chữ cần cắt' \
    --start_ost 0 --end_ost 100 \
    --output_file ./output/res.mp4
```

## Quy tắc dữ liệu khi dùng trong VETC

- Phần nhận dạng và cắt video chạy hoàn toàn cục bộ, video không rời khỏi máy. Đây là lý do chính nên dùng FunClip thay vì công cụ cắt clip online.
- **Không bật tính năng LLM Clipping với nội dung nội bộ.** Tính năng này gửi toàn bộ transcript ra API bên thứ ba (OpenAI, DashScope, OrcaRouter, TwelveLabs). Với video có số liệu vận hành, thông tin khách hàng, phát ngôn lãnh đạo chưa duyệt, tuyệt đối không dùng.
- Video có biển số xe, mặt khách hàng, thông tin tài khoản giao thông phải xử lý theo phân quyền phòng và che thông tin trước khi phát hành.
- Mặc định FunClip chỉ lắng nghe localhost. Không bật cờ `-s True` (chia sẻ công khai) trên máy đang chứa tư liệu nội bộ.

## Không cài được trong session Claude Code trên web

Môi trường chạy Claude Code trên web chặn `modelscope.cn` và `huggingface.co` theo chính sách egress của tổ chức, nên không tải được model ASR. Thư viện Python cài được nhưng công cụ sẽ không nhận dạng được gì. Hãy cài trên máy cá nhân hoặc máy trạm dựng phim theo hướng dẫn ở trên.

## Các file trong thư mục này

| File | Công dụng |
| --- | --- |
| `install.sh` | Cài đặt trên macOS và Linux |
| `install.ps1` | Cài đặt trên Windows |
| `download_models.py` | Tải trước bộ model ASR |
