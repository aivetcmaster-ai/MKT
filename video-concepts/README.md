# Bộ prompt video AI cho dịch vụ VETC

Tài liệu vận hành cho Google Flow (model Veo). Bản nháp chờ duyệt, chưa phát hành.

Người soạn: AI. Người duyệt và ký: chờ điền.
Ngày soạn: 2026-10-07.

## Cách dùng tài liệu này

Mỗi concept là một file riêng trong thư mục `concepts/`. Mỗi file có:

- Thông số đặt máy để điền vào Flow trước khi generate
- Prompt từng shot, phần hình bằng tiếng Anh, phần thoại giữ nguyên tiếng Việt
- Negative prompt dùng chung
- Việc cần làm ở hậu kỳ

Thứ tự khuyến nghị làm: concept 01, 02, 05 trước vì ngắn, dễ ra hình đúng, dùng được ngay cho social. Concept 07 và 08 làm sau cùng vì cần khoá nhân vật qua nhiều shot.

## Checklist trước khi bấm generate

1. Chọn đúng tỉ lệ khung. 9:16 cho TikTok, Reels, Shorts. 16:9 cho YouTube và màn hình trạm.
2. Bật chế độ chất lượng cao nhất tài khoản cho phép. Chạy bản nháp nhanh để chốt bố cục trước, rồi mới chạy bản chất lượng cao, tránh đốt credit.
3. Dán negative prompt vào ô tương ứng, hoặc nối vào cuối prompt chính nếu phiên bản Flow không có ô riêng.
4. Mỗi prompt chạy 2 đến 3 lần để lấy phương án tốt nhất. Veo cho kết quả lệch nhau khá nhiều giữa các lần.
5. Không sinh chữ tiếng Việt trong khung hình. Dấu sẽ lỗi. Mọi chữ gắn ở hậu kỳ.

## Checklist sau khi có clip

1. Logo VETC gắn hậu kỳ, vùng an toàn bằng một nửa chiều cao logo ở cả bốn phía. Logo căn giữa chỉ ở frame mở đầu hoặc kết thúc, các frame khác đặt góc.
2. Màu xanh dùng cho chữ và khung hậu kỳ: `#0BB260` hệ RGB. Không dùng mã CMYK trong file video.
3. Phông chữ overlay: VETC Sans, không có thì Inter.
4. Không viết hoa đầu mỗi từ trong tiêu đề tiếng Việt.
5. Không dùng gạch nối dài trong mọi dòng chữ.
6. Rà lại khung hình, bỏ mọi biển số xe đọc được, mọi logo thương hiệu lạ, mọi mặt người nhận diện được rõ.
7. Số liệu năng lực không đưa vào video khi chưa có nguồn và ngày chốt từ người phụ trách.

## Negative prompt dùng chung cho mọi concept

```
text overlay, subtitles, captions, watermark, logos, brand marks, readable license plates,
distorted faces, extra fingers, warped car bodies, cartoon, anime, 3d render look,
oversaturated colors, lens flare overload, slow motion, dreamy filter, stock footage look,
crowds of people, rain unless specified, nighttime unless specified
```

## Rủi ro cần lưu ý

- Veo đọc thoại tiếng Việt còn sai khẩu hình. Khuyến nghị để clip không thoại, lồng tiếng thật ở hậu kỳ. Prompt vẫn ghi thoại để model canh nhịp diễn.
- Cảnh trạm thu phí là bối cảnh vận hành thật. Trước khi gắn logo VETC vào cảnh do AI sinh, cần người có thẩm quyền xác nhận, vì người xem sẽ hiểu đó là trạm thật.
- Không cam kết thời gian phản hồi cứu hộ, mức phí, hay quyền lợi bảo hiểm trong video nếu chưa có văn bản duyệt.
