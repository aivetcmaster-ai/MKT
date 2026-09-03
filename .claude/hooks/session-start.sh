#!/bin/bash
# SessionStart hook: cài sẵn auto-editor cho mỗi phiên Claude Code trên web.
set -euo pipefail

# Chỉ chạy trong môi trường remote (Claude Code on the web), bỏ qua máy cá nhân.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

bash "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}/scripts/setup-auto-editor.sh"
