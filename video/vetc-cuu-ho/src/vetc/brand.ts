// Design tokens — lấy từ quy chuẩn nhận diện VETC (vetc-design / vetc-fact-base).
// Màu chính #2DBE60, phụ #1E9E4F + #E8F8EE, nhấn #F5A623 (chỉ để nhấn).
// Font digital: Be Vietnam Pro. Tagline: "Sống hiện đại - Lái văn minh".
// Toàn phim là trường tối (night field) — xem DESIGN-SPEC.md mục "Sai lệch có ý thức".

export const C = {
  bgDeep: '#070C09',
  bg: '#0A120D',
  surface: '#101A14',
  surfaceHi: '#16241B',

  green: '#2DBE60',
  greenDark: '#1E9E4F',
  greenLift: '#7CE49B',
  pale: '#E8F8EE',

  amber: '#F5A623',

  text: '#E8F8EE',
  textDim: 'rgba(232,248,238,0.62)',
  textFaint: 'rgba(232,248,238,0.34)',
  line: 'rgba(232,248,238,0.14)',
  greenRGB: '45,190,96',
  paleRGB: '232,248,238',
} as const;

export const FONT = '"Be Vietnam Pro", Arial, Helvetica, sans-serif';

// Thang chữ theo Q11 (bản 1080p): chữ "để đọc" >= 56px, chữ phụ >= 32px.
export const T = {
  display: 116,
  caption: 62,
  title: 56,
  label: 44,
  aux: 34,
} as const;

// Tính cách động hiệu (preset "Chuyên nghiệp tin cậy" pha "Bình tĩnh quan tâm"):
// thời lượng chính ~24-30f, vào bằng outCubic/inOutCubic, không nảy;
// chỉ cho phép quá đà (y1 > 1) ở động tác "đáp xuống" của câu kết luận.
export const MOTION = {
  mainDur: 27,
  overshoot: 1.0,
} as const;
