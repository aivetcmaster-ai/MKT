#!/usr/bin/env python3
"""Chuyển PDF sang Markdown bằng Firecrawl pdf-inspector.

Dùng:
    python3 tools/pdf-inspector/pdf2md.py tai-lieu.pdf
    python3 tools/pdf-inspector/pdf2md.py thu-muc/ -o out/
    python3 tools/pdf-inspector/pdf2md.py tai-lieu.pdf --pages 1 2 3 --stdout
    python3 tools/pdf-inspector/pdf2md.py thu-muc/ --check
"""

import argparse
import sys
from pathlib import Path

try:
    import pdf_inspector
except ImportError:
    sys.exit(
        "Chưa cài pdf-inspector. Chạy: pip install -r tools/pdf-inspector/requirements.txt"
    )


def collect(target: Path):
    if target.is_dir():
        return sorted(target.rglob("*.pdf"))
    return [target]


def report(path: Path, result) -> str:
    flags = []
    if result.has_encoding_issues:
        flags.append("lỗi font")
    if result.pages_needing_ocr:
        flags.append(f"cần OCR trang {result.pages_needing_ocr}")
    if result.is_complex_layout:
        flags.append("layout phức tạp")
    suffix = f" | {', '.join(flags)}" if flags else ""
    return (
        f"{path.name}: {result.pdf_type} (tin cậy {result.confidence:.2f}), "
        f"{result.page_count} trang, {result.processing_time_ms}ms{suffix}"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="PDF sang Markdown (pdf-inspector)")
    parser.add_argument("target", type=Path, help="File PDF hoặc thư mục chứa PDF")
    parser.add_argument(
        "-o", "--out", type=Path, help="Thư mục ghi file .md (mặc định: cạnh file PDF)"
    )
    parser.add_argument(
        "--pages", type=int, nargs="+", help="Chỉ xử lý các trang này (đánh số từ 1)"
    )
    parser.add_argument("--stdout", action="store_true", help="In Markdown ra màn hình")
    parser.add_argument(
        "--check",
        action="store_true",
        help="Chỉ phân loại PDF, không trích xuất nội dung",
    )
    args = parser.parse_args()

    if not args.target.exists():
        sys.exit(f"Không tìm thấy: {args.target}")

    files = collect(args.target)
    if not files:
        sys.exit(f"Không có file PDF nào trong {args.target}")

    failed = 0
    for pdf in files:
        try:
            if args.check:
                print(report(pdf, pdf_inspector.detect_pdf(str(pdf))))
                continue

            kwargs = {"pages": args.pages} if args.pages else {}
            result = pdf_inspector.process_pdf(str(pdf), **kwargs)
            print(report(pdf, result), file=sys.stderr)

            markdown = result.markdown or ""
            if not markdown.strip():
                print(f"  (không trích được text, có thể là bản scan)", file=sys.stderr)

            if args.stdout:
                print(markdown)
            else:
                out_dir = args.out or pdf.parent
                out_dir.mkdir(parents=True, exist_ok=True)
                out_file = out_dir / f"{pdf.stem}.md"
                out_file.write_text(markdown, encoding="utf-8")
                print(f"  -> {out_file}", file=sys.stderr)
        except Exception as exc:  # noqa: BLE001
            failed += 1
            print(f"{pdf.name}: lỗi - {exc}", file=sys.stderr)

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
