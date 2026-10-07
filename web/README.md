# Kho hiệu ứng web Codrops cho VETC

Khung dựng trang web có hiệu ứng, và kho demo tham chiếu lấy từ
[Codrops](https://github.com/codrops). Dùng khi làm landing page chiến dịch,
microsite, trang giới thiệu dịch vụ, hoặc khi cần một hiệu ứng cuộn, hover,
chuyển trang mà không muốn viết lại từ đầu.

## Bắt đầu

```bash
cd web
node tools/serve.mjs
```

Mở http://localhost:4173 để thấy danh sách demo và khung starter VETC.
Cần Node 18 trở lên. Không cần `npm install`, toàn bộ script dùng thư viện có sẵn của Node.

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `vetc-starter/` | Khung dựng trang VETC: token màu chữ, bố cục mẫu, hiệu ứng cuộn cơ bản. Bắt đầu từ đây |
| `demos/` | 20 demo Codrops chọn lọc, dùng làm tham chiếu kỹ thuật |
| `catalog.md` | Toàn bộ 345 demo của Codrops, chia nhóm, để tra bằng mắt |
| `catalog.json` | Cùng dữ liệu, để script đọc |
| `tools/` | Script tra cứu, tải demo, tải lại media, chạy server |
| `NOTICE.md` | Nguồn và giấy phép từng demo. Đọc trước khi đưa code vào sản phẩm |

## Việc thường làm

**Tra một hiệu ứng.** Tìm theo từ khoá, tên hoặc nhóm:

```bash
node tools/list-demos.mjs scroll text      # demo có cả hai từ
node tools/list-demos.mjs --tag typography # theo nhóm
node tools/list-demos.mjs --tags           # xem các nhóm có sẵn
node tools/list-demos.mjs --vendored       # chỉ demo đã có trong repo
```

**Tải một demo chưa có.** Lấy từ `github.com/codrops`, mặc định chỉ lấy code:

```bash
node tools/fetch-demo.mjs OnScrollShapeMorph
node tools/fetch-demo.mjs OnScrollShapeMorph --with-assets   # lấy cả ảnh và font
```

**Xem demo đúng bản gốc.** Repo không lưu ảnh và font của demo, nên demo mới clone về
sẽ thiếu hình. Tải lại khi cần:

```bash
node tools/restore-assets.mjs ScrollTextMotion
node tools/restore-assets.mjs --all    # khoảng 38 MB cho cả 20 demo
```

File tải về nằm trong `.gitignore` nên không vào repo.

**Dựng một trang VETC có hiệu ứng.** Đọc `vetc-starter/README.md`. Quy trình ngắn: chép
`vetc-starter/` sang thư mục mới, thay nội dung, rồi ghép logic hiệu ứng từ demo vào,
đổi mọi mã màu sang biến `--vetc-*`.

## Tại sao repo không lưu ảnh của demo

Ảnh, video và font của 20 demo cộng lại khoảng 38 MB, phần lớn là ảnh stock mà VETC
sẽ không dùng lại. Lưu vào repo thì mỗi lần clone phải tải hết, và càng thêm demo càng phình.
Giữ code thôi là 9 MB. Một lệnh `restore-assets.mjs` là có lại bản đủ.

## Trước khi đưa code vào sản phẩm VETC

1. Đọc `NOTICE.md`. 17 trong 20 demo theo giấy phép MIT, 3 demo theo điều khoản riêng của
   Codrops. Cả hai đều cho dùng trong sản phẩm thương mại, nhưng không được bán lại chính
   bản demo. Phòng pháp chế đối chiếu lại.
2. Xoá script quảng cáo và đo lường của Codrops khỏi code chép sang. `NOTICE.md` liệt kê
   đúng demo nào và dòng nào.
3. Thay toàn bộ ảnh demo bằng ảnh của VETC hoặc ảnh có giấy phép rõ ràng.
4. Đổi mã màu và phông sang token VETC. Không hard-code mã màu.
5. Chạy checklist nhận diện trong skill `vetc-design`.
6. Giữ nhánh `prefers-reduced-motion` để trang vẫn dùng được khi người xem tắt chuyển động.
7. Người có thẩm quyền ký duyệt trước khi phát hành.

## Một điểm cần chốt

Token trong `vetc-starter/css/vetc-tokens.css` lấy xanh VETC hệ RGB là `#0BB260` và
phông dự phòng cho web là Inter, khớp với `posters/vetc-parking/tokens/colors.css` đã có
trong repo và với quy chuẩn nhận diện 2026. Nếu phòng thương hiệu đang dùng mã khác
cho sản phẩm digital, cho biết để sửa lại một chỗ trong file token.
