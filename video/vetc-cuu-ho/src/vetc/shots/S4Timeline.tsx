// S4 · timeline — thẻ data/timeline-travel.
// Giữ nguyên tham số đã tinh chỉnh của thẻ:
//   biến tốc theo điểm gãy [0,0.15,0.88,1] -> [0,0.055,0.9,1] (chậm lên, giữa
//   gần như tăng tốc đều, 12% cuối phanh gấp) — chạy đều là "PPT rẻ tiền";
//   thẻ bật lên trước khi máy tới mốc 6f, spring damping 11 (quá đà rõ),
//   lấy đáy làm trục scaleY; phanh gấp xong đẩy gần 1 -> 1.28 trong 10f;
//   mốc phụ (điểm nhỏ) là vật tham chiếu tốc độ, xoá là mất cảm giác nhanh;
//   f0-12 đứng yên, từ f114 đứng yên thật 36f.
// Đổi so với demo: bốn thẻ xám thay bằng bốn mốc quy trình cứu hộ có chữ đọc
// được (thẻ dặn "mỗi thẻ bật lên là một ô thông tin, tốc độ quét phải đảm bảo
// ít nhất hai thẻ cuối đọc được").
import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame } from 'remotion';
import { C, FONT, T } from '../brand';
import { E, seg } from '../motion';

const W = 1920;
const AXIS_Y = 720;
const TICK_GAP = 1400;

const TICKS = [
  { label: 'TIẾP NHẬN', x: 960, line1: 'Tổng đài', line2: 'nhận cuộc gọi' },
  { label: 'ĐỊNH VỊ', x: 960 + TICK_GAP, line1: 'Xác định vị trí', line2: 'xe gặp sự cố' },
  { label: 'ĐIỀU ĐỘI', x: 960 + TICK_GAP * 2, line1: 'Gọi đội cứu hộ', line2: 'gần bác nhất' },
  { label: 'CÓ MẶT', x: 960 + TICK_GAP * 3, line1: 'Kỹ thuật viên tới,', line2: 'xử lý tại chỗ' },
];
const WORLD_W = 960 + TICK_GAP * 3 + 960;

const TRAVEL_START = 12;
const TRAVEL_END = 98;
const ZOOM_END = 108;

const CARD_W = 640;
const CARD_H = 280;

const camXAt = (f: number): number => {
  const total = TICKS[3].x - 960;
  const t = interpolate(f, [TRAVEL_START, TRAVEL_END], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const eased = interpolate(t, [0, 0.15, 0.88, 1], [0, 0.055, 0.9, 1], {
    easing: Easing.inOut(Easing.quad),
  });
  return eased * total;
};

/** Khung bật thẻ: tra ngược camXAt để biết máy quét qua mốc ở khung nào. */
const popFrameOf = (tickX: number): number => {
  for (let f = TRAVEL_START; f <= TRAVEL_END; f++) {
    if (camXAt(f) >= tickX - 960) return f;
  }
  return TRAVEL_END;
};

export const TIMELINE_POP_FRAMES = TICKS.map((t) => popFrameOf(t.x) - 6);
export const TIMELINE_BRAKE_FRAME = TRAVEL_END;

const TickStop: React.FC<{ i: number; frame: number }> = ({ i, frame }) => {
  const tick = TICKS[i];
  const isLast = i === TICKS.length - 1;
  const pop = TIMELINE_POP_FRAMES[i];
  const s = spring({
    frame: frame - pop,
    fps: 30,
    config: { damping: 11, stiffness: 160, mass: 0.9 },
    durationInFrames: 26,
  });
  const appeared = frame >= pop;
  const accent = isLast ? C.green : C.pale;

  return (
    <div style={{ position: 'absolute', left: tick.x, top: 0 }}>
      <div
        style={{
          position: 'absolute',
          left: -3,
          top: AXIS_Y - 30,
          width: 6,
          height: 60,
          background: accent,
          borderRadius: 3,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -160,
          top: AXIS_Y + 52,
          width: 320,
          textAlign: 'center',
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: T.label,
          letterSpacing: '0.16em',
          color: accent,
        }}
      >
        {tick.label}
      </div>
      {appeared && (
        <div
          style={{
            position: 'absolute',
            left: -CARD_W / 2,
            top: AXIS_Y - 40 - CARD_H,
            transform: `scaleY(${s}) scaleX(${0.6 + 0.4 * s})`,
            transformOrigin: '50% 100%',
            opacity: Math.min(1, s * 2),
          }}
        >
          <div
            style={{
              width: CARD_W,
              height: CARD_H,
              boxSizing: 'border-box',
              background: C.surface,
              border: `2px solid ${isLast ? C.green : C.line}`,
              borderRadius: 18,
              padding: '34px 38px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 10,
              fontFamily: FONT,
            }}
          >
            <div
              style={{
                fontSize: T.aux - 2,
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: isLast ? C.green : C.textFaint,
                marginBottom: 8,
              }}
            >
              {`BƯỚC ${i + 1}`}
            </div>
            <div style={{ fontSize: T.title, fontWeight: 700, color: C.text, lineHeight: 1.28 }}>
              {tick.line1}
              <br />
              {tick.line2}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const S4Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const camX = camXAt(frame);

  const zoom = interpolate(frame, [TRAVEL_END, ZOOM_END], [1, 1.28], {
    easing: E.outCubic,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const capIn = seg(frame, 0, 14, E.outCubic);
  const capOut = 1 - seg(frame, TRAVEL_END - 14, TRAVEL_END, E.outCubic);

  return (
    <AbsoluteFill style={{ background: C.bg, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(1400px 900px at 50% 58%, rgba(${C.greenRGB},0.08), transparent 70%)`,
        }}
      />
      <div style={{ width: W, height: 1080, transform: `scale(${zoom})`, transformOrigin: '50% 62%' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: WORLD_W,
            height: 1080,
            transform: `translateX(${-camX}px)`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 200,
              top: AXIS_Y - 3,
              width: WORLD_W - 400,
              height: 6,
              background: C.line,
              borderRadius: 3,
            }}
          />
          {Array.from({ length: 22 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 960 + i * (TICK_GAP / 5) - 2,
                top: AXIS_Y - 13,
                width: 4,
                height: 26,
                background: C.line,
                borderRadius: 2,
              }}
            />
          ))}
          {TICKS.map((_, i) => (
            <TickStop key={i} i={i} frame={frame} />
          ))}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 96,
          width: 1920,
          textAlign: 'center',
          fontFamily: FONT,
          fontSize: T.caption,
          fontWeight: 600,
          color: C.text,
          opacity: capIn * capOut,
          transform: `translateY(${(1 - capIn) * 16}px)`,
        }}
      >
        Từ cuộc gọi tới lúc bác lăn bánh.
      </div>
    </AbsoluteFill>
  );
};
