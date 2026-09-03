#!/usr/bin/env bash
# Cài đặt OpenMontage (calesthio/OpenMontage) cho máy trạm dùng chung của VETC.
# Chạy: bash tools/openmontage/setup-openmontage.sh [thư_mục_đích]
# Mặc định cài vào ~/openmontage. Script không đụng gì tới repo MKT.

set -euo pipefail

TARGET="${1:-$HOME/openmontage}"
REPO="https://github.com/calesthio/OpenMontage.git"

say() { printf '\n==> %s\n' "$1"; }

say "Kiểm tra công cụ nền"
missing=()
command -v git   >/dev/null 2>&1 || missing+=("git")
command -v node  >/dev/null 2>&1 || missing+=("node (>= 18, khuyến nghị 22)")
command -v npm   >/dev/null 2>&1 || missing+=("npm")
command -v ffmpeg >/dev/null 2>&1 || missing+=("ffmpeg")
if command -v python3 >/dev/null 2>&1; then
  python3 -c 'import sys; raise SystemExit(0 if sys.version_info[:2] >= (3, 10) else 1)' \
    || missing+=("python3 >= 3.10 (bản hiện tại quá cũ)")
else
  missing+=("python3 >= 3.10")
fi

if [ ${#missing[@]} -gt 0 ]; then
  echo "Thiếu các thành phần sau, cài trước rồi chạy lại:"
  printf '  - %s\n' "${missing[@]}"
  echo
  echo "  macOS:  brew install git node ffmpeg python@3.11"
  echo "  Ubuntu: sudo apt update && sudo apt install -y git nodejs npm ffmpeg python3 python3-venv"
  exit 1
fi
echo "Đủ điều kiện."

say "Lấy mã nguồn về $TARGET"
if [ -d "$TARGET/.git" ]; then
  git -C "$TARGET" pull --ff-only
else
  git clone "$REPO" "$TARGET"
fi

say "Chạy make setup (tạo .venv, cài thư viện Python, cài Remotion, tạo .env)"
cd "$TARGET"
make setup

say "Kiểm tra danh sách công cụ khả dụng"
make preflight || true

cat <<TXT

Xong. Thư mục cài đặt: $TARGET

Việc còn lại:

1. Mở $TARGET/.env và điền API key cho các dịch vụ cần dùng.
   Mọi key đều tùy chọn. Không có key nào vẫn chạy được nhánh Remotion
   dựng video từ dữ liệu, chữ và đồ họa.
2. Thử bản demo không cần key:
       make demo-list
       .venv/bin/python render_demo.py world-in-numbers
   File ra nằm ở projects/demos/renders/.
3. Mở thư mục dự án bằng trợ lý lập trình (Claude Code, Cursor, Copilot,
   Windsurf, Codex) rồi mô tả video cần làm bằng tiếng Việt hoặc tiếng Anh.

Đọc thêm: README.md, AGENT_GUIDE.md, PROJECT_CONTEXT.md trong thư mục vừa cài.
TXT
