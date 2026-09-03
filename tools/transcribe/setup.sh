#!/usr/bin/env bash
# Cài faster-whisper vào môi trường ảo .venv-whisper ở gốc repo.
# Dùng: bash tools/transcribe/setup.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
VENV="$ROOT/.venv-whisper"

command -v python3 >/dev/null || { echo "Chưa có python3. Cài Python 3.9 trở lên trước."; exit 1; }

if [ ! -d "$VENV" ]; then
  echo "Tạo môi trường ảo tại $VENV"
  python3 -m venv "$VENV"
fi

"$VENV/bin/pip" install --upgrade pip
"$VENV/bin/pip" install -r "$ROOT/tools/transcribe/requirements.txt"

echo
echo "Xong. Kiểm tra nhanh:"
echo "  $VENV/bin/python tools/transcribe/transcribe.py --help"
echo
echo "Lần chạy đầu sẽ tải model từ huggingface.co (model small khoảng 500 MB),"
echo "lưu vào ~/.cache/huggingface. Các lần sau chạy offline được."
