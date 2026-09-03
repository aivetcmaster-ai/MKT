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
