#!/bin/bash
# Cài môi trường dựng ấn phẩm VETC cho phiên Claude Code trên web.
# Chạy lại nhiều lần vẫn an toàn: mỗi bước đều kiểm tra trước khi cài.
set -euo pipefail

# Chỉ chạy trên môi trường remote. Máy cá nhân do người dùng tự quản lý.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
OXIPNG_VERSION="9.1.5"
OXIPNG_SHA256="571e69fcb06a3675fe247998d845619075631b01ac2246e8a88206c723a472e2"

log() { echo "[session-start] $*"; }

if [ "$(id -u)" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
fi

APT_UPDATED=0
apt_install() {
  if [ "$APT_UPDATED" -eq 0 ]; then
    # Một vài PPA ngoài luồng có thể trả 403 qua proxy, không coi là lỗi chặn.
    $SUDO apt-get update -qq || true
    APT_UPDATED=1
  fi
  DEBIAN_FRONTEND=noninteractive $SUDO apt-get install -y -qq "$@"
}

# 1. ffmpeg: ghép khung hình thành MP4 và GIF cho motion graphic.
if command -v ffmpeg >/dev/null 2>&1; then
  log "ffmpeg đã có: $(ffmpeg -version | head -1 | cut -d' ' -f3)"
else
  log "cài ffmpeg"
  apt_install ffmpeg
fi

# 2. fonttools: kiểm tra, gộp và cắt tập ký tự font VETC Sans.
if command -v pyftsubset >/dev/null 2>&1; then
  log "fonttools đã có: $(ttx --version)"
else
  command -v pipx >/dev/null 2>&1 || { log "cài pipx"; apt_install pipx; }
  log "cài fonttools"
  pipx install fonttools
fi

# 3. oxipng: nén PNG không mất chất lượng. Không có trong kho apt của Ubuntu.
if command -v oxipng >/dev/null 2>&1; then
  log "oxipng đã có: $(oxipng --version)"
else
  log "cài oxipng $OXIPNG_VERSION"
  ox_tmp="$(mktemp -d)"
  ox_name="oxipng-${OXIPNG_VERSION}-x86_64-unknown-linux-musl"
  curl -sSLf -o "$ox_tmp/ox.tar.gz" \
    "https://github.com/oxipng/oxipng/releases/download/v${OXIPNG_VERSION}/${ox_name}.tar.gz"
  echo "${OXIPNG_SHA256}  $ox_tmp/ox.tar.gz" | sha256sum -c -
  tar xzf "$ox_tmp/ox.tar.gz" -C "$ox_tmp"
  $SUDO install -m 755 "$ox_tmp/$ox_name/oxipng" /usr/local/bin/oxipng
  rm -rf "$ox_tmp"
fi

# 4. Phụ thuộc Node của repo (sharp, playwright-core).
if [ -f "$PROJECT_DIR/package.json" ]; then
  log "npm install"
  (cd "$PROJECT_DIR" && npm install --no-audit --no-fund)
fi

# 5. Chromium dựng sẵn trong image. Số hiệu bản build đổi theo image nên dò động
#    rồi ghi ra biến môi trường cho render.mjs và render-motion.mjs dùng lại.
if [ -z "${CHROMIUM_PATH:-}" ]; then
  pw_root="${PLAYWRIGHT_BROWSERS_PATH:-/opt/pw-browsers}"
  chromium_bin="$(find "$pw_root" -maxdepth 3 -name chrome -type f 2>/dev/null | sort | head -1 || true)"
  if [ -z "$chromium_bin" ] && [ -x "$pw_root/chromium" ]; then
    chromium_bin="$pw_root/chromium"
  fi
  if [ -n "$chromium_bin" ]; then
    log "Chromium: $chromium_bin"
    if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
      echo "export CHROMIUM_PATH=\"$chromium_bin\"" >> "$CLAUDE_ENV_FILE"
    fi
  else
    log "cảnh báo: không tìm thấy Chromium trong $pw_root, cần đặt CHROMIUM_PATH thủ công"
  fi
fi

# pipx cài app vào ~/.local/bin, bảo đảm PATH của phiên thấy được.
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$CLAUDE_ENV_FILE"
fi

log "môi trường đã sẵn sàng"
