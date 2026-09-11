// Nguyên thủy động hiệu — copy từ video-shotcraft demos/_fixtures/Motion.tsx
// và assets/lib/helpers/rand.ts. Toàn bộ là hàm thuần, chạy theo useCurrentFrame,
// không Math.random / Date.now => render xác định, tái lập từng khung.
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const E = {
  linear: (t: number) => t,
  inQuad: (t: number) => t * t,
  outQuad: (t: number) => t * (2 - t),
  inOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  inCubic: (t: number) => t * t * t,
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  outQuint: (t: number) => 1 - Math.pow(1 - t, 5),
  inQuart: (t: number) => t * t * t * t,
  outSine: (t: number) => Math.sin((t * Math.PI) / 2),
  outBack: (t: number, s = 1.70158) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
};

export const lerp = (t: number, a: number, b: number) => a + (b - a) * t;

/** Tiến độ phân đoạn: chuẩn hoá t trong [t0,t1] rồi qua ease, vượt biên thì kẹp. */
export const seg = (
  t: number,
  t0: number,
  t1: number,
  ease: (x: number) => number = E.linear,
) => ease(Math.min(1, Math.max(0, (t - t0) / (t1 - t0))));

/** Giả ngẫu nhiên xác định (cùng seed luôn cho cùng giá trị). */
export const hash = (n: number) => {
  const s = Math.sin(n * 127.3) * 43758.5453;
  return s - Math.floor(s);
};

/** Tiến độ chuẩn hoá t thuộc [0,1] của cả cảnh. */
export const useT = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return Math.min(1, frame / Math.max(1, durationInFrames - 1));
};

/**
 * Khung toạ độ thiết kế: nội dung vẽ trong w x h rồi phóng đẳng tỉ lệ đầy khung.
 * Giữ nguyên mọi con số đã được tinh chỉnh của thẻ shot gốc.
 */
export const DesignStage: React.FC<{
  w?: number;
  h?: number;
  bg?: string;
  children: React.ReactNode;
}> = ({ w = 480, h = 270, bg, children }) => {
  const { width } = useVideoConfig();
  const scale = width / w;
  return (
    <AbsoluteFill style={{ background: bg ?? '#000', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: w,
          height: h,
          overflow: 'hidden',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
