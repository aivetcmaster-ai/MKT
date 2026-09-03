#!/usr/bin/env python3
"""Dựng draft CapCut cho video social VETC khổ dọc 1080x1920.

Script ghép các clip video hoặc ảnh lên main track, chèn logo VETC ở góc trên,
nạp phụ đề từ file SRT, thêm nhạc nền và một câu chốt ở cuối, rồi xuất
draft_content.json để mở bằng CapCut.

Ví dụ:

    .venv/bin/python tools/jianying/build_social_draft.py \\
        --out drafts/vetc-parking-15s \\
        --clip footage/tram-thu-phi.mp4 footage/app-parking.png \\
        --srt scripts/parking.srt \\
        --music audio/nhac-nen.mp3

Chi tiết cách đưa draft vào CapCut xem tools/jianying/README.md.
"""

from __future__ import annotations

import argparse
import os
import sys
from typing import List, Optional

import pyJianYingDraft as draft
from pyJianYingDraft import (
    ClipSettings,
    IntroType,
    TextIntro,
    TextOutro,
    TextStyle,
    TrackSpec,
    TrackType,
    TransitionType,
    VideoMaterial,
    VideoSegment,
    tim,
    trange,
)

# --- Khung và nhận diện thương hiệu -------------------------------------------------
# Nguồn: VETC Brand Guideline (11/2025). Xanh VETC #0BB260 là màu chính duy nhất.

CANVAS_W = 1080
CANVAS_H = 1920
FPS = 30

VETC_GREEN_HEX = "#0BB260"
VETC_GREEN_RGB = (0x0B / 255, 0xB2 / 255, 0x60 / 255)
WHITE_RGB = (1.0, 1.0, 1.0)

MARGIN_PX = 64          # lề an toàn, guideline yêu cầu tối thiểu 3% cạnh dài (58px)
LOGO_HEIGHT_PX = 72     # khoảng trống quanh logo bằng nửa chiều cao logo, lề 64px đã đủ
SUBTITLE_Y = -0.60      # đơn vị nửa chiều cao canvas, âm là xuống dưới; tránh vùng UI của app
CTA_Y = -0.10

TRANSITION_DURATION = "0.4s"   # guideline giới hạn chuyển động tối đa 400ms
LOGO_FADE_IN = "0.4s"
DEFAULT_CTA = "Sống hiện đại - Lái văn minh"
DEFAULT_LOGO = "posters/vetc-parking/assets/logo/vetc-wordmark-white.png"

TRACK_MAIN = "main"
TRACK_LOGO = "logo"
TRACK_SUBTITLE = "subtitle"
TRACK_CTA = "cta"
TRACK_MUSIC = "music"


def contain_scale(material_w: int, material_h: int) -> float:
    """Hệ số CapCut dùng để đưa material vừa khít vào trong canvas (chế độ contain).

    CapCut mặc định thu material vào vừa khung, nên scale 1.0 tương ứng kích thước này.
    """
    return min(CANVAS_W / material_w, CANVAS_H / material_h)


def cover_scale(material_w: int, material_h: int) -> float:
    """Hệ số scale bổ sung để material phủ kín canvas, không để viền đen."""
    fit = contain_scale(material_w, material_h)
    return max(CANVAS_W / (material_w * fit), CANVAS_H / (material_h * fit))


def logo_clip_settings(material: VideoMaterial, position: str) -> ClipSettings:
    """Đặt logo ở góc trên trái hoặc trên phải, đúng chiều cao và lề đã cấu hình."""
    fit = contain_scale(material.width, material.height)
    scale = LOGO_HEIGHT_PX / (material.height * fit)
    shown_w = material.width * fit * scale
    shown_h = material.height * fit * scale

    center_x = MARGIN_PX + shown_w / 2
    if position == "top-right":
        center_x = CANVAS_W - MARGIN_PX - shown_w / 2
    center_y = MARGIN_PX + shown_h / 2

    return ClipSettings(
        scale_x=scale,
        scale_y=scale,
        transform_x=(center_x - CANVAS_W / 2) / (CANVAS_W / 2),
        transform_y=(CANVAS_H / 2 - center_y) / (CANVAS_H / 2),
    )


def build_main_track(
    script: draft.ScriptFile,
    clips: List[str],
    image_duration: float,
    max_clip_duration: Optional[float],
    fit_mode: str,
    use_transition: bool,
) -> int:
    """Xếp clip lên main track theo thứ tự, trả về tổng thời lượng tính bằng micro giây."""
    cursor = 0
    for index, path in enumerate(clips):
        material = VideoMaterial(path)

        if material.material_type == "photo":
            duration = tim(f"{image_duration}s")
            source_timerange = None
        else:
            duration = material.duration
            if max_clip_duration is not None:
                duration = min(duration, tim(f"{max_clip_duration}s"))
            source_timerange = draft.Timerange(0, duration)

        scale = cover_scale(material.width, material.height) if fit_mode == "cover" else 1.0
        segment = VideoSegment(
            material,
            draft.Timerange(cursor, duration),
            source_timerange=source_timerange,
            volume=1.0,
            clip_settings=ClipSettings(scale_x=scale, scale_y=scale),
        )
        if use_transition and index < len(clips) - 1:
            segment.add_transition(TransitionType.叠化, duration=TRANSITION_DURATION)
        script.add_segment(segment, TRACK_MAIN)
        cursor += duration

    return cursor


def build(args: argparse.Namespace) -> str:
    script = draft.ScriptFile(CANVAS_W, CANVAS_H, FPS, True)

    # Thứ tự append quyết định thứ tự chồng lớp: track thêm sau nằm trên.
    script.append_track(TrackSpec(TrackType.video, TRACK_MAIN))
    if args.logo:
        script.append_track(TrackSpec(TrackType.video, TRACK_LOGO))
    if args.srt:
        script.append_track(TrackSpec(TrackType.text, TRACK_SUBTITLE))
    if args.cta:
        script.append_track(TrackSpec(TrackType.text, TRACK_CTA))
    if args.music:
        script.append_track(TrackSpec(TrackType.audio, TRACK_MUSIC))

    total = build_main_track(
        script,
        args.clip,
        args.image_duration,
        args.max_clip_duration,
        args.fit,
        not args.no_transition,
    )
    if total == 0:
        raise SystemExit("Không có clip nào, không dựng được draft.")

    if args.logo:
        logo_material = VideoMaterial(args.logo)
        logo_segment = VideoSegment(
            logo_material,
            draft.Timerange(0, total),
            clip_settings=logo_clip_settings(logo_material, args.logo_position),
        )
        logo_segment.add_animation(IntroType.渐显, duration=LOGO_FADE_IN)
        script.add_segment(logo_segment, TRACK_LOGO)

    if args.srt:
        script.import_srt(
            args.srt,
            TRACK_SUBTITLE,
            text_style=TextStyle(
                size=7.0,
                bold=True,
                color=WHITE_RGB,
                align=1,
                auto_wrapping=True,
                max_line_width=0.78,
            ),
            clip_settings=ClipSettings(transform_y=SUBTITLE_Y),
        )

    if args.cta:
        cta_duration = min(tim(f"{args.cta_duration}s"), total)
        cta_segment = draft.TextSegment(
            args.cta,
            draft.Timerange(total - cta_duration, cta_duration),
            style=TextStyle(size=11.0, bold=True, color=WHITE_RGB, align=1),
            background=draft.TextBackground(
                color=VETC_GREEN_HEX, style=1, round_radius=0.12, height=0.28, width=0.28
            ),
            clip_settings=ClipSettings(transform_y=CTA_Y),
        )
        cta_segment.add_animation(TextIntro.渐显, duration="0.4s")
        cta_segment.add_animation(TextOutro.渐隐, duration="0.4s")
        script.add_segment(cta_segment, TRACK_CTA)

    if args.music:
        music_material = draft.AudioMaterial(args.music)
        music_duration = min(music_material.duration, total)
        if music_material.duration < total:
            print(
                "Cảnh báo: nhạc nền ngắn hơn video, phần cuối sẽ không có nhạc.",
                file=sys.stderr,
            )
        music_segment = draft.AudioSegment(
            music_material,
            draft.Timerange(0, music_duration),
            source_timerange=draft.Timerange(0, music_duration),
            volume=args.music_volume,
        )
        music_segment.add_fade("0s", "1s")
        script.add_segment(music_segment, TRACK_MUSIC)

    os.makedirs(args.out, exist_ok=True)
    out_path = os.path.join(args.out, "draft_content.json")
    script.dump(out_path)
    print(f"Đã ghi {out_path} - tổng thời lượng {total / 1e6:.2f}s")
    return out_path


def parse_args(argv: Optional[List[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Dựng draft CapCut 1080x1920 cho video social VETC.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument("--out", required=True, help="Thư mục xuất draft_content.json")
    parser.add_argument(
        "--clip", required=True, nargs="+", help="Danh sách video hoặc ảnh theo đúng thứ tự xuất hiện"
    )
    parser.add_argument("--srt", help="File phụ đề .srt")
    parser.add_argument("--music", help="File nhạc nền")
    parser.add_argument("--music-volume", type=float, default=0.18, help="Âm lượng nhạc nền, 0 đến 1")
    parser.add_argument("--image-duration", type=float, default=3.0, help="Số giây cho mỗi ảnh tĩnh")
    parser.add_argument(
        "--max-clip-duration", type=float, default=None, help="Cắt mỗi clip video còn tối đa bao nhiêu giây"
    )
    parser.add_argument(
        "--fit",
        choices=["cover", "contain"],
        default="cover",
        help="cover phủ kín khung dọc, contain giữ nguyên tỉ lệ và chấp nhận viền",
    )
    parser.add_argument("--no-transition", action="store_true", help="Không chèn chuyển cảnh giữa các clip")
    parser.add_argument("--logo", default=DEFAULT_LOGO, help="Đường dẫn logo PNG nền trong suốt")
    parser.add_argument("--no-logo", dest="logo", action="store_const", const=None, help="Bỏ logo")
    parser.add_argument(
        "--logo-position", choices=["top-left", "top-right"], default="top-left", help="Vị trí logo"
    )
    parser.add_argument("--cta", default=DEFAULT_CTA, help="Câu chốt hiện ở cuối video")
    parser.add_argument("--no-cta", dest="cta", action="store_const", const=None, help="Bỏ câu chốt")
    parser.add_argument("--cta-duration", type=float, default=2.5, help="Số giây hiện câu chốt")
    return parser.parse_args(argv)


if __name__ == "__main__":
    build(parse_args())
