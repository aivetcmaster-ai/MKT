// Smart Line: các dải xanh vệt về trắng, đọc như vệt chuyển động.
// Luôn chạy trái sang phải hoặc neo đáy, không xoay, không đè lên logo (p.65).
import React from 'react';
import { color } from './tokens';

export type SmartLineProps = {
  /** Nền sáng dùng cho bố cục nền trắng. */
  light?: boolean;
  style?: React.CSSProperties;
};

export const SmartLine: React.FC<SmartLineProps> = ({ light = false, style }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: light ? color.white : color.green,
        backgroundImage: [
          `linear-gradient(90deg, ${color.greenPlus2} 0%, rgba(0,150,71,0) 48%)`,
          'linear-gradient(90deg, rgba(255,255,255,.92) 6%, rgba(255,255,255,0) 62%)',
          'linear-gradient(90deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 44%)',
          `linear-gradient(90deg, ${color.greenMinus2} 12%, rgba(214,235,216,0) 70%)`,
          'linear-gradient(90deg, rgba(255,255,255,.85) 0%, rgba(255,255,255,0) 52%)',
          `linear-gradient(90deg, ${color.greenPlus1} 0%, rgba(99,191,127,0) 40%)`,
        ].join(','),
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 9%, 100% 5%, 100% 7%, 100% 11%, 100% 6%, 100% 8%',
        backgroundPosition: '0 40%, 0 52%, 0 60%, 0 70%, 0 82%, 0 92%',
        ...style,
      }}
    />
  );
};
