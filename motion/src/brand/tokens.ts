// Token nhận diện VETC, chép từ posters/vetc-parking/tokens/ (Brand Guideline Nov 2025).
// Sửa ở đây là mọi composition đổi theo, không tự đặt màu rời trong từng cảnh.

export const color = {
  green: '#0BB260',
  greenPrint: '#00B15D',
  greenPlus2: '#009647',
  greenPlus1: '#63BF7F',
  greenMinus1: '#98D09F',
  greenMinus2: '#D6EBD8',
  black: '#000000',
  white: '#FFFFFF',
  neutral050: '#FBFBFB',
  neutral100: '#F5F5F7',
  neutral300: '#CDCDCD',
  neutral500: '#8A8A8E',
  neutral700: '#4A4A4E',
} as const;

// Bảng màu theo dòng dịch vụ (p.38), chỉ dùng làm điểm nhấn, không thay nền xanh chính.
export const service = {
  rescue: '#F26531',
  parking: '#FFC20E',
  insurance: '#34C3E0',
  petro: '#1D75BC',
} as const;

export const font = {
  sans: '"VETC Sans", "Helvetica Neue", Arial, sans-serif',
  office: 'Arial, Helvetica, sans-serif',
} as const;

export const weight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const leading = {
  display: 1,
  subhead: 1.15,
  body: 1.35,
} as const;

export const tracking = {
  uppercase: '0.08em',
  body: 0,
} as const;

// Lưới 4px, lề bố cục marketing tối thiểu 3% cạnh dài (p.90).
export const space = (n: number) => n * 4;
export const layoutMargin = 56;

export const smartline = {
  maxCoverage: 0.33,
} as const;
