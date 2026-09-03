#!/usr/bin/env bash
# Cai dat FunClip (modelscope/FunClip) tren macOS hoac Linux.
# Dung: bash tools/funclip/install.sh [thu-muc-cai-dat]
set -euo pipefail

FUNCLIP_REF="${FUNCLIP_REF:-v2.2.1}"
TARGET_DIR="${1:-$HOME/funclip}"
REPO_DIR="$TARGET_DIR/FunClip"
VENV_DIR="$TARGET_DIR/venv"

echo "==> Thu muc cai dat: $TARGET_DIR"
echo "==> Phien ban FunClip: $FUNCLIP_REF"

# 1. Kiem tra dieu kien can
if ! command -v python3 >/dev/null 2>&1; then
  echo "Thieu python3. Cai Python 3.10 hoac 3.11 truoc khi chay lai." >&2
  exit 1
fi

PY_VER="$(python3 -c 'import sys; print("%d.%d" % sys.version_info[:2])')"
case "$PY_VER" in
  3.10|3.11|3.12) : ;;
  *) echo "Canh bao: dang dung Python $PY_VER. FunClip duoc kiem chung tot nhat tren 3.10 - 3.12." ;;
esac

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Thieu ffmpeg. FunClip can ffmpeg de tach am thanh va cat video." >&2
  echo "  macOS:        brew install ffmpeg" >&2
  echo "  Ubuntu/Debian: sudo apt-get install -y ffmpeg" >&2
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "Thieu git." >&2
  exit 1
fi

# 2. Lay ma nguon
mkdir -p "$TARGET_DIR"
if [ -d "$REPO_DIR/.git" ]; then
  echo "==> Da co ma nguon, dang cap nhat ve $FUNCLIP_REF"
  git -C "$REPO_DIR" fetch --tags --depth 1 origin "$FUNCLIP_REF"
  git -C "$REPO_DIR" checkout -q FETCH_HEAD
else
  echo "==> Clone FunClip"
  git clone --depth 1 --branch "$FUNCLIP_REF" https://github.com/modelscope/FunClip.git "$REPO_DIR"
fi

# 3. Moi truong ao va thu vien
if [ ! -d "$VENV_DIR" ]; then
  echo "==> Tao moi truong ao tai $VENV_DIR"
  python3 -m venv "$VENV_DIR"
fi
"$VENV_DIR/bin/pip" install --upgrade pip setuptools wheel

# Khong co GPU NVIDIA thi cai torch ban CPU, nhe hon khoang 5 GB.
# Ep buoc bang bien moi truong: FUNCLIP_TORCH=cpu hoac FUNCLIP_TORCH=cuda
TORCH_FLAVOR="${FUNCLIP_TORCH:-auto}"
if [ "$TORCH_FLAVOR" = "auto" ]; then
  if command -v nvidia-smi >/dev/null 2>&1; then TORCH_FLAVOR="cuda"; else TORCH_FLAVOR="cpu"; fi
fi
if [ "$TORCH_FLAVOR" = "cpu" ]; then
  echo "==> Cai torch ban CPU (khoang 250 MB)"
  "$VENV_DIR/bin/pip" install torch torchaudio --index-url https://download.pytorch.org/whl/cpu
else
  echo "==> Cai torch ban CUDA (khoang 3 GB)"
  "$VENV_DIR/bin/pip" install torch torchaudio
fi

echo "==> Cai dat cac thu vien con lai"
"$VENV_DIR/bin/pip" install -r "$REPO_DIR/requirements.txt"

# 4. Kiem tra nhanh
"$VENV_DIR/bin/python" - <<'PY'
import funasr, gradio, moviepy, torch
print("funasr", funasr.__version__)
print("gradio", gradio.__version__)
print("torch ", torch.__version__)
PY

cat <<MSG

==> Cai dat xong.

Buoc tiep theo:
  1. Tai truoc model (can vao duoc modelscope.cn):
       $VENV_DIR/bin/python $(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/download_models.py
  2. Chay giao dien web:
       cd $REPO_DIR && $VENV_DIR/bin/python funclip/launch.py
     Mo trinh duyet tai http://localhost:7860

Luu y: model ASR mac dinh chi ho tro tieng Trung va tieng Anh, chua co tieng Viet.
Xem tools/funclip/README.md de biet chi tiet.
MSG
