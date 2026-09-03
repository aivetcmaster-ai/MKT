/**
 * Nhận diện VETC dùng chung cho các scene.
 * Giá trị lấy từ posters/vetc-parking/tokens/colors.css (VETC Brand Guideline, Nov 2025).
 */
export const VETC = {
  green: '#0BB260',
  greenPlus2: '#009647',
  greenPlus1: '#63BF7F',
  greenMinus1: '#98D09F',
  greenMinus2: '#D6EBD8',
  black: '#000000',
  white: '#FFFFFF',
  neutral700: '#4A4A4E',

  /** Màu riêng theo dòng dịch vụ (Bảng màu đa sắc, p.38) */
  parking: '#FFC20E',
  rescue: '#F26531',
  insurance: '#34C3E0',
  petro: '#1D75BC',

  font: '"VETC Sans", "Helvetica Neue", Arial, sans-serif',
  tagline: 'Sống hiện đại - Lái văn minh',
} as const;
