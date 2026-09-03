# pyJianYingDraft

Thư viện Python sinh và chỉnh sửa draft của CapCut / Jianying (Cap Cut bản Trung) bằng code:
tạo track video, audio, text, hiệu ứng, transition, keyframe, hoặc thay nội dung một template có sẵn.

Nguồn: https://github.com/GuanYixuan/pyJianYingDraft - bản đang dùng: 0.3.0 (PyPI).

## Cài đặt

```bash
bash tools/jianying/setup.sh
source .venv/bin/activate
```

Hoặc cài thẳng:

```bash
pip install pyJianYingDraft
```

Phụ thuộc kéo theo: imageio, pymediainfo (đọc metadata media qua MediaInfo), uiautomation (chỉ trên Windows, dùng cho chế độ tự động bấm xuất video).

## Kiểm tra nhanh

```bash
.venv/bin/python tools/jianying/example_text_draft.py out/
```

Lệnh trên ghi `out/draft_content.json` gồm một track text với animation máy chữ, màu chữ VETC Green.

## Ghi chú quan trọng

- Sinh file draft chạy được trên mọi hệ điều hành, kể cả Linux/container. Nhưng phần đọc thư mục draft
  của CapCut (`DraftFolder`) và phần tự động xuất video (`ExportWindow`, dùng uiautomation) chỉ chạy
  trên máy có cài CapCut, tức là Windows hoặc macOS.
- Đường dẫn thư mục draft trên Windows thường là
  `C:/Users/<user>/AppData/Local/JianyingPro/User Data/Projects/com.lveditor.draft`.
- API bản 0.3.0 khác README cũ trên GitHub (README đó viết cho 0.2.x). Điểm khác chính:
  - Tên enum chuyển sang CamelCase: `IntroType`, `TransitionType`, `TextIntro` (không còn `Intro_type`).
  - `ScriptFile(width, height, fps, maintrack_adsorb)` yêu cầu đủ 4 tham số.
  - Thêm track bằng `append_track(TrackSpec(TrackType.text))`, không còn `add_track(...)`.
- Thư viện dùng nhiều tên hiệu ứng bằng tiếng Trung (ví dụ `TextIntro.打字机IV`). Liệt kê tên hợp lệ bằng:

```python
import pyJianYingDraft as draft
print([e.name for e in draft.TextIntro])
```

## Việc thường dùng

| Việc | Lớp, hàm chính |
| --- | --- |
| Tạo draft mới | `ScriptFile`, `append_track`, `add_segment`, `dump` |
| Thêm video, ảnh | `VideoMaterial`, `VideoSegment` |
| Thêm nhạc, tiếng | `AudioMaterial`, `AudioSegment` |
| Thêm chữ | `TextSegment`, `TextStyle`, `TextBorder`, `TextBackground` |
| Hiệu ứng, filter | `add_effect`, `add_filter`, `VideoSceneEffectType`, `FilterType` |
| Nạp phụ đề | `import_srt` |
| Dùng template có sẵn | `DraftFolder.load_template`, `replace_material_by_name`, `replace_text` |

## Dựng draft video social VETC

`build_social_draft.py` dựng sẵn khung dọc 1080x1920, 30fps cho TikTok, Reels, Shorts.

```bash
.venv/bin/python tools/jianying/build_social_draft.py \
  --out drafts/vetc-parking-15s \
  --clip footage/tram.mp4 footage/app.png \
  --srt tools/jianying/sample.srt \
  --music audio/nhac-nen.mp3
```

Script tự làm những việc sau:

- Ghép clip theo đúng thứ tự truyền vào, ảnh tĩnh mặc định 3 giây, video giữ nguyên độ dài (cắt bớt bằng `--max-clip-duration`).
- Phóng clip theo chế độ `cover` để phủ kín khung dọc, không để viền đen. Đổi bằng `--fit contain`.
- Chuyển cảnh đổ bóng mờ 0.4 giây giữa các clip, đúng giới hạn chuyển động 400ms của guideline. Tắt bằng `--no-transition`.
- Chèn logo wordmark trắng ở góc trên trái, cao 72px, lề 64px, mờ dần vào trong 0.4 giây. Đổi bằng `--logo`, `--logo-position top-right`, hoặc bỏ bằng `--no-logo`.
- Nạp phụ đề từ SRT, chữ trắng đậm, canh giữa, đặt ở `transform_y = -0.60` để không đụng vùng nút bấm của app.
- Chốt bằng câu "Sống hiện đại - Lái văn minh" trên nền xanh VETC `#0BB260`, 2.5 giây cuối. Đổi bằng `--cta`, `--cta-duration`, bỏ bằng `--no-cta`.
- Nhạc nền âm lượng 0.18, fade in 1 giây, tự cắt theo độ dài video.

Xem đủ tham số: `--help`.

### Đưa draft vào CapCut

1. Mở CapCut, tạo một dự án trống, lưu lại rồi đóng.
2. Tìm thư mục dự án vừa tạo trong thư mục draft của CapCut.
3. Chép đè `draft_content.json` do script sinh ra vào thư mục đó.
4. Mở lại CapCut, dự án sẽ hiện đúng track đã dựng.

Đường dẫn media trong file draft là đường dẫn tuyệt đối trên máy sinh draft. Nếu dựng ở máy này rồi mở ở máy khác, phải giữ nguyên cấu trúc thư mục media, hoặc dựng lại ngay trên máy chạy CapCut.

### Điểm cần người rà trước khi xuất video

- Font: CapCut chưa có VETC Sans nên phụ đề dùng font mặc định. Đổi sang font hỗ trợ đủ dấu tiếng Việt ngay trong CapCut trước khi xuất.
- Vị trí logo và phụ đề tính theo công thức, cần xem lại một lần trên máy để chắc chắn không đè lên nội dung.
- Câu chốt và phụ đề là nội dung đối ngoại, phải có người phụ trách duyệt trước khi đăng.
