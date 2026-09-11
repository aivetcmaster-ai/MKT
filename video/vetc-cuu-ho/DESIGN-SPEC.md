# VETC Cứu hộ 24/7 - "Đêm không một mình"

Phim quảng bá dịch vụ cứu hộ đường bộ VETC.
1920x1080 · 30fps · 1060 khung = 35,3 giây · Remotion.

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

Bảng màu (nguồn: skill `vetc-design` và `vetc-fact-base`):

| Vai trò | Mã |
|---|---|
| Nền sâu / nền cảnh | `#070C09` / `#0A120D` |
| Mặt phẳng nổi | `#101A14`, `#16241B` |
| Xanh VETC (chính) | `#2DBE60` |
| Xanh đậm / xanh sáng | `#1E9E4F` / `#7CE49B` |
| Xanh nhạt (chữ chính) | `#E8F8EE` |
| Hổ phách (chỉ để nhấn) | `#F5A623` |

Chữ: **Be Vietnam Pro** 400/600/700/800, file woff2 nhúng sẵn trong
`public/fonts` (có dải dấu tiếng Việt), không phụ thuộc mạng lúc render.

Thang chữ theo chuẩn Q11 của skill (đo trên bản 1080p): chữ "để đọc" tối thiểu
56px, chữ phụ tối thiểu 32px. Thực tế: lời dẫn 62px, tiêu đề thẻ 56px, nhãn
44px, chữ phụ 34px.

Ẩn dụ màu xuyên suốt: **hổ phách = sự cố** (chỉ xuất hiện ở hai thẻ chữ nói về
lúc xe hỏng), **xanh VETC = đội cứu hộ đang tới**. Không dùng hổ phách làm nền.

## 3. Bảng phân cảnh

Nguồn sự thật duy nhất: `src/vetc/shots.ts`. Bảng ghim âm thanh phái sinh từ đây.

| # | Khung | Dài | Cảnh | Thẻ shot | Nội dung |
|---|---|---|---|---|---|
| S1 | 0 | 155 | nightOpen | `glow-flyline-moves/glow-orb-ambient` + `opening/stroke-segment-build` | Đêm, ba quầng sáng trôi. Chữ VETC hiện theo 16 nét rời, nét cuối chốt thì nhịp sáng, giữ yên 37f. Dòng dưới: CỨU HỘ ĐƯỜNG BỘ 24/7 |
| S2 | 155 | 54 | titleNight | `typography/paper-title-card` (bản trường tối) | "2 giờ sáng. *Xe không nổ máy.*" · MỘT CUỘC GỌI LÀ ĐỦ |
| S3 | 209 | 156 | relay | `effects/glow-flyline-moves/orb-flyline-relay` | Bác tài gọi → Tổng đài VETC → Đội gần nhất. Quầng sáng cộng hưởng đúng khung trạm sáng |
| S4 | 365 | 150 | timeline | `data/timeline-travel` | Bốn mốc: Tiếp nhận · Định vị · Điều đội · Có mặt. Tăng tốc rồi phanh gấp, đẩy gần mốc cuối |
| S5 | 515 | 54 | titleOnsite | `typography/paper-title-card` | "Xử lý *ngay tại chỗ*." · KHÔNG PHẢI ĐỢI ĐẾN SÁNG |
| S6 | 569 | 176 | services | `typography/pill-slot-cycle` | "VETC có mặt để ___": kích bình ắc quy · thay lốp dự phòng · tiếp nhiên liệu · sửa chữa lưu động · kéo xe về garage → "bác lăn bánh tiếp." |
| S7 | 745 | 140 | hotline | `data/odometer-digit-roll` | 1900 6010 cuộn và khoá từng số · Nhánh 1 · Cứu hộ đường bộ |
| S8 | 885 | 175 | outro | `outro/logo-shrink-wordmark-lockup` | Vòng sáng thu về, chữ VETC vào lockup, tagline, giữ yên 43f |

Đường cong năng lượng (theo khung `sequences/promo-energy-arc`):
thấp (S1) → thấp (S2) → trung cao (S3) → cao (S4) → thấp (S5) → trung (S6) →
trung cao (S7) → trung, chốt (S8). Hai thẻ chữ nhịp thở đặt ở S2 và S5, đúng
định mức 2-4 thẻ của khung.

## 4. Âm thanh

Bảng ghim: `src/vetc/Sfx.tsx`, 27 điểm, mỗi điểm có chú thích động tác.

- Ghim tương đối theo `SHOTS.<tên>.from + offset`, không có số khung trần nào.
- Công thức: `from = khung đỉnh thiết kế − độ trễ đỉnh của file − độ lệch đầu ra`.
- Độ trễ đỉnh từng file đo bằng `tools/peaks.py` (bao hình RMS, cửa sổ 5ms, 48kHz).
- Độ lệch đầu ra: 1,28f (priming 2048 samples @48kHz). **Đã kiểm trên bản render**
  bằng `tools/audio-offset.py`: ba mũi dò (phanh gấp f469, số khoá đầu f787, cú
  đáp outro f926) đều lệch trong vòng ±1 khung.
- Câu ba nhịp kết phim: riser (f926−35) → impact (f926, đỉnh âm lượng cả phim,
  0.55) → sparkle (f951).
- Chống cảm giác súng máy ở các chuỗi liên tiếp: hai mẫu luân phiên (S6) và
  thang âm lượng giảm dần (S4 pop 0.40→0.26, S7 khoá số 0.34→0.24, S6 0.30→0.20).
- Kiểm đỉnh bản render: L −3,41 dBFS, R −2,86 dBFS, **không có mẫu chạm ngưỡng**.

### Bài học đo đỉnh âm (đáng ghi lại)

Vòng đầu em đo đỉnh các file trên bản giải mã 8kHz và kết luận sai: `sparkle-touch`
hiện ra −15,6dB nên được cho hệ số khuếch đại 3.0. Giải mã 8kHz cắt mất dải cao,
mà đó chính là năng lượng của các mẫu sáng. Đo lại ở đúng 48kHz: file này thật ra
−5,2dB. Bản render đầu tiên vì thế bị méo ở 9 khung. Sau khi đo lại 48kHz, không
file nào trong bộ dưới −12dB, toàn bộ hệ số về khoảng thường dùng 0,2-0,6 và hết méo.

## 5. Sai lệch có ý thức so với chuẩn của skill

Skill cho phép cố ý làm khác chuẩn, với điều kiện ghi rõ vào tài liệu dự án.
Bốn chỗ:

1. **Cả phim là trường tối.** Chuẩn của thẻ `glow-flyline-moves` là "mỗi phim
   chỉ một đoạn trường tối". Ở đây bóng tối chính là bối cảnh câu chuyện (xe hỏng
   giữa đêm), nên trường tối là nền xuyên suốt chứ không phải một đoạn. Đổi lại
   phải giữ tương phản chữ đủ cao, đã kiểm ở mọi khung có chữ.

2. **Kết phim không theo kiểu "ảnh tập thể" (Q8).** Chuẩn khuyên đẩy đoạn kết lên
   đỉnh năng lượng với các phần tử bay vào vây quanh chữ thương hiệu. Ở đây cố ý
   kết bằng lockup tĩnh, vì đây là dịch vụ cứu hộ: giọng thương hiệu là tin cậy và
   không phô trương, kết bằng pháo giấy sẽ lệch tông. Đỉnh năng lượng vì vậy dồn
   vào cú phanh gấp ở S4 và cú đáp của dấu hiệu ở S8.

3. **Không có nhạc nền.** Kho BGM của skill chỉ có 5 bản tech-house và hip-hop.
   Chuẩn S1 khuyên chọn nền điện tử rõ nhịp, nhưng cả năm bản đều lệch giọng VETC.
   Phim giao ở dạng chỉ có hiệu ứng âm thanh, kèm sẵn công tắc: đặt file nhạc đã
   có bản quyền vào `public/audio/bgm.mp3` rồi render với `--props='{"bgm":true}'`
   là có bản có nhạc, đường bao âm lượng (0 → 0,34 → 0) đã viết sẵn.

4. **Chữ trong thẻ chữ nhịp thở dùng sans, không dùng serif.** Thẻ gốc thuộc thế
   giới giấy mực nên dùng serif. Ở đây theo quy chuẩn nhận diện VETC, chữ digital
   là Be Vietnam Pro. Công thức động hiệu (từng từ vào lệch pha, gạch chân màu
   nhấn, 8f cuối mờ đi) giữ nguyên.

## 6. Việc phải làm trước khi phát hành

Đây là bản dựng để duyệt nội bộ, **chưa phải bản phát hành**. Ba việc bắt buộc:

1. **Thay dấu hiệu và chữ thương hiệu bằng file chính thức.** Chữ VETC ở S1 là
   nét dựng tay, dấu hiệu vòng cung ở S8 là hình học trừu tượng - cả hai chỉ là
   chỗ giữ chỗ, **không phải logo VETC thật**. Phải thay bằng file logo chuẩn từ
   bộ nhận diện.

2. **Đối chiếu mọi con số và cam kết.** Phim nêu: tổng đài `1900 6010` nhánh 1,
   `24/7`, `toàn quốc`, và năm hạng mục cứu hộ. Môi trường dựng phim này không vào
   được `vetc.com.vn` (bị chặn ra ngoài) nên em **không đối chiếu được với trang
   chính thức**. Phòng phụ trách phải xác nhận từng mục trước khi phát hành.
   Các con số hay lưu hành khác (thời gian cam kết có mặt, tỉ lệ phủ, số garage
   liên kết, giá gói năm) **đã cố ý không đưa vào phim** vì chưa đối chiếu được.

3. **Người có thẩm quyền duyệt nội dung đối ngoại** theo quy trình, trước khi đăng.

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
