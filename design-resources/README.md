# Tài nguyên thiết kế dùng được cho VETC

Bản lọc từ danh sách cộng đồng [design-resources-for-developers](https://github.com/bradtraversy/design-resources-for-developers)
(Brad Traversy, giấy phép MIT). Bản gốc có hơn 1.600 dòng và khoảng 34 nhóm, phần lớn
không dùng được cho VETC vì lệch nhận diện, thiếu dấu tiếng Việt, hoặc đòi tải dữ liệu
lên máy chủ lạ.

Tài liệu này giữ lại các nguồn thực sự dùng được, xếp theo đầu việc của các phòng, kèm
điều kiện giấy phép và mức phù hợp với [bộ nhận diện VETC](../posters/vetc-parking/tokens).

Rà ngày 07/10/2026, đối chiếu bản gốc tại commit `3928e01`.

## Mục lục

- [Bốn bộ lọc trước khi dùng bất kỳ nguồn nào](#bốn-bộ-lọc-trước-khi-dùng-bất-kỳ-nguồn-nào)
- [Cách đọc cột mức phù hợp](#cách-đọc-cột-mức-phù-hợp)
- [1. Phông chữ và kiểm tra dấu tiếng Việt](#1-phông-chữ-và-kiểm-tra-dấu-tiếng-việt)
- [2. Màu và tương phản](#2-màu-và-tương-phản)
- [3. Icon](#3-icon)
- [4. Ảnh và video](#4-ảnh-và-video)
- [5. Âm thanh cho video](#5-âm-thanh-cho-video)
- [6. Vector, nền và hoa văn](#6-vector-nền-và-hoa-văn)
- [7. Mockup và trình bày sản phẩm](#7-mockup-và-trình-bày-sản-phẩm)
- [8. Nén, đổi định dạng và xóa dữ liệu ẩn](#8-nén-đổi-định-dạng-và-xóa-dữ-liệu-ẩn)
- [9. Công cụ dựng thiết kế](#9-công-cụ-dựng-thiết-kế)
- [10. Biểu đồ cho báo cáo và dashboard](#10-biểu-đồ-cho-báo-cáo-và-dashboard)
- [11. Thư viện web và chuyển động cho landing page](#11-thư-viện-web-và-chuyển-động-cho-landing-page)
- [12. Kiểm tra chất lượng và khả năng tiếp cận](#12-kiểm-tra-chất-lượng-và-khả-năng-tiếp-cận)
- [13. Hệ thống thiết kế để tham khảo cách làm](#13-hệ-thống-thiết-kế-để-tham-khảo-cách-làm)
- [14. Ấn phẩm in và khổ giấy](#14-ấn-phẩm-in-và-khổ-giấy)
- [15. Công cụ AI tạo hình](#15-công-cụ-ai-tạo-hình)
- [16. Danh sách không dùng](#16-danh-sách-không-dùng)
- [Trước khi bổ sung một nguồn mới](#trước-khi-bổ-sung-một-nguồn-mới)

## Bốn bộ lọc trước khi dùng bất kỳ nguồn nào

1. **Giấy phép cho phép dùng thương mại.** VETC là doanh nghiệp, mọi ấn phẩm phát hành
   đều là mục đích thương mại. Nguồn chỉ cho dùng cá nhân thì không dùng, kể cả cho slide
   nội bộ, vì slide hay bị tái sử dụng ra ngoài. Lưu lại bằng chứng giấy phép (ảnh trang
   điều khoản, mã giấy phép, ngày tải) cùng file gốc.
2. **Đủ dấu tiếng Việt.** Phông và mẫu nước ngoài rất hay thiếu `ễ ỹ ặ ờ ự ẩ ỡ`. Phải thử
   đúng chuỗi ký tự này trước khi chọn, không tin vào ảnh quảng cáo của nhà cung cấp.
3. **Không phá nhận diện VETC.** Màu, phông, logo, hoa văn đã chốt trong Brand Guideline.
   Công cụ trong tài liệu này dùng để **kiểm tra và thực thi** bộ nhận diện, không dùng để
   phát minh ra cái mới.
4. **Không đưa dữ liệu nội bộ lên máy chủ lạ.** Ảnh chụp màn hình ứng dụng, báo cáo, hợp
   đồng, dữ liệu khách hàng chỉ xử lý bằng công cụ chạy hoàn toàn trong trình duyệt
   (client-side). Cột ghi chú đánh dấu rõ công cụ nào có tải file lên máy chủ.

Điều khoản giấy phép của các trang này thay đổi theo thời gian. Cột giấy phép ghi theo
công bố của nhà cung cấp tại thời điểm rà. Phải mở lại trang điều khoản trước khi dùng cho
ấn phẩm phát hành hoặc hồ sơ gửi đối tác.

## Cách đọc cột mức phù hợp

| Ký hiệu | Nghĩa |
|---|---|
| Dùng chính | Dùng được ngay cho công việc hằng ngày, không cần xin ý kiến thêm |
| Có điều kiện | Dùng được nhưng phải thỏa điều kiện ghi trong cột ghi chú |
| Chỉ tham khảo | Chỉ để học và lấy ý tưởng, không đưa sản phẩm của nó vào ấn phẩm VETC |
| Không dùng | Có trong bản gốc nhưng VETC không dùng, lý do ghi ở mục 16 |

## 1. Phông chữ và kiểm tra dấu tiếng Việt

Phông chính của VETC là **VETC Sans** (file tự host, xem `posters/vetc-parking/fonts`).
Khi không có VETC Sans: **Arial** trong Microsoft Office và bản in, **Inter** trong Google
Docs, Google Slides và web. Các nguồn dưới đây dùng để lấy phông thay thế, kiểm tra phông,
và tự host hợp quy.

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [Google Fonts](https://fonts.google.com/) | Lấy Inter, Be Vietnam Pro và các phông có dấu tiếng Việt đầy đủ. Lọc theo bộ ký tự Vietnamese trong phần Language | Mã nguồn mở, phần lớn theo SIL Open Font License, dùng thương mại được | Dùng chính |
| [Fontsource](https://fontsource.org/) | Cài phông mã nguồn mở qua npm cho dự án web, kèm bộ subset Vietnamese | Theo giấy phép của từng phông | Dùng chính |
| [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com/fonts) | Tải sẵn woff2 và sinh đoạn `@font-face` để tự host, không gọi ra máy chủ Google | Theo giấy phép của từng phông | Dùng chính |
| [Bunny Fonts](https://fonts.bunny.net/) | Thay thế Google Fonts CDN khi cần tránh gọi ra máy chủ bên thứ ba | Theo giấy phép của từng phông | Có điều kiện: xác nhận với phòng kỹ thuật trước khi đưa CDN mới vào sản phẩm |
| [FontDrop](https://fontdrop.info) | Mở file phông để xem bộ ký tự thật, kiểm tra đủ dấu tiếng Việt chưa | Công cụ miễn phí | Dùng chính |
| [Tiff](https://winniethemu.github.io/tiff/) | So trực quan hai phông, dùng khi cần chọn phông thay thế gần VETC Sans nhất | Công cụ miễn phí | Dùng chính |
| [Font Squirrel](https://www.fontsquirrel.com/) | Tìm phông miễn phí có sàng lọc giấy phép thương mại | Khác nhau theo phông, trang có ghi rõ | Có điều kiện: đọc giấy phép từng phông, lưu lại bản ghi |
| [Fontshare](https://www.fontshare.com/) | Phông chất lượng cao miễn phí của Indian Type Foundry | Miễn phí cho cả dùng thương mại theo công bố của ITF | Có điều kiện: phần lớn thiếu dấu tiếng Việt, phải thử trước |
| [Open Foundry](https://open-foundry.com) | Phông mã nguồn mở được tuyển chọn | Mã nguồn mở | Chỉ tham khảo: chủ yếu phông thí nghiệm, không phù hợp văn bản chính thống |
| [Fontjoy](https://fontjoy.com/) | Thử cặp phông tiêu đề và thân bài | Công cụ miễn phí | Chỉ tham khảo: VETC đã chốt một họ phông, không ghép cặp mới cho ấn phẩm thương hiệu |
| [Modern fluid typography editor](https://modern-fluid-typography.vercel.app/) | Sinh công thức `clamp()` cho cỡ chữ co giãn trên landing page | Công cụ miễn phí | Dùng chính |

Ghi chú cho nhóm này: không dùng phông hiển thị, phông viết tay, phông hiệu ứng cho bất kỳ
ấn phẩm thương hiệu nào. Tiêu đề tiếng Việt chỉ viết hoa đầu câu và tên riêng.

## 2. Màu và tương phản

Bảng màu VETC đã chốt. Lấy mã từ `posters/vetc-parking/tokens/colors.css`, không lấy từ
công cụ sinh màu. Nhóm này chỉ để kiểm tra tương phản, sinh thang sắc độ từ màu đã có, và
chuyển đổi hệ màu.

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [whocanuse](https://whocanuse.com) | Kiểm tra một cặp màu chữ và nền có đọc được với người suy giảm thị lực và các dạng mù màu | Công cụ miễn phí | Dùng chính |
| [Colorable](https://colorable.jxnblk.com/) | Kiểm tra nhanh tỉ số tương phản của cặp màu | Mã nguồn mở | Dùng chính |
| [ColorTools](https://colorpicker.cx/) | Kiểm tra tương phản theo cả WCAG và APCA, kèm bộ chuyển đổi mã màu | Công cụ miễn phí, chạy trong trình duyệt | Dùng chính |
| [Shademix](https://shademix.com) | Đối chiếu màu sang hệ Pantone và NCS, cảnh báo màu ra ngoài vùng in CMYK | Miễn phí, không cần đăng ký | Dùng chính: hữu ích khi làm việc với nhà in về Pantone 6164C |
| [Color Hex](https://www.color-hex.com) | Tra một mã màu ra RGB, HSL, HSV và CMYK | Công cụ miễn phí | Có điều kiện: giá trị CMYK quy đổi tự động chỉ để tham khảo, mã in chính thức là `#00B05D`, CMYK 82 0 88 0, Pantone 6164C |
| [0to255](https://www.0to255.com/) | Sinh nhanh sắc độ sáng hơn và tối hơn của xanh VETC cho trạng thái hover, viền, nền nhạt | Công cụ miễn phí | Dùng chính |
| [Color Shades Generator](https://mdigi.tools/color-shades/) | Sinh thang sắc độ đầy đủ từ một màu gốc | Công cụ miễn phí | Dùng chính |
| [Palettte App](https://palettte.app) | Tinh chỉnh thang màu cho mượt, dùng khi dựng bảng màu cho dashboard | Công cụ miễn phí | Dùng chính |
| [Huetone](https://github.com/ardov/huetone) | Dựng thang màu có kiểm soát độ sáng cảm nhận, giữ tương phản đồng đều | Mã nguồn mở | Dùng chính |
| [InclusiveColors](https://www.inclusivecolors.com/) | Dựng bảng màu kiểu Tailwind có kiểm tra tương phản, xuất ra CSS và Figma | Công cụ miễn phí | Có điều kiện: chỉ để mở rộng thang xanh bổ trợ, không đổi màu chủ đạo |
| [Site Palette](https://chrome.google.com/webstore/detail/site-palette/pekhihjiehdafocefoimckjpbkegknoh) | Trích bảng màu của một trang web, dùng khi kiểm tra đối tác dùng màu gì | Tiện ích miễn phí | Dùng chính |
| [Encycolorpedia](https://encycolorpedia.com/) | Tra thông tin một mã màu và các mã lân cận | Công cụ miễn phí | Chỉ tham khảo |

Tránh trong nhóm này: mọi trình sinh gradient, mesh gradient, glassmorphism và neumorphism
trong bản gốc. Nhận diện VETC không dùng gradient làm nền chính, không đổ bóng mềm, không
hiệu ứng kính. Riêng smartlines có quy tắc gradient riêng trong guideline, dựng theo đó chứ
không dùng công cụ sinh gradient ngoài.

## 3. Icon

Chọn **một** bộ icon cho cả dự án và dùng xuyên suốt. Trộn hai bộ là lỗi dễ thấy nhất trên
slide và landing page. Ưu tiên bộ nét mảnh, đầu nét vuông hoặc tròn đều, độ dày nét thống
nhất, vì phù hợp với tinh thần sạch và thoáng của nhận diện.

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [Phosphor Icons](https://phosphoricons.com) | Bộ icon sáu độ dày nét, bao phủ rộng, phù hợp cả giao diện và tài liệu | MIT | Dùng chính |
| [Lucide](https://lucide.netlify.app/) | Bộ icon nét mảnh đồng nhất, bản tiếp nối Feather, có sẵn cho React và Vue | ISC | Dùng chính |
| [Tabler Icons](https://tabler-icons.io/) | Hơn 3.500 icon nét mảnh, nhiều icon nghiệp vụ như hóa đơn, thẻ, xe | MIT | Dùng chính |
| [Feather Icons](https://feathericons.com/) | Bộ icon tối giản, ít chi tiết, rất phù hợp ấn phẩm in | MIT | Dùng chính |
| [Remix Icon](https://remixicon.com/) | Bộ icon có cả dạng nét và dạng khối, đủ cặp cho trạng thái chọn và chưa chọn | Apache 2.0 | Dùng chính |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | Icon đi kèm Bootstrap, dùng khi landing page đã chạy Bootstrap | MIT | Dùng chính |
| [Material Design Icons](https://materialdesignicons.com/) | Bộ icon Material, hợp khi làm giao diện Android | Apache 2.0 | Dùng chính |
| [Iconoir](https://iconoir.com/) | Hơn 900 icon nét mảnh | MIT | Dùng chính |
| [Heroicons](https://heroicons.dev/) | Icon của nhóm Tailwind, hai dạng nét và khối | MIT | Dùng chính |
| [Icones](https://icones.js.org/) | Công cụ tìm icon xuyên nhiều bộ, xuất SVG hoặc component | Mã nguồn mở, hiển thị giấy phép của từng bộ | Dùng chính: dùng để tra, rồi tải từ bộ gốc |
| [Iconify](https://iconify.design/) | Nền tảng gộp hơn 100 bộ icon, dùng khi cần tra cứu nhanh | Theo giấy phép từng bộ | Dùng chính |
| [SVG Repo](https://www.svgrepo.com/) | Kho SVG lớn khi không tìm được icon chuyên biệt ở các bộ trên | Khác nhau theo từng file, trang có ghi | Có điều kiện: kiểm tra giấy phép từng file, lưu bản ghi |
| [Flat Icon](https://www.flaticon.com/) | Kho icon và minh họa rất lớn | Bản miễn phí yêu cầu ghi công, bản trả phí thì không | Có điều kiện: ấn phẩm phát hành nên dùng tài khoản trả phí để khỏi phải ghi công trên thiết kế |
| [The Noun Project](https://thenounproject.com/) | Icon khái niệm khó tìm | Bản miễn phí yêu cầu ghi công | Có điều kiện: như trên |
| [SVGOMG](https://jakearchibald.github.io/svgomg/) | Làm gọn file SVG trước khi đưa vào web hoặc app | Mã nguồn mở, chạy trong trình duyệt | Dùng chính |
| [appicon](https://appicon.co/) | Sinh đủ cỡ icon ứng dụng cho iOS và Android từ một file gốc | Công cụ miễn phí | Có điều kiện: icon ứng dụng VETC do phòng sản phẩm quản lý, không tự sinh bản mới |

Nhớ kiểm lại file `LICENSE` trong bản tải về, vì bộ icon có thể đổi giấy phép giữa các
phiên bản.

## 4. Ảnh và video

Hình ảnh của VETC phải là bối cảnh thật: xe thật, trạm thật, bác tài thật. Ảnh stock nước
ngoài gần như luôn sai chi tiết, từ biển số, mẫu xe, kiểu cabin thu phí cho tới trang phục.
Thứ tự ưu tiên: thư viện ảnh nội bộ đã duyệt, rồi thuê chụp, rồi mới tới stock cho phần nền
và chi tiết phụ.

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [Pexels](https://www.pexels.com/) | Ảnh nền, chất liệu, chi tiết trừu tượng, ảnh đường và xe chung chung | Giấy phép riêng của Pexels, miễn phí cả thương mại, không bắt ghi công | Có điều kiện: không dùng cho ảnh mô tả hạ tầng hay nhân sự VETC |
| [Unsplash](https://unsplash.com/) | Như trên, thiên về ảnh có chiều sâu và ánh sáng tốt | Giấy phép riêng của Unsplash, miễn phí cả thương mại | Có điều kiện: như trên |
| [Pixabay](https://pixabay.com/) | Ảnh và video miễn phí, kho rộng | Content License riêng, có một số hạn chế cần đọc | Có điều kiện: đọc phần hạn chế trước khi dùng cho quảng cáo trả phí |
| [Kaboom Pics](https://kaboompics.com/) | Ảnh sản phẩm trên mặt phẳng, hợp làm nền cho ảnh thẻ và ấn phẩm nhỏ | Giấy phép riêng, cho dùng thương mại | Có điều kiện: đọc điều khoản trước khi dùng |
| [Pexels Videos](https://www.pexels.com/videos) | Video nền ngắn cho landing page và màn chờ | Như Pexels | Có điều kiện: video phải cắt dưới 10 giây và không át nội dung chính |
| [Coverr.co](https://coverr.co/) | Video nền chuyên cho web | Giấy phép riêng, miễn phí | Có điều kiện: như trên |
| [Mix Kit](https://mixkit.co/) | Video và nhạc nền | Giấy phép Mixkit, miễn phí có điều kiện | Có điều kiện: đọc điều khoản, một số nội dung không được dùng trong quảng cáo trả phí |
| [Lorem Picsum](https://picsum.photos/) | Ảnh giữ chỗ khi dựng bản nháp giao diện | Công cụ miễn phí | Dùng chính: chỉ trong bản nháp, phải thay hết trước khi duyệt |
| [Placeholder](https://placeholder.com/) | Khối ảnh giữ chỗ theo đúng kích thước cần kiểm tra | Công cụ miễn phí | Dùng chính: chỉ trong bản nháp |

Ba điều tuyệt đối với nhóm này:

- Không dùng ảnh thấy rõ **biển số xe thật**, mặt khách hàng chưa có văn bản đồng ý, hay
  màn hình có số thẻ và số dư. Biển số trong ảnh minh họa phải là biển giả đã ẩn danh.
- Không dùng ảnh người tạo bằng AI để đóng vai bác tài hay nhân viên VETC trong ấn phẩm
  đối ngoại.
- Ảnh dùng cho banner trong ứng dụng không được dùng nền tối, vì phá độ chuyển với nền app.

## 5. Âm thanh cho video

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [YouTube Studio Audio Library](https://www.youtube.com/audiolibrary) | Nhạc nền và hiệu ứng đã xử lý bản quyền cho video YouTube | Miễn phí, một số bản yêu cầu ghi công, đọc ghi chú từng bản | Dùng chính |
| [Pixabay Music](https://pixabay.com/music/) | Nhạc nền không lời cho video ngắn và social | Content License của Pixabay | Có điều kiện: đọc phần hạn chế |
| [Freesound](https://freesound.org/) | Hiệu ứng rời như tiếng barie, tiếng bíp, tiếng xe | Creative Commons, khác nhau theo từng file | Có điều kiện: kiểm tra giấy phép từng file, một số bản bắt ghi công |
| [Musopen](https://musopen.org/music/) | Nhạc cổ điển hết bảo hộ, dùng cho video trang trọng | Phần lớn thuộc phạm vi công cộng | Dùng chính |
| [Bensound](https://www.bensound.com/) | Nhạc nền chất lượng tốt | Bản miễn phí bắt ghi công, bản trả phí thì không | Có điều kiện: video đối ngoại nên mua giấy phép để khỏi phải ghi công |

Hiệu ứng âm thanh cho giao diện ứng dụng (tiếng xác nhận thanh toán, tiếng qua trạm) không
chọn từ kho miễn phí mà phải theo bộ âm thanh của sản phẩm, do phòng sản phẩm quyết.

## 6. Vector, nền và hoa văn

Nhận diện VETC chỉ có **một** họa tiết chính thức là smartlines. Mọi hoa văn, blob, lưới
tam giác, texture lạ trong bản gốc đều không dùng cho ấn phẩm thương hiệu. Nhóm này vì vậy
rất ngắn.

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [Custom Shape Dividers](https://www.shapedivider.app/) | Sinh SVG dải phân cách giữa các khối trên landing page | Công cụ miễn phí | Có điều kiện: chỉ dùng dạng cắt thẳng hoặc chéo nhẹ, tô bằng màu VETC, không dùng dạng sóng nhiều lớp |
| [Get Waves](https://getwaves.io/) | Sinh SVG sóng đơn giản cho chân trang web | Công cụ miễn phí | Có điều kiện: như trên |
| [CSS Clip-Path Generator](https://csstoolkit.net/css-clip-path-generator/) | Dựng vùng cắt hình cho khối ảnh trên web | Công cụ miễn phí | Dùng chính |
| [Undraw.co](https://undraw.co/) | Minh họa phẳng đổi được màu chủ đạo sang xanh VETC | Giấy phép mở, cho dùng thương mại không cần ghi công | Có điều kiện: chỉ cho tài liệu nội bộ, slide và trang hướng dẫn. Không dùng trên banner trong ứng dụng và ấn phẩm thương hiệu, vì guideline yêu cầu hình ảnh đời thực |
| [Freepik](https://www.freepik.com) | Vector và mẫu khi cần gấp | Bản miễn phí bắt ghi công, bản trả phí thì không | Có điều kiện: chỉ dùng tài khoản trả phí cho ấn phẩm phát hành, và vẫn phải sửa về đúng màu VETC |
| [Servier Medical Art](https://smart.servier.com) | Hình minh họa y tế, dùng cho nội dung bảo hiểm sức khỏe nếu có | Creative Commons, bắt ghi công | Chỉ tham khảo: kiểm tra với phòng bảo hiểm trước khi dùng |

## 7. Mockup và trình bày sản phẩm

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [Mockuphone](https://mockuphone.com/) | Lồng ảnh chụp màn hình vào khung thiết bị, nhiều dòng máy | Miễn phí | Dùng chính |
| [Shot Snap](https://shotsnapp.com/) | Ảnh mockup thiết bị đẹp cho social và slide | Miễn phí | Dùng chính |
| [Device Shots](https://deviceshots.com/) | Mockup thiết bị độ phân giải cao cho social | Miễn phí | Dùng chính |
| [Clean Mock](https://cleanmock.com/) | Mockup khung máy mới kèm nền tùy chỉnh | Miễn phí | Dùng chính: đặt nền trắng hoặc xanh VETC, không dùng nền gradient mặc định |
| [Screely](https://www.screely.com/) | Biến ảnh chụp màn hình thành ảnh có khung cửa sổ trình duyệt | Miễn phí | Dùng chính |
| [Pika](https://pika.style) | Mockup trình duyệt và ảnh bìa cho bài viết | Miễn phí và trả phí | Dùng chính |
| [Threed.io](https://threed.io) | Mockup 3D ngay trong trình duyệt | Miễn phí | Có điều kiện: giữ góc nhìn đơn giản, một sản phẩm một tiêu điểm |
| [Mock.Video](https://www.mock.video/) | Lồng video quay màn hình vào khung thiết bị | Miễn phí | Dùng chính |
| [Lunacy](https://icons8.com/lunacy) | Dựng mockup từ đầu, chạy trên Windows | Miễn phí | Dùng chính |
| [Mockup World](https://www.mockupworld.co/) | Kho mockup PSD cho ấn phẩm in, túi, áo, standee | Khác nhau theo từng file | Có điều kiện: kiểm tra giấy phép từng file trước khi dùng cho hồ sơ gửi đối tác |
| [Smart Mockups](https://smartmockups.com/) | Mockup sản phẩm và quà tặng | Miễn phí và trả phí, bản miễn phí có hình chìm | Có điều kiện: không dùng bản có hình chìm trong hồ sơ gửi ra ngoài |

Bắt buộc với mọi mockup: ảnh màn hình lồng vào phải là **ảnh chụp ứng dụng VETC đã ẩn
danh**, không có biển số thật, số thẻ, số dư, số điện thoại hay tên khách hàng. Dùng dữ
liệu giả. Không ghép ảnh giao diện của phiên bản app chưa phát hành vào ấn phẩm đối ngoại
khi phòng sản phẩm chưa xác nhận.

## 8. Nén, đổi định dạng và xóa dữ liệu ẩn

Banner trong ứng dụng và ảnh social đều có hạn mức dung lượng. Nguyên tắc chọn công cụ:
file có dữ liệu nội bộ thì **chỉ** dùng công cụ chạy hoàn toàn trong trình duyệt.

| Nguồn | Dùng để làm gì | Có tải file lên máy chủ | Mức phù hợp |
|---|---|---|---|
| [Squoosh.app](https://squoosh.app/) | Nén và đổi định dạng ảnh, so trực quan trước và sau | Không, chạy trong trình duyệt | Dùng chính |
| [Asset Melt](https://assetmelt.com) | Nén hàng loạt theo hạn mức dung lượng, hỗ trợ AVIF và WebP | Không | Dùng chính |
| [BulkResizePhotos](https://bulkresizephotos.com/) | Đổi cỡ và nén hàng loạt, chạy được cả khi mất mạng | Không | Dùng chính |
| [PhotoReducer](https://photoreducer.com/) | Nén về đúng một mức dung lượng cho trước, ví dụ dưới 100 KB | Không | Dùng chính |
| [SVGOMG](https://jakearchibald.github.io/svgomg/) | Làm gọn SVG, bỏ dữ liệu rác do phần mềm thiết kế sinh ra | Không | Dùng chính |
| [Verexif](https://www.verexif.com/en/) | Xóa dữ liệu EXIF, gồm cả vị trí GPS và tên máy | Có, nên cân nhắc | Có điều kiện: ảnh nội bộ thì xóa EXIF bằng công cụ trên máy, không tải lên |
| [EZGif](https://ezgif.com/) | Dựng và tối ưu GIF cho chat và email | Có | Có điều kiện: chỉ với ảnh đã công khai |
| [TinyPNG](https://tinypng.com/) | Nén PNG và JPEG, chất lượng tốt | Có | Có điều kiện: chỉ với ảnh đã công khai |
| [iLoveIMG](https://www.iloveimg.com/) | Bộ công cụ ảnh tổng hợp | Có | Có điều kiện: chỉ với ảnh đã công khai |
| [Vecta Nano](https://vecta.io/nano) | Nén SVG không mất dữ liệu | Có | Có điều kiện: chỉ với file đã công khai |

Luôn xóa EXIF trước khi phát hành ảnh chụp tại trạm hoặc văn phòng, vì EXIF có thể mang
theo tọa độ GPS và thời điểm chụp.

## 9. Công cụ dựng thiết kế

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [Figma](https://www.figma.com/) | Dựng giao diện, banner, bộ thành phần, làm việc nhiều người | Có bản miễn phí, bản trả phí theo chỗ ngồi | Dùng chính: nơi đặt bộ thành phần nhận diện VETC |
| [Penpot](https://penpot.app/) | Thay thế Figma bằng công cụ mã nguồn mở, tự cài được trên hạ tầng nội bộ | Mã nguồn mở | Có điều kiện: xem xét khi cần thiết kế không ra khỏi hạ tầng VETC |
| [Canva](https://www.canva.com/) | Dựng nhanh ấn phẩm social và slide cho người không chuyên thiết kế | Có bản miễn phí và bản trả phí | Có điều kiện: phải dựng trên mẫu VETC đã duyệt, không dùng mẫu và phông mặc định của Canva |
| [Photopea](https://www.photopea.com) | Mở và sửa file PSD ngay trong trình duyệt khi không có Photoshop | Miễn phí, có quảng cáo | Có điều kiện: file có dữ liệu nội bộ thì dùng GIMP trên máy |
| [Gimp](https://www.gimp.org/) | Sửa ảnh trên máy, thay cho Photoshop | Mã nguồn mở | Dùng chính |
| [Inkscape](https://inkscape.org/) | Xử lý vector trên máy, mở và xuất SVG, EPS, PDF | Mã nguồn mở | Dùng chính |
| [Krita](https://krita.org/en/download/krita-desktop/) | Vẽ và minh họa | Mã nguồn mở | Chỉ tham khảo: VETC ít dùng minh họa vẽ tay |
| [Blender](https://www.blender.org/download/) | Dựng 3D cho mô hình trạm, thẻ, thiết bị | Mã nguồn mở | Có điều kiện: mô hình mô tả thiết bị thật phải được phòng kỹ thuật xác nhận |
| [Rive](https://rive.app/) | Dựng chuyển động tương tác nhúng vào ứng dụng | Có bản miễn phí | Có điều kiện: tuân thủ quy tắc chuyển động trong guideline |
| [Jitter](https://jitter.video/) | Dựng motion graphic ngắn cho social | Có bản miễn phí | Có điều kiện: như trên |
| [Excalidraw](https://excalidraw.com/) | Vẽ sơ đồ nháp khi họp | Mã nguồn mở | Dùng chính: chỉ cho bản nháp, không đưa vào tài liệu chính thức vì nét vẽ tay lệch nhận diện |
| [Diagrams](https://www.diagrams.net/) | Vẽ sơ đồ luồng và sơ đồ hệ thống cho tài liệu | Mã nguồn mở | Dùng chính: đặt lại màu theo token VETC |
| [Mermaid](https://github.com/mermaid-js/mermaid) | Sinh sơ đồ từ văn bản, nhúng trực tiếp vào tài liệu trong repo | Mã nguồn mở | Dùng chính |

## 10. Biểu đồ cho báo cáo và dashboard

Mọi biểu đồ phải đổi sang bảng màu VETC, không để palette mặc định của thư viện. Chuỗi dữ
liệu dùng thang xanh bổ trợ (`#009647`, `#63BF7F`, `#98D09F`, `#D6EBD8`); màu dịch vụ chỉ
dùng khi biểu đồ đang so sánh chính các dịch vụ đó.

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [ChartJS](https://www.chartjs.org/) | Biểu đồ cơ bản cho báo cáo và trang nội bộ, dễ học | Mã nguồn mở | Dùng chính |
| [Echarts](https://echarts.apache.org/en/index.html) | Dashboard nhiều biểu đồ, dữ liệu lớn, có bản đồ | Apache 2.0 | Dùng chính |
| [ApexCharts.Js](https://apexcharts.com/) | Biểu đồ tương tác, xuất ảnh sẵn | Mã nguồn mở | Dùng chính |
| [Google Charts](https://developers.google.com/chart/) | Biểu đồ nhanh, ít cấu hình | Miễn phí, chạy qua máy chủ Google | Có điều kiện: không dùng cho dữ liệu nội bộ chưa công bố |
| [Data Driven Documents (D3)](https://d3js.org/) | Biểu đồ đặc thù không có sẵn trong thư viện khác | Mã nguồn mở | Có điều kiện: chi phí phát triển cao, chỉ dùng khi thật cần |
| [Nivo](https://nivo.rocks/) | Biểu đồ cho ứng dụng React, dựng trên D3 | Mã nguồn mở | Dùng chính nếu dự án đã dùng React |
| [Grid.js](https://gridjs.io/) | Bảng dữ liệu có sắp xếp và tìm kiếm cho trang nội bộ | Mã nguồn mở | Dùng chính |

## 11. Thư viện web và chuyển động cho landing page

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | Dựng landing page và trang nội bộ nhanh, khớp token màu và khoảng cách VETC | MIT | Dùng chính |
| [Bootstrap](https://getbootstrap.com/) | Dựng trang nội bộ khi cần sẵn nhiều thành phần | MIT | Có điều kiện: phải ghi đè màu, bo góc và phông về đúng nhận diện |
| [Swiperjs](https://swiperjs.com/) | Băng chuyền ảnh và thẻ, chạy tốt trên di động | Mã nguồn mở | Dùng chính |
| [GSAP](https://gsap.com/) | Chuyển động phức tạp, có kiểm soát thời gian chính xác | Miễn phí cho phần lớn trường hợp, đọc lại điều khoản trước khi dùng thương mại | Có điều kiện: xác nhận điều khoản với phòng kỹ thuật |
| [Animate On Scroll](https://michalsnik.github.io/aos/) | Hiện dần nội dung khi cuộn trang | MIT | Dùng chính |
| [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) | Cuộn mượt và phát hiện phần tử trong khung nhìn | MIT | Có điều kiện: dễ gây khó chịu, phải tôn trọng `prefers-reduced-motion` |
| [Splitting.js](https://splitting.js.org/) | Tách chữ để chạy chuyển động theo từng dòng | MIT | Có điều kiện: chỉ trượt và mờ dần, không chạy từng chữ cái |
| [Mermaid Design](https://mermaid.design) | Soạn và xuất sơ đồ Mermaid thành SVG | Công cụ miễn phí | Dùng chính |

Quy tắc chuyển động của VETC, áp cho mọi thư viện trên: mỗi bước khoảng 400ms, nhịp
`cubic-bezier(.2,0,0,1)`, chỉ trượt và mờ dần, không nảy, không phóng to, smartlines không
xoay.

## 12. Kiểm tra chất lượng và khả năng tiếp cận

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [Kontrast - WCAG Contrast Checker](https://chrome.google.com/webstore/detail/kontrast-wcag-contrast-ch/haphaaenepedkjngghandlmhfillnhjk) | Kiểm tương phản ngay trên trang đang mở | Tiện ích miễn phí | Dùng chính |
| [Statable WCAG Checker](https://chromewebstore.google.com/detail/statable-wcag-checker/cgfkmhkdjaglhanjmaofjfkmieanchmo) | Quét lỗi tiếp cận theo WCAG, liệt kê từng lỗi kèm cách sửa | Tiện ích miễn phí | Dùng chính |
| [A11ygator](https://a11ygator.chialab.io/) | Quét một trang đã công khai theo bộ quy tắc WCAG | Công cụ miễn phí | Có điều kiện: chỉ quét trang đã công khai |
| [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) | Đo hiệu năng, tiếp cận và SEO của trang | Mã nguồn mở | Dùng chính |
| [WhatFont](https://chrome.google.com/webstore/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm) | Xem trang web đang dùng phông gì, cỡ bao nhiêu | Tiện ích miễn phí | Dùng chính: kiểm tra trang VETC có nạp đúng VETC Sans hay đang rơi về phông dự phòng |
| [Fonts Ninja](https://chrome.google.com/webstore/detail/fonts-ninja/eljapbgkmlngdpckoiiibecpemleclhh) | Nhận diện phông, chi tiết hơn WhatFont | Tiện ích miễn phí | Dùng chính |
| [PerfectPixel](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi) | Đặt bản thiết kế chồng lên trang đã dựng để so lệch từng pixel | Tiện ích miễn phí | Dùng chính |
| [Page Ruler Redux](https://chrome.google.com/webstore/detail/page-ruler-redux/giejhjebcalaheckengmchjekofhhmal) | Đo kích thước và khoảng cách thật trên trang, kiểm tra vùng an toàn của logo | Tiện ích miễn phí | Dùng chính |
| [Responsive Viewer](https://chrome.google.com/webstore/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb) | Xem nhiều cỡ màn hình cùng lúc | Tiện ích miễn phí | Dùng chính |
| [ColorZilla](https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp) | Hút màu từ trang để đối chiếu với token VETC | Tiện ích miễn phí | Dùng chính |
| [mydevice.io](https://www.mydevice.io/) | Tra độ phân giải thật của các dòng máy phổ biến | Công cụ miễn phí | Dùng chính |
| [everysize](https://everysize.kibalabs.com/) | Xem một trang ở nhiều cỡ khung cùng lúc | Công cụ miễn phí | Dùng chính |
| [Can I Use](https://caniuse.com/) | Kiểm tra một tính năng CSS hoặc JS có chạy trên trình duyệt mục tiêu | Công cụ miễn phí | Dùng chính |

## 13. Hệ thống thiết kế để tham khảo cách làm

Dùng để học **cách viết và tổ chức** tài liệu nhận diện, không phải để sao chép giao diện.
VETC đã có guideline riêng, phần thiếu là cách biến guideline thành thư viện thành phần có
mã nguồn.

| Nguồn | Học được gì | Mức phù hợp |
|---|---|---|
| [Carbon Design Systems](https://www.carbondesignsystem.com/) | Cách tổ chức token màu, chữ, khoảng cách cho sản phẩm doanh nghiệp. Gần nhu cầu VETC nhất | Chỉ tham khảo |
| [Material Design](https://material.io/) | Chuẩn mực giao diện Android, cần nắm vì ứng dụng VETC chạy trên Android | Chỉ tham khảo |
| [Apple Design Resources](https://developer.apple.com/design/resources/) | Chuẩn mực giao diện iOS | Chỉ tham khảo |
| [Polaris](https://polaris.shopify.com/) | Cách viết hướng dẫn nội dung và giọng điệu đi kèm thành phần giao diện | Chỉ tham khảo |
| [Primer](https://primer.style/) | Cách dựng tài liệu hệ thống thiết kế ngay trong repo | Chỉ tham khảo |
| [Microsoft Fluent UI](https://developer.microsoft.com/en-us/fluentui#/) | Cách giữ đồng nhất qua nhiều nền tảng | Chỉ tham khảo |
| [Ant Design](https://ant.design/) | Mẫu giao diện cho sản phẩm nhiều dữ liệu và biểu mẫu | Chỉ tham khảo |
| [Laws of UX](https://lawsofux.com/) | Các nguyên lý trải nghiệm, dùng để bảo vệ quyết định thiết kế khi họp | Chỉ tham khảo |
| [Checklist Design](https://www.checklist.design/) | Danh mục tự kiểm cho từng loại trang và thành phần | Dùng chính: tham chiếu khi dựng checklist nội bộ |
| [StyleGuides.io](http://styleguides.io/) | Thư mục hơn 500 hệ thống thiết kế, dùng khi cần ví dụ cho một ngành cụ thể | Chỉ tham khảo |

## 14. Ấn phẩm in và khổ giấy

| Nguồn | Dùng để làm gì | Giấy phép | Mức phù hợp |
|---|---|---|---|
| [papersizes](https://papersizes.io/) | Tra kích thước chuẩn A, B, C và khổ phong bì theo milimet | Công cụ miễn phí | Dùng chính |
| [PapersDB](https://papersdb.com/) | Tra khổ giấy theo cả hệ mét và hệ inch | Công cụ miễn phí | Dùng chính |
| [ArtboardLab](https://artboardlab.com/tools/) | Mở file `.ai` của nhà in khi không có Illustrator, xuất từng artboard ra SVG, PNG hoặc PDF. Có cả bộ đổi đơn vị in và pixel | Miễn phí, chạy trong trình duyệt | Dùng chính |
| [Convertio](https://convertio.co/png-svg/) | Đổi PNG sang SVG khi chỉ còn file ảnh | Miễn phí có hạn mức, tải file lên máy chủ | Có điều kiện: chỉ với file đã công khai, và kết quả vector tự động luôn phải sửa tay |
| [Inkscape](https://inkscape.org/) | Mở, sửa và xuất file in trên máy | Mã nguồn mở | Dùng chính |

Nhắc lại cho ấn phẩm in: dùng hệ CMYK. Mã xanh in là `#00B05D`, CMYK 82 0 88 0, Pantone
6164C. Không lấy mã RGB `#0BB260` đưa vào file in và ngược lại. Trước mỗi lần in số lượng
lớn, kiểm tra lại pháp nhân, địa chỉ và đầu số hotline trên ấn phẩm.

## 15. Công cụ AI tạo hình

Nhóm này rủi ro cao nhất trong cả tài liệu. Ảnh AI có thể mô tả sai hạ tầng thật, sinh ra
biển số và logo không tồn tại, và không có chuỗi bằng chứng bản quyền rõ ràng.

| Nguồn | Dùng để làm gì | Mức phù hợp |
|---|---|---|
| [Leonardo.Ai](https://leonardo.ai/) | Tạo chất liệu nền trừu tượng, ảnh nháp để thuyết minh ý tưởng | Có điều kiện |
| [ImgGen.Ai](https://imggen.ai/) | Tạo ảnh nháp và nâng chất lượng ảnh | Có điều kiện |
| [PolyGlyph](https://polyglyph.io/) | Sinh và sửa SVG từ mô tả chữ | Có điều kiện |
| [Free AI Diagram Generator](https://diagram-generator.com/) | Dựng sơ đồ nháp từ mô tả chữ | Có điều kiện |
| [Galileo AI](https://www.usegalileo.ai/) | Sinh phác thảo giao diện để bàn ý tưởng | Chỉ tham khảo |

Năm điều kiện bắt buộc khi dùng nhóm này:

1. Không tạo logo, sub-logo hay biến thể nhận diện VETC bằng AI.
2. Không dùng ảnh AI để mô tả hạ tầng thật: trạm thu phí, barie, thẻ ETC, thiết bị, trụ sở.
3. Không đưa dữ liệu nội bộ, ảnh chụp màn hình có dữ liệu khách hàng, hay nội dung chưa
   công bố vào câu lệnh.
4. Ảnh AI chỉ dùng làm nền trừu tượng hoặc chất liệu, và phải ghi rõ trong hồ sơ thiết kế
   là ảnh do AI tạo.
5. Người có thẩm quyền duyệt trước khi phát hành, như mọi ấn phẩm khác.

## 16. Danh sách không dùng

Các nhóm này có trong bản gốc nhưng VETC không dùng, ghi lại để khỏi phải tranh luận lại.

| Nhóm trong bản gốc | Lý do không dùng |
|---|---|
| Trình tạo logo ([Logo Maker](https://logomakr.com/), [Free Logo Maker](https://www.namecheap.com/logo-maker/)) | VETC đã có logo và bộ sub-logo chính thức. Mọi nhánh dịch vụ mới lấy file từ bộ nhận diện, không tự sinh |
| Kho logo thương hiệu ([SVGPorn](https://svgporn.com), [World Vector Logo](https://worldvectorlogo.com/), [VectorLogoZone](https://www.vectorlogo.zone/)) | Logo đối tác phải lấy từ file chính thức do đối tác cung cấp, kèm hướng dẫn sử dụng của họ. Logo tải từ kho bên thứ ba thường sai phiên bản, sai tỉ lệ, sai màu, và dùng sai là rủi ro pháp lý |
| [GoSocialMockup](https://gosocialmockup.com) và các công cụ tạo ảnh chụp mạng xã hội giả | Tạo ảnh chụp bài đăng, tin nhắn hay bình luận giả là rủi ro truyền thông trực tiếp, nhất là với doanh nghiệp vận hành hạ tầng công. Không dùng trong bất kỳ hoàn cảnh nào, kể cả làm ví dụ nội bộ |
| Trình sinh gradient, mesh gradient, glassmorphism, neumorphism | Nhận diện VETC không dùng gradient làm nền chính, không đổ bóng mềm, không hiệu ứng kính |
| Kho hoa văn và texture ([Hero Patterns](http://www.heropatterns.com/), [Transparent Textures](https://www.transparenttextures.com/), [Pattern Monster](https://pattern.monster/) và tương tự) | Họa tiết chính thức duy nhất là smartlines, có quy tắc riêng về số dải, tỉ lệ và gradient |
| Trình sinh ảnh đại diện ngẫu nhiên ([Boring Avatars](https://boringavatars.com/), [Personas](https://personas.draftbit.com/), [Avataaars](https://avataaars.com/)) | Ảnh đại diện trong ứng dụng VETC gắn với người dùng thật, không dùng hình vẽ ngẫu nhiên. Trong tài liệu thì dùng ảnh nhân sự đã có văn bản đồng ý |
| Phông hiển thị, phông viết tay, phông hiệu ứng ([DaFont](https://www.dafont.com/), [FontBolt](https://www.fontbolt.com/) và tương tự) | Lệch nhận diện, phần lớn thiếu dấu tiếng Việt, và giấy phép thường không rõ ràng cho dùng thương mại |
| Nhóm ảnh minh họa theo phong cách riêng ([Humaaans](https://www.humaaans.com/), [Open Peeps](https://www.openpeeps.com/), [Absurd.design](https://absurd.design/)) | Phong cách mạnh, lấn nhận diện VETC. Guideline yêu cầu hình ảnh đời thực |
| Nhóm xây website không cần mã ([Wix](https://www.wix.com/), [Webflow](https://webflow.com/), [GrapesJS](https://grapesjs.com/)) | Hạ tầng web của VETC do phòng kỹ thuật quyết, không tự dựng trang đối ngoại trên nền tảng ngoài |

## Trước khi bổ sung một nguồn mới

Trả lời đủ sáu câu rồi mới thêm vào tài liệu này:

1. Giấy phép có cho dùng thương mại không, và lưu bằng chứng ở đâu?
2. Có bắt ghi công trên chính thiết kế không? Nếu có thì ấn phẩm nào chấp nhận được?
3. Có đủ dấu tiếng Việt không? Đã thử `ễ ỹ ặ ờ ự ẩ ỡ` chưa?
4. Công cụ có tải file lên máy chủ không? Nếu có thì tuyệt đối không dùng cho dữ liệu nội bộ.
5. Sản phẩm của nguồn này có phá nhận diện VETC không, nhất là về màu, phông và họa tiết?
6. Ai là người duyệt khi dùng nguồn này cho ấn phẩm phát hành?

Tài liệu này là bản tham chiếu nội bộ. Nội dung ấn phẩm, số liệu, chính sách và mức phí
trong thiết kế vẫn phải đối chiếu nguồn nội bộ đã duyệt, và người có thẩm quyền ký trước
khi phát hành.

Nguồn gốc: [bradtraversy/design-resources-for-developers](https://github.com/bradtraversy/design-resources-for-developers),
giấy phép MIT, Copyright (c) 2020 Brad Traversy. Bản lọc này giữ lại tên và liên kết từ danh
sách gốc, phần mô tả, phân loại, điều kiện giấy phép và đánh giá mức phù hợp là nội dung
riêng của VETC.
