#!/usr/bin/env bash
# Cài pyJianYingDraft vào virtualenv .venv ở gốc repo.
# Dùng: bash tools/jianying/setup.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
VENV="$ROOT/.venv"

python3 -m venv "$VENV"
"$VENV/bin/pip" install --upgrade pip
"$VENV/bin/pip" install -r "$ROOT/tools/jianying/requirements.txt"

echo "Xong. Kích hoạt bằng: source $VENV/bin/activate"
"$VENV/bin/python" -c "import pyJianYingDraft; print('pyJianYingDraft OK')"
