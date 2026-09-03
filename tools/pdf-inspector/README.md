# pdf-inspector (Firecrawl)

Thư viện Rust của Firecrawl, có bindings Python, dùng để phân loại PDF và trích xuất nội dung ra Markdown mà không cần OCR. Xử lý PDF text-based trong khoảng 200ms, giữ được thứ tự đọc, bảng và tiêu đề.

Nguồn: https://github.com/firecrawl/pdf-inspector (MIT)

## Cài đặt

```bash
pip install -r tools/pdf-inspector/requirements.txt
# hoặc
bash tools/pdf-inspector/install.sh
```

Bản wheel dựng sẵn có cho CPython >= 3.8 trên Linux, macOS, Windows. Không cần Rust toolchain.

Node.js dùng gói `@firecrawl/pdf-inspector` nếu cần, tài liệu trong repo gốc.

## Dùng nhanh

```bash
# Một file, xuất ra tai-lieu.md cạnh file gốc
python3 tools/pdf-inspector/pdf2md.py tai-lieu.pdf

# Cả thư mục, gom kết quả vào out/
python3 tools/pdf-inspector/pdf2md.py hop-dong/ -o out/

# Chỉ vài trang, in thẳng ra màn hình
python3 tools/pdf-inspector/pdf2md.py tai-lieu.pdf --pages 1 2 --stdout

# Chỉ kiểm tra PDF là bản text hay bản scan, không trích nội dung
python3 tools/pdf-inspector/pdf2md.py hop-dong/ --check
```

Kết quả `--check` cho biết loại PDF (`text_based`, `scanned`, `image_based`, `mixed`), độ tin cậy, số trang và cảnh báo lỗi font hay trang cần OCR.

## Dùng trong Python

```python
import pdf_inspector

result = pdf_inspector.process_pdf("tai-lieu.pdf")
result.pdf_type        # text_based / scanned / image_based / mixed
result.confidence      # 0.0 - 1.0
result.page_count
result.markdown        # chuỗi Markdown, None nếu không trích được
result.pages_needing_ocr
result.has_encoding_issues

text = pdf_inspector.extract_text("tai-lieu.pdf")           # text thuần
pages = pdf_inspector.extract_pages_markdown("tai-lieu.pdf")  # Markdown theo từng trang
```

## Lưu ý khi dùng cho tài liệu VETC

- Bản scan (hợp đồng ký tay, công văn chụp lại) sẽ trả `markdown` rỗng và liệt kê trang cần OCR. pdf-inspector có chế độ OCR chọn lọc nhưng cần cài thêm PDFium và ONNX Runtime bên ngoài, xem `docs/ocr-runtime.md` của repo gốc.
- Nếu `has_encoding_issues` báo `True` thì font PDF lỗi, phần tiếng Việt có thể mất dấu, cần đối chiếu lại với bản gốc trước khi dùng số liệu.
- Nội dung trích ra từ hợp đồng, dữ liệu khách hàng phải ẩn danh trước khi đưa vào tài liệu dùng chung hoặc gửi ra ngoài.
