#!/usr/bin/env python3
"""Đo độ lệch âm-hình của đường render (aesthetic-rules S5 / sound-design 4.6).

Cách làm: lấy dải âm của bản render, cắt cửa sổ quanh khung đỉnh thiết kế, rồi
tương quan chéo chuẩn hoá với bao hình của file gốc. Vị trí đỉnh tương quan trừ
đi khung thiết kế chính là độ lệch còn lại. Phải có 2-3 mũi dò cho ra sai số
giống nhau thì mới coi là đo được.
"""
import subprocess, sys
import numpy as np

FPS = 30
SR = 48000
VIDEO = sys.argv[1] if len(sys.argv) > 1 else 'out/vetc-cuu-ho-24-7.mp4'

# (tên file nguồn, khung đỉnh THIẾT KẾ trong phim)
PROBES = [
    ('public/audio/sfx/bass-hit-short.mp3', 469),   # phanh gấp cuối trục thời gian
    ('public/audio/sfx/lock-quick.mp3', 787),       # con số đầu tiên khoá lại
    ('public/audio/sfx/impact-deep-whoosh.mp3', 926),  # dấu hiệu đáp xuống ở outro
]


def mono(path, extra=()):
    cmd = ['ffmpeg', '-v', 'quiet', '-i', path, *extra, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-']
    raw = subprocess.run(cmd, capture_output=True).stdout
    return np.frombuffer(raw, dtype='<i2').astype(np.float32) / 32768.0


def env(x, win=64):
    n = len(x) // win
    return np.sqrt((x[: n * win].reshape(n, win) ** 2).mean(axis=1)), win


track = mono(VIDEO)
print(f'dải âm bản render: {len(track)/SR:.2f}s')
peak_db = 20 * np.log10(max(np.abs(track).max(), 1e-9))
print(f'đỉnh của cả dải âm: {peak_db:.2f} dBFS  (sát 0.0 là có nguy cơ méo)')

for src, design_frame in PROBES:
    ref = mono(src)
    e_ref, win = env(ref)
    e_trk, _ = env(track)
    # cửa sổ +/- 0.5s quanh khung thiết kế (trừ đi độ trễ đỉnh nguồn đã bù trong code)
    centre = int(design_frame / FPS * SR / win)
    half = int(0.5 * SR / win)
    lo = max(0, centre - half - len(e_ref))
    hi = min(len(e_trk), centre + half)
    seg = e_trk[lo:hi]
    if len(seg) < len(e_ref) + 4:
        print(f'{src}: cửa sổ quá ngắn, bỏ qua')
        continue
    a = (e_ref - e_ref.mean()) / (e_ref.std() + 1e-9)
    b = (seg - seg.mean()) / (seg.std() + 1e-9)
    corr = np.correlate(b, a, mode='valid')
    best = int(corr.argmax())
    start_s = (lo + best) * win / SR
    # đỉnh của file gốc nằm ở đâu tính từ đầu file
    ref_peak_s = int(e_ref.argmax()) * win / SR
    actual_peak_frame = (start_s + ref_peak_s) * FPS
    print(f'{src.split("/")[-1]:26s} thiết kế f{design_frame:4d} | thực tế f{actual_peak_frame:7.2f} '
          f'| lệch {actual_peak_frame - design_frame:+.2f}f')
