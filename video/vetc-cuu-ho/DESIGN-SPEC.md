# VETC Cứu hộ 24/7 - "Đêm không một mình"

Phim quảng bá dịch vụ cứu hộ đường bộ VETC.
1920x1080 · 30fps · 1129 khung = 37,6 giây · Remotion.

Dựng bằng kỹ năng `video-shotcraft`, chế độ **tự do sáng tạo** (agent tự quyết
hướng hình, chọn thẻ shot, phân cảnh và âm thanh rồi chạy thẳng tới thành phẩm).

---

## 1. Tóm tắt sản phẩm

| Mục | Nội dung |
|---|---|
| Đối tượng | Bác tài xe con và xe tải nhẹ, người đã hoặc chưa dùng VETC |
| Kênh dự kiến | Social ngang 16:9, màn hình trạm, sự kiện nội bộ |
| Thông điệp | Xe chết máy giữa đêm không phải là chuyện một mình xoay xở. Gọi một số, VETC có mặt |
| Giọng | Chính thống pha gần gũi: tin cậy, điềm tĩnh, không phô trương, xưng hô "bác tài" |
| Định vị | Người Đồng Hành của tài xế Việt Nam |

## 2. Hướng hình và tokens

Hai trục tính cách: **năng lượng thấp đến trung bình**, **tông nghiêm túc pha
ấm áp**. Từ đó lấy preset "Chuyên nghiệp tin cậy" (~21f, bezier(0,0,0.2,1),
không nảy) pha "Bình tĩnh quan tâm" (~42f, ease-in-out đối xứng).
Kết quả: thời lượng chính 24-30f, vào bằng outCubic/inOutCubic, chỉ cho phép
quá đà (y1 > 1) đúng một chỗ: câu kết luận ở cảnh S6.

Bảng màu. **Nguồn: skill `vetc-design`** (Quy chuẩn nhận diện đồ họa VETC 2026,
hệ RGB cho đầu ra digital) và file `assets/vetc-tokens.css` của skill đó.

| Vai trò | Mã | Ghi chú |
|---|---|---|
| Nền | `#000000` | Đen là màu chính thức trong bảng |
| Mặt phẳng nổi | `#081410`, `#0D1F16` | Đen pha một chút xanh VETC |
| Xanh VETC | `#0BB260` | Hệ RGB. Bản in dùng `#00B05D`, Pantone 6164C |
| Xanh +2 | `#009647` | |
| Xanh +1 | `#63BF7F` | |
| Xanh -2 | `#D6EBD8` | Dùng cho chữ tiêu đề trên nền đen |
| Chữ chính | `#FFFFFF` | |
| Chữ phụ | trắng 72% và 55% | Tương phản trên nền đen: 10,4:1 và 6,2:1 |

Phông: **VETC Sans** là phông chính theo quy chuẩn. Chưa có file VETC Sans nên
dùng **Inter**, đúng phông thay thế mà quy chuẩn chỉ định cho sản phẩm digital.
File woff2 (có dải dấu tiếng Việt) nhúng sẵn trong `public/fonts`, render không
phụ thuộc mạng. Có file VETC Sans thì bỏ vào `public/fonts` và đẩy lên đầu
stack trong `brand.ts`.

Thang chữ theo chuẩn Q11 của skill video-shotcraft (đo trên bản 1080p): chữ
"để đọc" tối thiểu 56px, chữ phụ tối thiểu 32px. Thực tế: lời dẫn 62px, tiêu đề
thẻ 56px, nhãn 44px, chữ phụ 36px.

Ẩn dụ màu: **xanh VETC chỉ xuất hiện khi VETC vào cuộc**. Cảnh sự cố (S2) nhấn
bằng trắng thuần in nghiêng, cảnh VETC xử lý (S5) mới nhấn bằng xanh.

## 3. Bảng phân cảnh

Nguồn sự thật duy nhất: `src/vetc/shots.ts`. Bảng ghim âm thanh phái sinh từ đây.

| # | Khung | Dài | Cảnh | Thẻ shot | Nội dung |
|---|---|---|---|---|---|
| S1 | 0 | 162 | nightOpen | `glow-flyline-moves/glow-orb-ambient` + `opening/stroke-segment-build` | Đêm, ba quầng sáng trôi. Chữ VETC hiện theo 16 nét rời, nét cuối chốt thì nhịp sáng, đứng yên 35 khung rồi mờ dần 8 khung để giao cảnh. Dòng dưới: CỨU HỘ ĐƯỜNG BỘ 24/7 |
| S2 | 162 | 76 | titleNight | `typography/paper-title-card` (bản trường tối) | "2 giờ sáng. Xe *chết* máy." · MỘT CUỘC GỌI LÀ ĐỦ |
| S3 | 238 | 168 | relay | `effects/glow-flyline-moves/orb-flyline-relay` | Bác tài gọi → Tổng đài VETC → Đội gần nhất. Tia sáng đi từ mép thẻ này sang mép thẻ kia, quầng sáng cộng hưởng đúng khung trạm sáng |
| S4 | 406 | 156 | timeline | `data/timeline-travel` | Bốn mốc: Tiếp nhận · Định vị · Điều đội · Có mặt. Tăng tốc rồi phanh gấp, đẩy gần mốc cuối |
| S5 | 562 | 76 | titleOnsite | `typography/paper-title-card` | "Xử lý *ngay* tại chỗ." · KHÔNG PHẢI ĐỢI ĐẾN SÁNG |
| S6 | 638 | 176 | services | `typography/pill-slot-cycle` | "VETC có mặt để ___": kích bình ắc quy · thay lốp dự phòng · tiếp nhiên liệu · sửa chữa lưu động · kéo xe về garage → "bác lăn bánh tiếp." |
| S7 | 814 | 140 | hotline | `data/odometer-digit-roll` | 1900 6010 cuộn và khoá từng số · Nhánh 1 · Cứu hộ đường bộ |
| S8 | 954 | 175 | outro | `outro/logo-shrink-wordmark-lockup` | Vòng sáng thu về, chữ VETC vào lockup, tagline, dòng định vị, số tổng đài; giữ yên 54 khung |

Đường cong năng lượng (theo khung `sequences/promo-energy-arc`):
thấp (S1) → thấp (S2) → trung cao (S3) → cao (S4) → thấp (S5) → trung (S6) →
trung cao (S7) → trung, chốt (S8). Hai thẻ chữ nhịp thở đặt ở S2 và S5, đúng
định mức 2-4 thẻ của khung.

Thời gian đứng yên cuối mỗi cảnh, đo trên bản render (chuẩn đòi >= 30 khung ở
các cảnh có thẻ quy định): S1 35 · S3 40 · S4 37 · S6 45 · S7 61 · S8 54.

## 4. Âm thanh

Bảng ghim: `src/vetc/Sfx.tsx`, **36 điểm**, mỗi điểm có chú thích động tác.

- Ghim tương đối theo `SHOTS.<tên>.from + offset`, không có số khung trần nào.
- Công thức: `from = khung đỉnh thiết kế − độ trễ đỉnh của file − độ lệch đầu ra`.
- Độ trễ đỉnh từng file đo bằng `tools/peaks.py` (bao hình RMS, cửa sổ 5ms, **48kHz**).
- Độ lệch đầu ra: 1,28f (priming 2048 samples @48kHz). **Đã kiểm trên bản render**
  bằng `tools/audio-offset.py`: bốn mũi dò (chốt chữ VETC f110, phanh gấp f504,
  số khoá đầu f856, cú đáp outro f995) đều lệch trong vòng ±1 khung.
- **Tiếng nền đêm rải liên tục cả phim** (`scifi-computer-ambience`, ba lát, âm
  lượng 0,07). Phim không có nhạc nền nên nếu thiếu lớp này sẽ thủng thành những
  khoảng câm số tuyệt đối. Hiện đoạn câm dài nhất còn 4 khung (0,13 giây), là các
  hõm tự nhiên của tiếng nền chứ không phải lỗ thủng.
- Câu ba nhịp kết phim: riser (f995−35) → impact (f995, đỉnh âm lượng cả phim,
  0,55) → sparkle (f1027, lùi đủ xa để không bị đuôi vang của impact nuốt).
- Chống cảm giác súng máy ở các chuỗi liên tiếp: hai mẫu luân phiên (S6) và
  thang âm lượng giảm dần (S4 pop 0,40→0,26; S7 khoá số 0,34→0,24; S6 0,30→0,20).
- Kiểm đỉnh bản render: L −3,45 dBFS, R −2,87 dBFS, **không có mẫu chạm ngưỡng**.

### Bài học đo đỉnh âm (đáng ghi lại)

Vòng đầu em đo đỉnh các file trên bản giải mã 8kHz và kết luận sai: `sparkle-touch`
hiện ra −15,6dB nên được cho hệ số khuếch đại 3,0. Giải mã 8kHz cắt mất dải cao,
mà đó chính là năng lượng của các mẫu sáng. Đo lại ở đúng 48kHz: file này thật ra
−5,2dB. Bản render đầu tiên vì thế bị méo ở 9 khung. Sau khi đo lại 48kHz, không
file nào trong bộ dưới −12dB, toàn bộ hệ số về khoảng thường dùng 0,2-0,6 và hết méo.

## 5. Sai lệch có ý thức so với chuẩn

Skill cho phép cố ý làm khác chuẩn, với điều kiện ghi rõ vào tài liệu dự án.
Năm chỗ:

1. **Cả phim là trường tối.** Chuẩn của thẻ `glow-flyline-moves` là "mỗi phim
   chỉ một đoạn trường tối". Ở đây bóng tối chính là bối cảnh câu chuyện (xe chết
   máy giữa đêm), nên trường tối là nền xuyên suốt. Điều kiện đánh đổi là tương
   phản chữ, và lần này đã đo thật: hai mức chữ phụ cho 10,4:1 và 6,2:1, đều vượt
   ngưỡng 4,5:1 của quy chuẩn VETC.

2. **Tỉ lệ màu chủ đạo dưới 50%.** Quy chuẩn VETC yêu cầu màu xanh chiếm 50-60%
   bố cục. Phim nền đen không đạt được điều này. Đây là sai lệch **cần người có
   thẩm quyền duyệt**, không phải thứ tự quyết định được: nếu phòng thương hiệu
   không chấp nhận thì phải đổi hướng hình sang nền sáng, tức làm lại từ đầu.

3. **Kết phim không theo kiểu "ảnh tập thể" (Q8).** Chuẩn khuyên đẩy đoạn kết lên
   đỉnh năng lượng với các phần tử bay vào vây quanh chữ thương hiệu. Ở đây cố ý
   kết bằng lockup tĩnh, vì đây là dịch vụ cứu hộ: giọng thương hiệu là tin cậy và
   không phô trương. Đỉnh năng lượng dồn vào cú phanh gấp ở S4 và cú đáp của dấu
   hiệu ở S8. Bù lại quy cách, lockup đã được nâng lên và thêm dòng số tổng đài
   để khung cuối vẫn có chỗ cho người xem hành động.

4. **Không có nhạc nền.** Kho BGM của skill chỉ có 5 bản tech-house và hip-hop,
   đều lệch giọng VETC. Phim giao ở dạng chỉ có hiệu ứng âm thanh cộng tiếng nền
   đêm, kèm sẵn công tắc: đặt file nhạc đã có bản quyền vào `public/audio/bgm.mp3`
   rồi render với `--props='{"bgm":true}'`; đường bao âm lượng (0 → 0,34 → 0) đã
   viết sẵn. Khi bật nhạc thì phải xuất hai bản từ cùng một trục thời gian.

5. **Thẻ chữ nhịp thở dài 76 khung thay vì 50-55.** Thẻ gốc viết cho tiếng Anh.
   Bản 54 khung đo ra chỉ cho 25 khung (0,83 giây) để đọc trọn một câu tiếng Việt
   có dấu, trong khi chuẩn nhịp R3 nói "sáu lần phản hồi độc lập đều là chậm lại,
   chưa lần nào là quá nhanh". Với 76 khung, cửa sổ đọc trọn câu là 34 khung.

## 6. Việc phải làm trước khi phát hành

Đây là bản dựng để duyệt nội bộ, **chưa phải bản phát hành**.

1. **Thay dấu hiệu và chữ thương hiệu bằng file chính thức.** Chữ VETC ở S1 là
   nét dựng tay, dấu hiệu vòng cung ở S8 là hình học trừu tượng - cả hai chỉ là
   chỗ giữ chỗ, **không phải logo VETC thật**. Phải thay bằng file logo chuẩn.
   Khi thay, nhớ vùng an toàn bằng 1/2 chiều cao logo ở cả bốn phía, và quy chuẩn
   cho phép căn giữa logo vì đây là frame mở đầu và kết thúc video.

2. **Đối chiếu bốn khẳng định còn lại.** Hotline `1900 6010` đã đối chiếu được
   với nguồn nội bộ (skill `vetc-design`, mục thông tin định danh). Bốn mục sau
   thì chưa có nguồn nào xác nhận, phòng dịch vụ phải ký trước khi phát hành:

   | Khẳng định | Xuất hiện ở | Vì sao phải kiểm |
   |---|---|---|
   | `Nhánh 1` | S7 (f900-953) | Sai nhánh là khách gọi vào chỗ khác giữa đêm |
   | `TRỰC 24/7 · TOÀN QUỐC` | S1 (f130-153), S7 | Cam kết phạm vi phủ và thời gian trực, rủi ro cao nhất phim |
   | Năm hạng mục cứu hộ | S6 (f650-806) | Danh mục dịch vụ, phải khớp hợp đồng đang bán |
   | "Kỹ thuật viên tới, xử lý tại chỗ" + "KHÔNG PHẢI ĐỢI ĐẾN SÁNG" | S4, S5 | Hàm ý cam kết sửa được tại chỗ trong đêm, không kèm điều kiện |

   Các con số hay lưu hành khác (thời gian cam kết có mặt, tỉ lệ phủ xã phường,
   số garage liên kết, giá gói năm) **đã cố ý không đưa vào phim** vì chưa đối
   chiếu được.

3. **Duyệt sai lệch số 2 ở mục 5** (tỉ lệ màu chủ đạo dưới ngưỡng quy chuẩn).

4. **Xác nhận bản quyền hai file âm thanh.** Hồ sơ của thư viện ghi `riser-cine.mp3`
   và `pop.mp3` không truy ngược được nguồn. Người dùng đã chọn giữ nguyên và để
   pháp chế rà sau. Hai file này đang dùng ở S1/S8 (riser) và S4 (pop).

5. **Mua Company License của Remotion.** Remotion miễn phí cho cá nhân, tổ chức
   phi lợi nhuận và doanh nghiệp tối đa 3 nhân viên. VETC vượt ngưỡng nên phải
   mua, xem remotion.pro/license.

6. **Người có thẩm quyền duyệt nội dung đối ngoại** theo quy trình, trước khi đăng.

## 7. Chạy lại

```bash
cd video/vetc-cuu-ho
npm install
npx remotion render src/index.ts VetcCuuHo out/vetc-cuu-ho-24-7.mp4
npx remotion studio src/index.ts          # sửa trực quan
python3 tools/peaks.py                    # đo lại đỉnh và độ trễ đỉnh của SFX
python3 tools/audio-offset.py             # đo lại độ lệch âm-hình sau khi render
```

Môi trường này không tải được Chrome Headless Shell của Remotion (bị chặn ra
ngoài) nên `remotion.config.ts` trỏ sang bản Chromium có sẵn trong máy. Trên máy
khác, xoá dòng `Config.setBrowserExecutable` là Remotion tự tải.

---

## 8. Nhật ký sửa sau soát xét độc lập

Vòng 1 giao xong, một agent ngữ cảnh sạch soát lại theo `references/final-review.md`
và `references/aesthetic-rules.md`. Những gì đã sửa ở vòng 2:

| Phát hiện | Xử lý |
|---|---|
| Màu và phông không phải của VETC, lại được tài liệu chứng thực là đúng chuẩn | Đổi toàn bộ sang bảng của `vetc-design` (`#0BB260` và dải phụ), phông sang Inter, sửa lại câu khai nguồn trong `brand.ts` và tài liệu này |
| Số tổng đài lộ ở S3 trước 18 giây, giết cảm giác hồi hộp của cảnh S7 (P4) | Dòng phụ trạm 01 đổi thành "Đêm, đường vắng" |
| Khung cuối phim không có số để gọi (Q8) | Nâng lockup lên 1,4 lần và thêm dòng "Cứu hộ 24/7 · 1900 6010" |
| Tia sáng cắm vào tâm thẻ nên vạch sáng đè lên tiêu đề (khung 251 vòng 1) | Cả điểm đi lẫn điểm đến chuyển ra mép thẻ |
| Ba cảnh hụt thời gian đứng yên cuối (25/25/18 khung) | Nới thời lượng và thu ngắn các đuôi động tác; nay 35/40/37 khung |
| Thẻ chữ chỉ cho 0,83 giây để đọc trọn câu (R3) | Nới lên 76 khung, chia lại theo từng TỪ thay vì theo khối, mỗi câu đúng một từ nhấn |
| Giọt tròn thò ra dưới đáy chữ V; bậc lệch ở góc E/T/C | Bỏ phần nối dài ở đỉnh chữ V, kéo các gạch ngang ra tới mép ngoài cột dọc |
| Ba khối chữ dưới ngưỡng tương phản (2,94 / 2,85 / 1,71) | Nâng mức chữ mờ lên 55% trắng, nâng đáy mờ của thẻ trạm từ 0,55 lên 0,75, số thứ tự dùng xanh đầy |
| Bốn lỗ im lặng số, lỗ dài nhất 1,23 giây | Thêm tiếng nền đêm rải liên tục; đoạn câm dài nhất còn 4 khung |
| Tiếng khoá ở khung chốt chữ chỉ nổi 4dB trên riser | Hạ riser xuống 0,14 và dời đỉnh về f104 |
| Nhịp sparkle kết phim bị đuôi vang của impact nuốt | Lùi về f1027 |
| Cú cắt S1→S2 chớp về đen | Thêm 8 khung mờ dần ở đuôi S1, sau khi đã đứng yên đủ 35 khung |
| Ẩn dụ màu bị phá: S5 nói về cách xử lý nhưng vẫn nhấn hổ phách | Bỏ hổ phách (không có trong bảng màu chuẩn). S2 nhấn trắng, S5 nhấn xanh |
| "Kỹ thuật tới" là tiếng lóng nghề; "xe đang nằm" khẩu ngữ | Đổi thành "Kỹ thuật viên tới" và "xe gặp sự cố" |
| Tài liệu ghi sai: "27 điểm âm thanh", "giữ yên 37f" | Sửa theo số đo thật |

**Một phát hiện bị bác:** bản soát nói `scaleX(0.6 + 0.4·s)` ở cảnh S4 là tham số
tự thêm ngoài thẻ. Tra lại mã demo gốc `demos/data/timeline-travel/TimelineTravel.tsx`
dòng 78, tham số này có sẵn trong đó. Giữ nguyên.

**Chưa xử lý, để lại cho vòng sau nếu cần:** toàn bộ phim vẫn nằm trong ít commit
(chuẩn P3 muốn mỗi thay đổi một commit để lùi sạch được); và mục 8 của bản soát
lưu ý thẻ mốc thứ hai ở S4 lướt qua nhanh, người xem khó đọc kịp.
