// S1 · nightOpen — mở màn thương hiệu (đoạn ① của sequences/promo-energy-arc: năng lượng thấp)
// Thẻ: glow-flyline-moves/glow-orb-ambient (lớp khí quyển)
//    + opening/stroke-segment-build (chữ VETC hiện theo từng nét)
// Giữ nguyên tham số đã tinh chỉnh của thẻ stroke-segment-build:
//   FIRST=14, STEP=6, SEG_IN=6, nét trượt vào 12px theo hướng nét, out-cubic,
//   nét chưa sáng thì KHÔNG render (để đoạn cuối đứng yên thật),
//   nét cuối chốt ở f110 -> nhịp scale 1 -> 1.10 -> 1 trong 8f
//   (thẻ ghi 1.06 hơi e dè, thực chiến có thể lên 1.10).
// Thứ tự điểm sáng: 11 nét đầu nhảy lộn xộn giữa các chữ (chưa đọc được),
// ba nét chìa khoá (gạch giữa chữ E, cột dọc chữ T, nét chéo phải chữ V) để cuối.
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT, T } from '../brand';
import { E, seg } from '../motion';
import { AmbientOrbs, Orb } from '../AmbientOrbs';

// e1/e2: nối dài hai đầu nét (px) tại chỗ một nét bị chẻ đôi — không nối dài thì
// hai nửa chạm nhau đúng biên và để lại đường chỉ tối do khử răng cưa chồng lớp.
type Seg = { x1: number; y1: number; x2: number; y2: number; e1?: number; e2?: number; cap?: 'butt' | 'round' };

const K = 200; // bề rộng một chữ
const H = 320; // chiều cao chữ
const ADV = K + 60;
const SW = 44; // bề dày nét

const o1 = ADV;
const o2 = ADV * 2;
const o3 = ADV * 3;

// 16 nét rời của "VETC" (toạ độ trong khung 980 x 320)
const SEGS: Seg[] = [
  // V — hai nét chéo, mỗi nét chẻ làm hai (0-3); hai nửa dưới nối dài qua đỉnh nhọn
  { x1: 20, y1: 22, x2: 60, y2: 160, e2: 6 },
  { x1: 60, y1: 160, x2: 100, y2: 298, e1: 6, e2: 8, cap: 'round' },
  { x1: 100, y1: 298, x2: 140, y2: 160, e1: 8, e2: 6, cap: 'round' },
  { x1: 140, y1: 160, x2: 180, y2: 22, e1: 6 },
  // E — cột dọc chẻ hai + ba gạch ngang (4-8)
  { x1: o1 + 22, y1: 22, x2: o1 + 22, y2: 160, e2: 6 },
  { x1: o1 + 22, y1: 160, x2: o1 + 22, y2: 298, e1: 6 },
  { x1: o1 + 22, y1: 22, x2: o1 + 178, y2: 22 },
  { x1: o1 + 22, y1: 152, x2: o1 + 150, y2: 152 }, // chìa khoá
  { x1: o1 + 22, y1: 298, x2: o1 + 178, y2: 298 },
  // T — gạch trên chẻ hai + cột dọc (9-11)
  { x1: o2 + 20, y1: 22, x2: o2 + 100, y2: 22, e2: 6 },
  { x1: o2 + 100, y1: 22, x2: o2 + 180, y2: 22, e1: 6 },
  { x1: o2 + 100, y1: 22, x2: o2 + 100, y2: 298 }, // chìa khoá
  // C — gạch trên, cột dọc chẻ hai, gạch dưới (12-15)
  { x1: o3 + 22, y1: 22, x2: o3 + 178, y2: 22 },
  { x1: o3 + 22, y1: 22, x2: o3 + 22, y2: 160, e2: 6 },
  { x1: o3 + 22, y1: 160, x2: o3 + 22, y2: 298, e1: 6 },
  { x1: o3 + 22, y1: 298, x2: o3 + 178, y2: 298 },
];

const ORDER = [13, 5, 9, 15, 0, 6, 12, 8, 14, 4, 10, 1, 2, 7, 11, 3];

/** Toạ độ nét sau khi nối dài hai đầu theo e1/e2. */
const ends = (s: Seg) => {
  const dx = s.x2 - s.x1;
  const dy = s.y2 - s.y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const a = s.e1 ?? 0;
  const b = s.e2 ?? 0;
  return { x1: s.x1 - ux * a, y1: s.y1 - uy * a, x2: s.x2 + ux * b, y2: s.y2 + uy * b, ux, uy };
};

const FIRST = 14;
const STEP = 6;
const SEG_IN = 6;
const LAST_LAND = FIRST + 15 * STEP + SEG_IN; // 110
const PULSE_END = LAST_LAND + 8; // 118

const WORD_W = ADV * 3 + K; // 980
const OX = (1920 - WORD_W) / 2; // 470
const OY = (1080 - H) / 2 - 30; // 350

const ORBS: Orb[] = [
  { size: 680, peak: 0.3, bx: 600, by: 420, p1: 96, p2: 134, ax1: 170, ax2: 115, ay1: 160, ay2: 120, seed: 1 },
  { size: 580, peak: 0.2, bx: 1360, by: 580, p1: 110, p2: 92, ax1: 160, ax2: 120, ay1: 175, ay2: 105, seed: 2 },
  { size: 500, peak: 0.16, bx: 940, by: 880, p1: 128, p2: 98, ax1: 150, ax2: 125, ay1: 145, ay2: 118, seed: 3 },
];

export const S1NightOpen: React.FC = () => {
  const frame = useCurrentFrame();

  const pulse = interpolate(frame, [LAST_LAND, LAST_LAND + 3, PULSE_END], [1, 1.1, 1], {
    easing: E.outCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dòng phụ vào sau khi chữ đã chốt, rồi giữ yên (R1: nhịp thở thuộc về thương hiệu)
  const subT = seg(frame, LAST_LAND + 2, LAST_LAND + 20, E.outCubic);

  return (
    <AbsoluteFill style={{ background: C.bgDeep, overflow: 'hidden' }}>
      <AmbientOrbs frame={frame} orbs={ORBS} convergeFrom={95} convergeTo={125} carry={18} />

      <svg
        width={1920}
        height={1080}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `scale(${pulse})`,
          transformOrigin: '50% 48%',
        }}
      >
        <defs>
          <filter id="vetcGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        {/* Lớp toả sáng một lần cho nhân vật chính duy nhất của cảnh (Q4: không phát tán) */}
        <g filter="url(#vetcGlow)" opacity={0.34}>
          {SEGS.map((s, i) => {
            const rank = ORDER.indexOf(i);
            const start = FIRST + rank * STEP;
            if (frame < start + SEG_IN) return null;
            const g = ends(s);
            return (
              <line
                key={i}
                x1={OX + g.x1}
                y1={OY + g.y1}
                x2={OX + g.x2}
                y2={OY + g.y2}
                stroke={C.green}
                strokeWidth={SW}
                strokeLinecap={s.cap ?? 'butt'}
              />
            );
          })}
        </g>
        {SEGS.map((s, i) => {
          const rank = ORDER.indexOf(i);
          const start = FIRST + rank * STEP;
          if (frame < start) return null; // nét chưa tới lượt thì không render
          const t = interpolate(frame, [start, start + SEG_IN], [0, 1], {
            easing: E.outCubic,
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const g = ends(s);
          const slide = 12 * (1 - t);
          const ox = -g.ux * slide;
          const oy = -g.uy * slide;
          return (
            <line
              key={i}
              x1={OX + g.x1 + ox}
              y1={OY + g.y1 + oy}
              x2={OX + g.x2 + ox}
              y2={OY + g.y2 + oy}
              stroke={C.pale}
              strokeWidth={SW}
              strokeLinecap={s.cap ?? 'butt'}
              opacity={t}
            />
          );
        })}
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: OY + H + 86,
          width: 1920,
          textAlign: 'center',
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: T.label,
          letterSpacing: '0.3em',
          color: C.green,
          opacity: subT,
          transform: `translateY(${(1 - subT) * 14}px)`,
        }}
      >
        CỨU HỘ ĐƯỜNG BỘ 24/7
      </div>
    </AbsoluteFill>
  );
};
