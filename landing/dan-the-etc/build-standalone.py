#!/usr/bin/env python3
"""Gộp index.html thành một file HTML tự chứa để gửi ra ngoài.

Nhúng CSS token, phông VETC Sans và ảnh dưới dạng data URI, nhờ đó file mở
được ở bất cứ đâu mà không cần thư mục assets đi kèm. Dùng:

    python3 build-standalone.py            # tạo index.standalone.html
    python3 build-standalone.py --artifact # bản không có thẻ bao, để publish Artifact
"""
import base64, mimetypes, re, sys
from pathlib import Path

HERE = Path(__file__).parent
SRC = HERE / "index.html"

def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    if path.suffix == ".woff2":
        mime = "font/woff2"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"

def inline_css(css_path: Path) -> str:
    css = css_path.read_text(encoding="utf-8")
    # gộp @import theo chiều sâu
    def sub_import(m):
        return inline_css((css_path.parent / m.group(1)).resolve())
    css = re.sub(r'@import\s+url\(["\']([^"\']+)["\']\);', sub_import, css)
    # nhúng phông, bỏ nhánh ttf vì không có file
    def sub_url(m):
        ref = m.group(1)
        if ref.startswith("data:"):
            return m.group(0)
        target = (css_path.parent / ref).resolve()
        return f'url("{data_uri(target)}")' if target.exists() else ""
    css = re.sub(r'url\(["\']([^"\')]+)["\']\)', sub_url, css)
    css = re.sub(r',\s*format\("truetype"\)', "", css)
    return css

def main():
    artifact = "--artifact" in sys.argv
    html = SRC.read_text(encoding="utf-8")

    # 1. thay <link> bằng <style> đã gộp
    def sub_link(m):
        return "<style>\n" + inline_css((HERE / m.group(1)).resolve()) + "\n</style>"
    html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', sub_link, html)

    # 2. nhúng ảnh
    def sub_img(m):
        target = (HERE / m.group(1)).resolve()
        return f'src="{data_uri(target)}"' if target.exists() else m.group(0)
    html = re.sub(r'src="((?:\.\./|\./)[^"]+)"', sub_img, html)

    if artifact:
        # Artifact tự bọc doctype, html, head, body. Chỉ giữ phần ruột.
        head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
        body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)
        keep = "\n".join(
            b.group(0) for b in re.finditer(r"<title>.*?</title>|<style>.*?</style>", head, re.S)
        )
        out, html = HERE / "artifact.html", keep + "\n" + body
    else:
        out = HERE / "index.standalone.html"

    out.write_text(html, encoding="utf-8")
    print(f"{out.name}: {out.stat().st_size:,} bytes")

main()
