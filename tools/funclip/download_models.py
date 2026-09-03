"""Tai truoc cac model ASR ma FunClip can, de lan chay dau tien khong phai cho.

Chay bang chinh python trong venv da cai FunClip:
    <venv>/bin/python tools/funclip/download_models.py
    <venv>/bin/python tools/funclip/download_models.py --with-sensevoice

Yeu cau: may phai vao duoc modelscope.cn. Model duoc luu vao cache mac dinh
cua ModelScope (~/.cache/modelscope), tong dung luong khoang 3 GB.
"""

import argparse
import sys

# Bo model mac dinh cua FunClip v2.2.x, xem funclip/model_selection.py
CORE_MODELS = [
    ("iic/speech_seaco_paraformer_large_asr_nat-zh-cn-16k-common-vocab8404-pytorch",
     "ASR tieng Trung (SeACo-Paraformer, co hotword)"),
    ("iic/speech_paraformer_asr-en-16k-vocab4199-pytorch",
     "ASR tieng Anh (Paraformer)"),
    ("damo/speech_fsmn_vad_zh-cn-16k-common-pytorch",
     "VAD, tach doan co tieng noi"),
    ("damo/punc_ct-transformer_zh-cn-common-vocab272727-pytorch",
     "Phuc hoi dau cau"),
    ("damo/speech_campplus_sv_zh-cn_16k-common",
     "CAM++, nhan dien nguoi noi"),
]

OPTIONAL_MODELS = [
    ("iic/SenseVoiceSmall",
     "SenseVoice, da ngon ngu (zh, yue, en, ja, ko) kem nhan cam xuc"),
]


def _can_reach_modelscope(timeout=10):
    """Kiem tra nhanh ket noi, tranh treo lau khi mang bi chan."""
    import urllib.error
    import urllib.request

    try:
        req = urllib.request.Request("https://www.modelscope.cn/api/v1/models",
                                     method="HEAD")
        urllib.request.urlopen(req, timeout=timeout)
        return True
    except urllib.error.HTTPError:
        # May chu tra ve ma loi HTTP nghia la van ket noi duoc.
        return True
    except Exception:  # noqa: BLE001
        return False


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--with-sensevoice", action="store_true",
                        help="Tai them model SenseVoiceSmall")
    parser.add_argument("--skip-check", action="store_true",
                        help="Bo qua buoc kiem tra ket noi toi modelscope.cn")
    args = parser.parse_args()

    try:
        from modelscope.hub.snapshot_download import snapshot_download
    except ImportError:
        print("Chua cai thu vien modelscope. Chay: pip install modelscope", file=sys.stderr)
        return 1

    if not args.skip_check and not _can_reach_modelscope():
        print("Khong ket noi duoc toi modelscope.cn.", file=sys.stderr)
        print("Mang cong ty hoac proxy dang chan. Tai model o may khac roi chep thu muc",
              file=sys.stderr)
        print("~/.cache/modelscope sang, hoac chay lai voi --skip-check de thu truc tiep.",
              file=sys.stderr)
        return 1

    targets = list(CORE_MODELS)
    if args.with_sensevoice:
        targets += OPTIONAL_MODELS

    failed = []
    for model_id, note in targets:
        print(f"==> {model_id}\n    {note}")
        try:
            path = snapshot_download(model_id)
            print(f"    OK: {path}")
        except Exception as exc:  # noqa: BLE001
            print(f"    LOI: {exc}", file=sys.stderr)
            failed.append(model_id)

    if failed:
        print("\nCac model sau tai that bai:", file=sys.stderr)
        for model_id in failed:
            print(f"  - {model_id}", file=sys.stderr)
        print("Kiem tra ket noi toi modelscope.cn roi chay lai.", file=sys.stderr)
        return 1

    print("\nDa tai xong toan bo model.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
