"""Gan phu de tieng Viet theo nhan dien VETC vao video, va cat doan neu can.

FunClip khong nhan dang duoc tieng Viet, nhung phan cat video va gan phu de
van dung duoc. Script nay nhan mot file SRT co san (go tay, xuat tu cong cu
ASR tieng Viet khac, hoac tu FunClip voi noi dung tieng Anh) va dot phu de
truc tiep vao khung hinh theo dung mau va font thuong hieu.

Vi du:
    python tools/funclip/burn_subs.py \
        --video raw.mp4 --srt raw.srt --out clip.mp4 \
        --start 00:00:12,000 --end 00:00:30,000 --logo

Yeu cau: moviepy, pillow, numpy (da co trong requirements.txt cua FunClip).
"""

import argparse
import os
import re
import sys

# Mau thuong hieu VETC, xem reference/TOKENS.md trong bo design system
VETC_GREEN = (11, 178, 96)      # #0BB260
VETC_WHITE = (255, 255, 255)

SRT_BLOCK = re.compile(
    r"(\d+)\s*\n(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})\s*\n(.*?)(?=\n\s*\n|\Z)",
    re.S,
)


def parse_timecode(value):
    """'00:01:02,500' -> 62.5 giay."""
    match = re.fullmatch(r"(\d{2}):(\d{2}):(\d{2})[,.](\d{3})", value.strip())
    if not match:
        raise ValueError(f"Timecode khong hop le: {value}")
    hours, minutes, seconds, millis = (int(g) for g in match.groups())
    return hours * 3600 + minutes * 60 + seconds + millis / 1000.0


def parse_srt(path):
    """Doc file SRT, tra ve danh sach (start, end, text)."""
    with open(path, encoding="utf-8-sig") as handle:
        raw = handle.read()
    cues = []
    for _, start, end, text in SRT_BLOCK.findall(raw):
        text = " ".join(line.strip() for line in text.strip().splitlines() if line.strip())
        if text:
            cues.append((parse_timecode(start), parse_timecode(end), text))
    if not cues:
        raise ValueError(f"Khong doc duoc cue nao trong {path}")
    return cues


def trim_cues(cues, start, end):
    """Cat danh sach cue theo khoang thoi gian va doi goc thoi gian ve 0."""
    result = []
    for cue_start, cue_end, text in cues:
        if cue_end <= start or (end is not None and cue_start >= end):
            continue
        new_start = max(cue_start, start) - start
        new_end = (min(cue_end, end) if end is not None else cue_end) - start
        if new_end - new_start > 0.05:
            result.append((new_start, new_end, text))
    return result


def wrap_text(draw, text, font, max_width):
    """Xuong dong theo be ngang toi da, tinh bang be rong thuc te cua font."""
    words = text.split()
    lines, current = [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=font) <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def render_caption(text, frame_width, frame_height, font_path, style="green"):
    """Ve mot the phu de bo goc 12px, can trai.

    style='green': nen xanh VETC, chu trang. Dung cho canh quay thuc, nen toi.
    style='white': nen trang, chu xanh VETC. Dung khi nen da la mau xanh VETC.
    """
    if style == "white":
        box_fill, text_fill = VETC_WHITE, VETC_GREEN
    else:
        box_fill, text_fill = VETC_GREEN, VETC_WHITE
    from PIL import Image, ImageDraw, ImageFont

    font_size = max(16, int(round(frame_height * 0.045 / 4)) * 4)
    font = ImageFont.truetype(font_path, font_size)

    pad_x = int(font_size * 0.9)
    pad_y = int(font_size * 0.6)
    line_gap = int(font_size * 0.35)
    max_box = int(frame_width * 0.86)
    max_text = max_box - pad_x * 2

    probe = ImageDraw.Draw(Image.new("RGBA", (8, 8)))
    lines = wrap_text(probe, text, font, max_text)

    ascent, descent = font.getmetrics()
    line_height = ascent + descent
    text_width = max(int(probe.textlength(line, font=font)) for line in lines)
    box_width = min(max_box, text_width + pad_x * 2)
    box_height = line_height * len(lines) + line_gap * (len(lines) - 1) + pad_y * 2

    card = Image.new("RGBA", (box_width, box_height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(card)
    draw.rounded_rectangle([0, 0, box_width - 1, box_height - 1], radius=12,
                           fill=box_fill + (255,))
    y = pad_y
    for line in lines:
        draw.text((pad_x, y), line, font=font, fill=text_fill + (255,))
        y += line_height + line_gap
    return card


def find_font(explicit=None):
    """Uu tien VETC Sans Bold, khong co thi lui ve font he thong co dau tieng Viet."""
    candidates = [explicit] if explicit else []
    candidates += [
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", "VETCSans-Bold.ttf"),
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
    ]
    for path in candidates:
        if path and os.path.exists(path):
            return path
    raise FileNotFoundError(
        "Khong tim thay font. Chi dinh bang --font duong-dan-toi-file.ttf"
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--video", required=True, help="Video nguon")
    parser.add_argument("--srt", required=True, help="File phu de SRT")
    parser.add_argument("--out", required=True, help="File video xuat ra")
    parser.add_argument("--start", default=None, help="Cat tu, dinh dang 00:00:12,000")
    parser.add_argument("--end", default=None, help="Cat den, dinh dang 00:00:30,000")
    parser.add_argument("--font", default=None, help="Duong dan file font .ttf")
    parser.add_argument("--logo", default=None,
                        help="Duong dan file logo PNG co nen trong suot, "
                             "dat o goc tren ben trai")
    parser.add_argument("--logo-color", choices=["auto", "white", "green", "black"],
                        default="auto",
                        help="To lai logo theo mau, van giu nguyen hinh chu. "
                             "Dung 'white' khi dat logo len nen xanh hoac anh toi.")
    parser.add_argument("--style", choices=["green", "white"], default="green",
                        help="green: nen xanh chu trang. white: nen trang chu xanh, "
                             "dung khi khung hinh da la mau xanh VETC")
    parser.add_argument("--bottom", type=float, default=0.08,
                        help="Khoang cach tu day khung hinh, ti le chieu cao (mac dinh 0.08)")
    parser.add_argument("--fps", type=int, default=None, help="FPS xuat ra")
    args = parser.parse_args()

    try:
        import numpy as np
        from moviepy.editor import CompositeVideoClip, ImageClip, VideoFileClip
    except ImportError as exc:
        print(f"Thieu thu vien: {exc}. Chay trong venv da cai FunClip.", file=sys.stderr)
        return 1

    font_path = find_font(args.font)
    start = parse_timecode(args.start) if args.start else 0.0
    end = parse_timecode(args.end) if args.end else None

    cues = trim_cues(parse_srt(args.srt), start, end)
    if not cues:
        print("Khoang thoi gian da chon khong co phu de nao.", file=sys.stderr)
        return 1

    video = VideoFileClip(args.video)
    if start or end is not None:
        video = video.subclip(start, end if end is not None else video.duration)

    width, height = video.size
    layers = [video]

    if args.logo:
        # Thu nho bang Pillow chu khong dung .resize() cua moviepy 1.0.3,
        # ham do goi Image.ANTIALIAS da bi Pillow 10 bo di.
        from PIL import Image

        logo_img = Image.open(args.logo).convert("RGBA")
        if args.logo_color != "auto":
            fill = {"white": VETC_WHITE, "green": VETC_GREEN, "black": (0, 0, 0)}[args.logo_color]
            alpha = logo_img.getchannel("A")
            logo_img = Image.new("RGBA", logo_img.size, fill + (255,))
            logo_img.putalpha(alpha)
        logo_height = int(height * 0.07)
        logo_width = max(1, round(logo_img.width * logo_height / logo_img.height))
        logo_img = logo_img.resize((logo_width, logo_height), Image.LANCZOS)
        margin = int(height * 0.04)
        layers.append(ImageClip(np.array(logo_img))
                      .set_position((margin, margin))
                      .set_duration(video.duration))

    bottom_margin = int(height * args.bottom)
    for cue_start, cue_end, text in cues:
        if cue_start >= video.duration:
            continue
        card = render_caption(text, width, height, font_path, args.style)
        clip = (ImageClip(np.array(card))
                .set_start(cue_start)
                .set_duration(min(cue_end, video.duration) - cue_start)
                .set_position(("center", height - bottom_margin - card.height)))
        layers.append(clip)

    final = CompositeVideoClip(layers, size=(width, height))
    fps = args.fps or video.fps or 25
    final.write_videofile(args.out, fps=fps, codec="libx264", audio_codec="aac",
                          preset="medium", threads=4, logger=None)
    print(f"Da xuat: {args.out}  ({len(cues)} dong phu de, {final.duration:.1f}s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
