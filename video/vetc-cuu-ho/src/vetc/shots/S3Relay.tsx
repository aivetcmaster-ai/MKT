// S3 · relay — thẻ effects/glow-flyline-moves, kiểu C (orb-flyline-relay).
// Giữ nguyên mọi tham số đã tinh chỉnh của thẻ:
//   bezier viết tay 100 đoạn, sinh trong 24f out-cubic, dừng 4f, tan 14f;
//   đầu sáng chỉ gắn trong lúc sinh (hết thì tháo hẳn, không để opacity 0);
//   đoạn mờ dần theo khoảng cách tới đầu (0.12 + 0.88 * t^2);
//   trạm đích sáng lên 8f + nhịp viền 6f lên / 16f xuống, dư 0.3;
//   MỆNH MÔN của kiểu C: quầng sáng tăng đúng CÙNG KHUNG với khung trạm sáng
//   (lệch quá 2f là đọc không ra "bắt lời nhau") -> surgeAt = litAt.
//   Trục thời gian: trạm A tự sáng f8, tia 1 f18-42, trạm B f42, tia 2 f52-76,
//   trạm C f76, mọi động tác xong trước f98, quầng sáng đóng băng f120,
//   35f cuối đứng yên thật.
// Đổi so với demo: ba ô wireframe xám thay bằng ba trạm có nhãn đọc được
// (Q1: cảnh không phải phục dựng trang thật thì được dựng tay, nhưng phải
//  rõ nghĩa và đạt chuẩn); đường bay đổi sang xanh VETC.
import React, { useId } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT, T } from '../brand';
import { E, seg } from '../motion';
import { AmbientOrbs, Orb } from '../AmbientOrbs';

type Pt = { x: number; y: number };

const bez = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
};

const N = 100;
const CARD_W = 580;
const CARD_H = 230;

const STATIONS = [
  { x: 150, y: 190, litAt: 8, title: 'BÁC TÀI GỌI', sub: '1900 6010 · nhánh 1', step: '01' },
  { x: 1190, y: 330, litAt: 42, title: 'TỔNG ĐÀI VETC', sub: 'Tiếp nhận · định vị xe', step: '02' },
  { x: 670, y: 720, litAt: 76, title: 'ĐỘI GẦN NHẤT', sub: 'Nhận lệnh · lên đường', step: '03' },
];

const center = (s: { x: number; y: number }) => ({ x: s.x + CARD_W / 2, y: s.y + CARD_H / 2 });

const ORBS: Orb[] = [
  { size: 720, peak: 0.24, bx: 1480, by: 360, p1: 104, p2: 138, ax1: 130, ax2: 95, ay1: 120, ay2: 92, seed: 1, surgeAt: 42 },
  { size: 640, peak: 0.18, bx: 940, by: 840, p1: 122, p2: 94, ax1: 125, ax2: 88, ay1: 128, ay2: 90, seed: 2, surgeAt: 76 },
];

const Flyline: React.FC<{
  frame: number;
  start: number;
  haloId: string;
  p0: Pt;
  p1: Pt;
  p2: Pt;
  p3: Pt;
}> = ({ frame, start, haloId, p0, p1, p2, p3 }) => {
  const DUR = 24;
  const HOLD = 4;
  const FADE = 14;
  if (frame < start || frame >= start + DUR + HOLD + FADE) return null; // tháo rốp hoàn toàn

  const e = interpolate(frame, [start, start + DUR], [0, 1], {
    easing: E.outCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const growing = frame < start + DUR;
  const fade = interpolate(frame, [start + DUR + HOLD, start + DUR + HOLD + FADE], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pts: Pt[] = [];
  const nDrawn = Math.max(2, Math.ceil(e * N) + 1);
  for (let i = 0; i < nDrawn; i++) {
    pts.push(bez(p0, p1, p2, p3, Math.min(i / N, e)));
  }
  const head = bez(p0, p1, p2, p3, e);
  pts[pts.length - 1] = head;
  const poly = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  const segs = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const tSeg = Math.min(i / N, e) / Math.max(e, 0.001);
    const grad = 0.12 + 0.88 * tSeg * tSeg;
    segs.push(
      <line
        key={i}
        x1={pts[i].x}
        y1={pts[i].y}
        x2={pts[i + 1].x}
        y2={pts[i + 1].y}
        stroke={C.greenLift}
        strokeWidth={5}
        strokeLinecap="round"
        strokeOpacity={grad * fade}
      />,
    );
  }

  return (
    <g>
      <polyline
        points={poly}
        fill="none"
        stroke={C.green}
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.2 * fade}
      />
      {segs}
      {growing && (
        <g>
          <circle cx={head.x} cy={head.y} r={36} fill={`url(#${haloId})`} />
          <circle cx={head.x} cy={head.y} r={8} fill="#ffffff" />
        </g>
      )}
    </g>
  );
};

const Station: React.FC<{
  frame: number;
  litAt: number;
  x: number;
  y: number;
  title: string;
  sub: string;
  step: string;
}> = ({ frame, litAt, x, y, title, sub, step }) => {
  const lit = interpolate(frame, [litAt, litAt + 8], [0, 1], {
    easing: E.outCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const op = 0.55 + 0.45 * lit;
  const pulse =
    frame < litAt
      ? 0
      : frame <= litAt + 6
        ? interpolate(frame, [litAt, litAt + 6], [0, 1], {
            easing: E.outCubic,
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        : interpolate(frame, [litAt + 6, litAt + 22], [1, 0.3], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

  const borderA = 0.18 + 0.82 * pulse;
  const glow = pulse > 0 ? `0 0 ${30 * pulse}px ${7 * pulse}px rgba(${C.greenRGB},${(0.28 * pulse).toFixed(3)})` : 'none';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: CARD_W,
        height: CARD_H,
        boxSizing: 'border-box',
        background: C.surface,
        border: `2px solid rgba(${C.greenRGB},${borderA.toFixed(3)})`,
        borderRadius: 16,
        boxShadow: glow,
        opacity: op,
        padding: '28px 34px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 14,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          fontSize: T.aux - 2,
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: `rgba(${C.greenRGB},${(0.55 + 0.45 * lit).toFixed(2)})`,
        }}
      >
        {step}
      </div>
      <div
        style={{
          fontSize: T.title,
          fontWeight: 800,
          color: C.text,
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: T.aux, fontWeight: 500, color: C.textDim }}>{sub}</div>
    </div>
  );
};

export const S3Relay: React.FC = () => {
  const frame = useCurrentFrame();
  const haloId = `relayHalo-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  const cA = center(STATIONS[0]);
  const cB = center(STATIONS[1]);
  const cC = center(STATIONS[2]);
  const L1 = { p0: cA, p1: { x: 800, y: 120 }, p2: { x: 1280, y: 180 }, p3: cB };
  const L2 = { p0: cB, p1: { x: 1700, y: 800 }, p2: { x: 1320, y: 1010 }, p3: cC };

  // Lời dẫn: vào sớm, mờ đi trước khi cảnh đứng yên (C1: không để đoạn phim câm)
  const capIn = seg(frame, 4, 22, E.outCubic);
  const capOut = 1 - seg(frame, 124, 140, E.outCubic);

  return (
    <AbsoluteFill style={{ background: C.bgDeep, overflow: 'hidden' }}>
      <AmbientOrbs frame={frame} orbs={ORBS} convergeFrom={95} convergeTo={120} carry={15} fadeInTo={18} />

      {STATIONS.map((s, i) => (
        <Station key={i} frame={frame} {...s} />
      ))}

      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <defs>
          <radialGradient id={haloId}>
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="55%" stopColor={`rgba(${C.greenRGB},0.28)`} />
            <stop offset="100%" stopColor={`rgba(${C.greenRGB},0)`} />
          </radialGradient>
        </defs>
        <Flyline frame={frame} start={18} haloId={haloId} {...L1} />
        <Flyline frame={frame} start={52} haloId={haloId} {...L2} />
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 68,
          width: 1920,
          textAlign: 'center',
          fontFamily: FONT,
          fontSize: T.caption,
          fontWeight: 600,
          color: C.text,
          opacity: capIn * capOut,
          transform: `translateY(${(1 - capIn) * 18}px)`,
        }}
      >
        Cuộc gọi đi, cả hệ thống chuyển động.
      </div>
    </AbsoluteFill>
  );
};
