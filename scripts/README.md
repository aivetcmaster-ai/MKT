# Scripts

Các script dùng chung cho kho MKT.

## setup-auto-editor.sh

Cài `auto-editor` (WyattBlue/auto-editor), công cụ tự cắt đoạn im lặng hoặc đoạn không có chuyển động trong video. Dùng cho các bản dựng video social và motion graphic trong `posters/`.

Chạy tay:

```bash
bash scripts/setup-auto-editor.sh
```

Script tự bỏ qua nếu máy đã có đúng phiên bản, nên chạy lại nhiều lần vẫn an toàn. Muốn nâng phiên bản thì sửa `AUTO_EDITOR_VERSION` trong script, hoặc truyền tạm qua biến môi trường:

```bash
AUTO_EDITOR_VERSION=29.3.1 bash scripts/setup-auto-editor.sh
```

### Chạy tự động mỗi phiên Claude Code trên web

`.claude/hooks/session-start.sh` gọi lại script này khi mở phiên. Hook chỉ chạy trong môi trường remote (`CLAUDE_CODE_REMOTE=true`), không đụng tới máy cá nhân. Để hook có hiệu lực, cần đăng ký trong `.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash $CLAUDE_PROJECT_DIR/.claude/hooks/session-start.sh"
          }
        ]
      }
    ]
  }
}
```

### Dùng nhanh auto-editor

```bash
auto-editor video.mp4                 # cắt đoạn im lặng, xuất video_ALTERED.mp4
auto-editor video.mp4 -o ban-cat.mp4  # đặt tên file ra
auto-editor video.mp4 -m 0.3s         # chừa 0.3s đệm quanh đoạn có tiếng
auto-editor video.mp4 --edit motion    # cắt theo chuyển động thay vì âm thanh
auto-editor video.mp4 -ex premiere     # xuất XML cho Premiere, Resolve, Final Cut
auto-editor info video.mp4             # xem thông tin file
```
