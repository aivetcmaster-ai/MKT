#!/bin/bash
# Cài auto-editor (WyattBlue/auto-editor) để cắt đoạn im lặng trong video.
#
# Chạy tay:        bash scripts/setup-auto-editor.sh
# Chạy tự động:    .claude/hooks/session-start.sh gọi lại file này.
#
# Đổi AUTO_EDITOR_VERSION khi muốn nâng phiên bản.
set -euo pipefail

AUTO_EDITOR_VERSION="${AUTO_EDITOR_VERSION:-29.3.1}"

installed=""
if command -v auto-editor > /dev/null 2>&1; then
  installed="$(auto-editor --version 2> /dev/null | tr -d '[:space:]')"
fi

if [ "$installed" = "$AUTO_EDITOR_VERSION" ]; then
  echo "auto-editor $installed đã có sẵn, bỏ qua bước cài."
  exit 0
fi

echo "Đang cài auto-editor $AUTO_EDITOR_VERSION..."
pip3 install --quiet --disable-pip-version-check "auto-editor==$AUTO_EDITOR_VERSION"

echo "Đã cài auto-editor $(auto-editor --version)"
