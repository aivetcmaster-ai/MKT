#!/usr/bin/env bash
# Cài pdf-inspector cho phiên làm việc Claude Code hoặc máy cá nhân.
set -euo pipefail

if python3 -c "import pdf_inspector" 2>/dev/null; then
  exit 0
fi

REQ="$(dirname "$0")/requirements.txt"
pip3 install --quiet --disable-pip-version-check -r "$REQ" >/dev/null 2>&1 \
  || pip3 install --quiet --break-system-packages -r "$REQ" >/dev/null 2>&1 \
  || echo "Không cài được pdf-inspector, chạy thủ công: pip install -r tools/pdf-inspector/requirements.txt" >&2
