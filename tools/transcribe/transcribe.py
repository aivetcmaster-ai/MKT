#!/usr/bin/env python3
"""Bóc băng audio/video bằng SYSTRAN/faster-whisper, xuất SRT, VTT, TXT, JSON.

Ví dụ:
    python tools/transcribe/transcribe.py video.mp4
    python tools/transcribe/transcribe.py posters/ --model medium --formats srt,txt
    python tools/transcribe/transcribe.py phong-van.m4a --lang auto --outdir ban-boc
"""

import argparse
import json
import os
import sys
from pathlib import Path

DUOI_HO_TRO = {
    ".mp3", ".wav", ".m4a", ".aac", ".flac", ".ogg", ".opus", ".wma",
    ".mp4", ".mov", ".mkv", ".webm", ".avi", ".m4v",
}

TU_DIEN_MAC_DINH = Path(__file__).with_name("vetc-tu-dien.txt")


def gom_tep(duong_dan):
    """Trả về danh sách tệp audio/video từ các đường dẫn tệp hoặc thư mục."""
    ket_qua = []
    for muc in duong_dan:
        p = Path(muc)
        if p.is_dir():
            ket_qua += sorted(t for t in p.rglob("*") if t.suffix.lower() in DUOI_HO_TRO)
        elif p.is_file():
            if p.suffix.lower() in DUOI_HO_TRO:
                ket_qua.append(p)
            else:
                print(f"Bỏ qua, không phải tệp audio hoặc video: {muc}", file=sys.stderr)
        else:
            print(f"Bỏ qua, không tìm thấy: {muc}", file=sys.stderr)
    return ket_qua


def chon_thiet_bi(device, compute_type):
    """Tự chọn GPU nếu có, không thì chạy CPU với int8 cho nhẹ."""
    if device == "auto":
        try:
            from ctranslate2 import get_cuda_device_count

            device = "cuda" if get_cuda_device_count() > 0 else "cpu"
        except Exception:
            device = "cpu"
    if compute_type == "auto":
        compute_type = "float16" if device == "cuda" else "int8"
    return device, compute_type


def dinh_dang_gio(giay, dau_thap_phan=","):
    gio, con_lai = divmod(max(giay, 0), 3600)
    phut, giay_le = divmod(con_lai, 60)
    return f"{int(gio):02d}:{int(phut):02d}:{int(giay_le):02d}{dau_thap_phan}{int((giay_le % 1) * 1000):03d}"


def ngat_dong(text, gioi_han):
    """Ngắt phụ đề thành tối đa 2 dòng cho dễ đọc trên điện thoại."""
    text = text.strip()
    if gioi_han <= 0 or len(text) <= gioi_han:
        return text
    tu, dong, hien_tai = text.split(), [], ""
    for t in tu:
        if hien_tai and len(hien_tai) + 1 + len(t) > gioi_han:
            dong.append(hien_tai)
            hien_tai = t
        else:
            hien_tai = f"{hien_tai} {t}".strip()
    if hien_tai:
        dong.append(hien_tai)
    return "\n".join(dong[:2]) if len(dong) <= 2 else "\n".join([" ".join(dong[:-1]), dong[-1]])


def viet_srt(doan, tep, gioi_han):
    with open(tep, "w", encoding="utf-8") as f:
        for i, d in enumerate(doan, 1):
            f.write(f"{i}\n{dinh_dang_gio(d['start'])} --> {dinh_dang_gio(d['end'])}\n")
            f.write(ngat_dong(d["text"], gioi_han) + "\n\n")


def viet_vtt(doan, tep, gioi_han):
    with open(tep, "w", encoding="utf-8") as f:
        f.write("WEBVTT\n\n")
        for d in doan:
            f.write(f"{dinh_dang_gio(d['start'], '.')} --> {dinh_dang_gio(d['end'], '.')}\n")
            f.write(ngat_dong(d["text"], gioi_han) + "\n\n")


def viet_txt(doan, tep):
    with open(tep, "w", encoding="utf-8") as f:
        f.write("\n".join(d["text"].strip() for d in doan) + "\n")


def viet_json(doan, thong_tin, tep):
    with open(tep, "w", encoding="utf-8") as f:
        json.dump({"thong_tin": thong_tin, "doan": doan}, f, ensure_ascii=False, indent=2)


def doc_tu_dien(duong_dan):
    """Đọc danh sách thuật ngữ để mồi cho model viết đúng tên riêng VETC."""
    p = Path(duong_dan) if duong_dan else TU_DIEN_MAC_DINH
    if not p.exists():
        return None
    dong = [d.strip() for d in p.read_text(encoding="utf-8").splitlines() if d.strip() and not d.startswith("#")]
    return " ".join(dong) or None


def main():
    ap = argparse.ArgumentParser(description="Bóc băng audio/video bằng faster-whisper.")
    ap.add_argument("dau_vao", nargs="+", help="Tệp audio, video hoặc thư mục cần bóc băng.")
    ap.add_argument("--model", default="small",
                    help="tiny, base, small, medium, large-v3, distil-large-v3 hoặc đường dẫn model đã tải. Mặc định small.")
    ap.add_argument("--lang", default="vi", help="Mã ngôn ngữ, ví dụ vi, en. Dùng auto để tự nhận. Mặc định vi.")
    ap.add_argument("--formats", default="srt,txt", help="Định dạng xuất, phân tách bằng dấu phẩy: srt, vtt, txt, json.")
    ap.add_argument("--outdir", default=None, help="Thư mục lưu kết quả. Mặc định để cạnh tệp gốc.")
    ap.add_argument("--device", default="auto", choices=["auto", "cpu", "cuda"], help="Thiết bị chạy. Mặc định auto.")
    ap.add_argument("--compute-type", default="auto", help="int8, int8_float16, float16, float32. Mặc định auto.")
    ap.add_argument("--beam-size", type=int, default=5, help="Beam search. Tăng thì chính xác hơn nhưng chậm hơn.")
    ap.add_argument("--no-vad", action="store_true", help="Tắt lọc khoảng lặng VAD.")
    ap.add_argument("--tu-dien", default=None, help="Tệp thuật ngữ mồi cho model. Mặc định tools/transcribe/vetc-tu-dien.txt.")
    ap.add_argument("--khong-mo-tu-dien", action="store_true", help="Không dùng thuật ngữ mồi.")
    ap.add_argument("--max-chars", type=int, default=42, help="Số ký tự tối đa mỗi dòng phụ đề. Đặt 0 để không ngắt dòng.")
    args = ap.parse_args()

    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print("Chưa cài faster-whisper. Chạy: bash tools/transcribe/setup.sh", file=sys.stderr)
        return 1

    tep_can_boc = gom_tep(args.dau_vao)
    if not tep_can_boc:
        print("Không có tệp audio hoặc video nào để xử lý.", file=sys.stderr)
        return 1

    dinh_dang = [d.strip().lower() for d in args.formats.split(",") if d.strip()]
    khong_ho_tro = set(dinh_dang) - {"srt", "vtt", "txt", "json"}
    if khong_ho_tro:
        print(f"Định dạng không hỗ trợ: {', '.join(sorted(khong_ho_tro))}", file=sys.stderr)
        return 1

    device, compute_type = chon_thiet_bi(args.device, args.compute_type)
    moi = None if args.khong_mo_tu_dien else doc_tu_dien(args.tu_dien)

    print(f"Model {args.model} trên {device} ({compute_type}). Lần đầu sẽ tải model, xin chờ.")
    try:
        model = WhisperModel(args.model, device=device, compute_type=compute_type)
    except Exception as loi:
        print(f"Không nạp được model {args.model}: {loi}", file=sys.stderr)
        print("Kiểm tra kết nối tới huggingface.co, hoặc trỏ --model vào thư mục model đã tải sẵn.",
              file=sys.stderr)
        return 1

    for tep in tep_can_boc:
        print(f"\nĐang bóc băng: {tep}")
        try:
            doan_iter, info = model.transcribe(
                str(tep),
                language=None if args.lang == "auto" else args.lang,
                beam_size=args.beam_size,
                vad_filter=not args.no_vad,
                initial_prompt=moi,
            )
            doan = []
            for d in doan_iter:
                doan.append({"start": d.start, "end": d.end, "text": d.text.strip()})
                print(f"  [{dinh_dang_gio(d.start)}] {d.text.strip()}")
        except (IndexError, ValueError, RuntimeError) as loi:
            print(f"  Bỏ qua, không đọc được tiếng từ tệp này ({loi}).", file=sys.stderr)
            continue

        if not doan:
            print("  Không nhận được nội dung nào. Kiểm tra lại tệp có tiếng nói không.")
            continue

        thu_muc = Path(args.outdir) if args.outdir else tep.parent
        thu_muc.mkdir(parents=True, exist_ok=True)
        goc = thu_muc / tep.stem
        thong_tin = {
            "tep_nguon": str(tep),
            "ngon_ngu": info.language,
            "do_tin_cay_ngon_ngu": round(info.language_probability, 3),
            "thoi_luong_giay": round(info.duration, 2),
            "model": args.model,
        }

        if "srt" in dinh_dang:
            viet_srt(doan, f"{goc}.srt", args.max_chars)
        if "vtt" in dinh_dang:
            viet_vtt(doan, f"{goc}.vtt", args.max_chars)
        if "txt" in dinh_dang:
            viet_txt(doan, f"{goc}.txt")
        if "json" in dinh_dang:
            viet_json(doan, thong_tin, f"{goc}.json")

        print(f"  Ngôn ngữ {info.language}, thời lượng {info.duration:.1f} giây.")
        print(f"  Đã lưu: {', '.join(f'{goc.name}.{d}' for d in dinh_dang)} trong {thu_muc}")

    print("\nLưu ý: bản bóc băng là bản nháp máy. Cần người rà lại trước khi dùng cho đối ngoại.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
