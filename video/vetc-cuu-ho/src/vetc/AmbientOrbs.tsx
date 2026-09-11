// Lớp khí quyển — thẻ glow-flyline-moves, kiểu A (glow-orb-ambient).
// Giữ nguyên công thức đã tinh chỉnh: ba quầng 500-680px, blur(100px),
// trôi bằng hai sóng sin chu kỳ lệch nhau (tổng biên độ >= 240px, chu kỳ 92-134f),
// pha lấy từ hash xác định. Chỉ đổi sắc: xám sáng -> xanh VETC (bản màu thương hiệu,
// theo ghi chú "thực chiến bản màu thương hiệu" của thẻ).
import React from 'react';
import { interpolate } from 'remotion';
import { E, hash } from './motion';
import { C } from './brand';

const TAU = Math.PI * 2;

export type Orb = {
  size: number;
  peak: number;
  bx: number;
  by: number;
  p1: number;
  p2: number;
  ax1: number;
  ax2: number;
  ay1: number;
  ay2: number;
  seed: number;
  rgb?: string;
  surgeAt?: number;
};

export const orbPos = (o: Orb, t: number) => {
  const f1 = hash(o.seed * 7 + 1) * TAU;
  const f2 = hash(o.seed * 7 + 2) * TAU;
  const f3 = hash(o.seed * 7 + 3) * TAU;
  const f4 = hash(o.seed * 7 + 4) * TAU;
  return {
    x: o.bx + o.ax1 * Math.sin((TAU * t) / o.p1 + f1) + o.ax2 * Math.sin((TAU * t) / o.p2 + f2),
    y: o.by + o.ay1 * Math.sin((TAU * t) / o.p2 + f3) + o.ay2 * Math.sin((TAU * t) / o.p1 + f4),
  };
};

/** Thời gian hiệu dụng: trôi đều tới convergeFrom, rồi out-sine giảm dần và đóng băng. */
export const orbTime = (frame: number, convergeFrom: number, convergeTo: number, carry: number) =>
  frame <= convergeFrom
    ? frame
    : convergeFrom +
      interpolate(frame, [convergeFrom, convergeTo], [0, carry], {
        easing: E.outSine,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

/** Tăng sáng một nhịp: lên 5f out-cubic, tan 15f tuyến tính. */
export const surge = (frame: number, at: number) => {
  if (frame < at || frame > at + 20) return 0;
  return frame <= at + 5
    ? interpolate(frame, [at, at + 5], [0, 1], {
        easing: E.outCubic,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : interpolate(frame, [at + 5, at + 20], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
};

export const AmbientOrbs: React.FC<{
  frame: number;
  orbs: Orb[];
  convergeFrom: number;
  convergeTo: number;
  carry: number;
  fadeInTo?: number;
}> = ({ frame, orbs, convergeFrom, convergeTo, carry, fadeInTo = 20 }) => {
  const t = orbTime(frame, convergeFrom, convergeTo, carry);
  const fadeIn = interpolate(frame, [0, fadeInTo], [0, 1], {
    easing: E.outCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <>
      {orbs.map((o, i) => {
        const pos = orbPos(o, t);
        const s = o.surgeAt === undefined ? 0 : surge(frame, o.surgeAt);
        const a = Math.min(0.8, o.peak * (1 + 1.6 * s));
        const rgb = o.rgb ?? C.greenRGB;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: pos.x - o.size / 2,
              top: pos.y - o.size / 2,
              width: o.size,
              height: o.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(${rgb},${a.toFixed(3)}) 0%, rgba(${rgb},${(
                a * 0.5
              ).toFixed(3)}) 42%, rgba(${rgb},0) 70%)`,
              filter: 'blur(100px)',
              opacity: fadeIn,
            }}
          />
        );
      })}
    </>
  );
};
