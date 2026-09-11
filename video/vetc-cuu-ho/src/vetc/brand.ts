// Design tokens — lấy TRỰC TIẾP từ skill `vetc-design`
// (Quy chuẩn nhận diện đồ họa VETC 2026, hệ màu RGB cho đầu ra digital)
// và file assets/vetc-tokens.css của skill đó.
//
// Vòng dựng đầu tiên lấy nhầm nguồn: dùng mục nhận diện rút gọn trong
// `vetc-fact-base` (#2DBE60, Be Vietnam Pro). Quy chuẩn thật ghi khác.
// Đã sửa theo quyết định của người phụ trách ngày 2026-09-11.

export const C = {
  // Nền: đen là màu chính thức trong bảng, dùng nguyên #000000 làm nền phim.
  bgDeep: '#000000',
  bg: '#000000',
  // Mặt phẳng nổi = đen pha một chút xanh VETC, để thẻ tách khỏi nền.
  surface: '#081410',
  surfaceHi: '#0D1F16',

  // Dải xanh chuẩn
  green: '#0BB260',      // Xanh VETC, hệ RGB
  greenDark: '#009647',  // Xanh +2
  greenLift: '#63BF7F',  // Xanh +1
  greenSoft: '#98D09F',  // Xanh -1
  pale: '#D6EBD8',       // Xanh -2

  // Chữ: trắng và Xanh -2 là hai mức chính, đều nằm trong bảng chuẩn.
  // Các mức mờ đã kiểm tương phản trên nền đen (quy chuẩn đòi 4.5:1 cho chữ
  // nội dung, 3:1 cho chữ lớn):
  //   rgba(255,255,255,0.72) -> ~10.4:1
  //   rgba(255,255,255,0.55) -> ~6.2:1
  text: '#FFFFFF',
  textDim: 'rgba(255,255,255,0.72)',
  textFaint: 'rgba(255,255,255,0.55)',
  line: 'rgba(214,235,216,0.16)',

  greenRGB: '11,178,96',
  paleRGB: '214,235,216',
} as const;

// Quy chuẩn: VETC Sans là phông chính. Chưa có file VETC Sans nên dùng Inter,
// đúng phông thay thế mà quy chuẩn chỉ định cho sản phẩm digital và web.
// Có file VETC Sans thì bỏ vào public/fonts và đẩy lên đầu stack này.
export const FONT = '"VETC Sans", Inter, Arial, "Helvetica Neue", sans-serif';

// Thang chữ cho bản 1080p. Sàn theo chuẩn Q11 của skill video-shotcraft:
// chữ "để đọc" >= 56px, chữ phụ >= 32px.
export const T = {
  display: 116,
  caption: 62,
  title: 56,
  label: 44,
  aux: 36,
} as const;

export const MOTION = {
  mainDur: 27,
  overshoot: 1.0,
} as const;
