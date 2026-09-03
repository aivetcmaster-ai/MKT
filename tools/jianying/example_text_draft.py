"""Ví dụ tối giản: sinh file draft_content.json cho CapCut/Jianying bằng pyJianYingDraft 0.3.0.

Chạy:  .venv/bin/python tools/jianying/example_text_draft.py out/
Kết quả: out/draft_content.json, mở được bằng cách bỏ vào một thư mục draft của CapCut.
"""

import os
import sys

import pyJianYingDraft as draft
from pyJianYingDraft import TextIntro, TrackSpec, TrackType, trange

VETC_GREEN = (45 / 255, 190 / 255, 96 / 255)  # #2DBE60


def build(out_dir: str) -> str:
    script = draft.ScriptFile(1080, 1920, 30, True)  # width, height, fps, hút dính main track
    script.append_track(TrackSpec(TrackType.text))

    segment = draft.TextSegment(
        "Sống hiện đại - Lái văn minh",
        trange("0s", "3s"),
        style=draft.TextStyle(size=10.0, color=VETC_GREEN),
    )
    segment.add_animation(TextIntro.打字机IV)
    script.add_segment(segment)

    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, "draft_content.json")
    script.dump(path)
    return path


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "out"
    print("Đã ghi:", build(target))
