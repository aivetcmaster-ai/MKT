// S6 · services — thẻ typography/pill-slot-cycle.
// Giữ nguyên tham số đã tinh chỉnh của thẻ:
//   câu dẫn neo cứng ở lề trái (TUYỆT ĐỐI không flex-center, vì bề rộng pill
//   thay đổi sẽ kéo câu dẫn chạy — đây là cái hố thẻ đã ghi thành án);
//   mỗi nhịp 21f, 8f đầu đổi chỗ, 13f sau đứng yên cho người đọc kịp;
//   pill mới vào translateY 120 -> 0 + blur 14 -> 4 -> 0 (out-cubic);
//   pill cũ bay lên -130 + blur 0 -> 10 (in-cubic) — mới thì hãm lại, cũ thì
//   tăng tốc chạy, cảm giác "lật trang lên";
//   pill chiếm chỗ vô hình (visibility hidden) giữ bề rộng khe, khỏi giật;
//   nhịp kết: pill cuối bay lên 7f, câu kết từ dưới 90px với back(1.4) — lần
//   quá đà DUY NHẤT của cả cảnh, dành cho kết luận;
//   câu kết giữ yên >= 45f (45f cuối của cảnh 176f).
// Đổi so với demo: bản trường tối (pill nền tối, viền xanh), icon vẽ SVG thay
// cho ký tự placeholder; năm hạng mục có độ dài gần nhau theo yêu cầu của thẻ.
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT } from '../brand';
import { E } from '../motion';

const STEM = 'VETC có mặt để';
const STEM_FS = 88;
const PILL_FS = 56;

type IconKey = 'bolt' | 'tyre' | 'fuel' | 'wrench' | 'tow';

const PILLS: { label: string; icon: IconKey }[] = [
  { label: 'kích bình ắc quy', icon: 'bolt' },
  { label: 'thay lốp dự phòng', icon: 'tyre' },
  { label: 'tiếp nhiên liệu', icon: 'fuel' },
  { label: 'sửa chữa lưu động', icon: 'wrench' },
  { label: 'kéo xe về garage', icon: 'tow' },
];

const BEAT = 21;
const INTRO = 12;
const SWAP = 8;
const CYCLES = PILLS.length;

export const SERVICES_INTRO = INTRO;
export const SERVICES_BEAT = BEAT;
export const SERVICES_COUNT = CYCLES;
export const SERVICES_CYCLE_END = INTRO + CYCLES * BEAT; // 117

const Icon: React.FC<{ k: IconKey }> = ({ k }) => {
  const common = { fill: 'none', stroke: C.green, strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 24 24" width={34} height={34} aria-hidden>
      {k === 'bolt' && <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" {...common} />}
      {k === 'tyre' && (
        <>
          <circle cx="12" cy="12" r="9" {...common} />
          <circle cx="12" cy="12" r="3.4" {...common} />
        </>
      )}
      {k === 'fuel' && <path d="M7 21V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v16M4 21h13M14 9h2.5a2 2 0 0 1 2 2v5a1.8 1.8 0 0 0 3.5 0v-6l-2.4-3" {...common} />}
      {k === 'wrench' && <path d="M15.5 3.5a5 5 0 0 0-5 8.2L4 18.2V21h2.8l6.5-6.5a5 5 0 0 0 6-6.6l-2.8 2.8-2.4-2.4 2.8-2.8a5 5 0 0 0-1.4-.5Z" {...common} />}
      {k === 'tow' && <path d="M3 17h2m14 0h2M5 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0Zm10 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0ZM4 17V9h7l3 4h4M11 9V5h5l4 5" {...common} />}
    </svg>
  );
};

const Pill: React.FC<{ label: string; icon: IconKey; style?: React.CSSProperties }> = ({
  label,
  icon,
  style,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 18,
      padding: '14px 38px 14px 22px',
      borderRadius: 999,
      background: C.surfaceHi,
      border: `3px solid rgba(${C.greenRGB},0.75)`,
      boxShadow: `0 10px 34px rgba(0,0,0,0.45), inset 0 1px 0 rgba(${C.paleRGB},0.10)`,
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: PILL_FS,
      color: C.text,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    <span
      style={{
        width: 58,
        height: 58,
        borderRadius: 16,
        background: `rgba(${C.greenRGB},0.14)`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon k={icon} />
    </span>
    {label}
  </div>
);

export const S6Services: React.FC = () => {
  const frame = useCurrentFrame();

  const stemT = interpolate(frame, [0, INTRO], [0, 1], {
    extrapolateRight: 'clamp',
    easing: E.outCubic,
  });

  const cycleStart = INTRO;
  const cycleEnd = SERVICES_CYCLE_END;
  const rel = frame - cycleStart;
  const idx = Math.min(Math.floor(rel / BEAT), CYCLES - 1);
  const beatFrame = rel - idx * BEAT;

  const isFinale = frame >= cycleEnd;
  const finT = interpolate(frame, [cycleEnd, cycleEnd + 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => E.outBack(t, 1.4),
  });

  let slot: React.ReactNode = null;
  if (!isFinale && rel >= 0) {
    const incoming = PILLS[idx];
    const outgoing = idx > 0 ? PILLS[idx - 1] : null;

    const inT = interpolate(beatFrame, [0, SWAP], [0, 1], {
      extrapolateRight: 'clamp',
      easing: E.outCubic,
    });
    const inY = interpolate(inT, [0, 1], [120, 0]);
    const inBlur = interpolate(inT, [0, 0.7, 1], [14, 4, 0]);

    const outT = interpolate(beatFrame, [0, SWAP - 1], [0, 1], {
      extrapolateRight: 'clamp',
      easing: E.inCubic,
    });
    const outY = interpolate(outT, [0, 1], [0, -130]);

    slot = (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Pill label={incoming.label} icon={incoming.icon} style={{ visibility: 'hidden' }} />
        {outgoing && outT < 1 && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translateY(${outY}px)`,
              opacity: 1 - outT,
              filter: `blur(${outT * 10}px)`,
            }}
          >
            <Pill label={outgoing.label} icon={outgoing.icon} />
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translateY(${inY}px)`,
            opacity: idx === 0 ? inT : Math.min(1, inT * 1.6),
            filter: `blur(${inBlur}px)`,
          }}
        >
          <Pill label={incoming.label} icon={incoming.icon} />
        </div>
      </div>
    );
  } else if (isFinale) {
    const lastOutT = interpolate(frame, [cycleEnd, cycleEnd + 7], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: E.inCubic,
    });
    slot = (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: STEM_FS,
            color: C.green,
            letterSpacing: '-0.01em',
            display: 'inline-block',
            opacity: finT,
            transform: `translateY(${(1 - finT) * 90}px)`,
            filter: `blur(${(1 - finT) * 8}px)`,
            whiteSpace: 'nowrap',
          }}
        >
          bác lăn bánh tiếp.
        </span>
        {lastOutT < 1 && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: -10,
              transform: `translateY(${-130 * lastOutT}px)`,
              opacity: 1 - lastOutT,
              filter: `blur(${lastOutT * 10}px)`,
            }}
          >
            <Pill label={PILLS[CYCLES - 1].label} icon={PILLS[CYCLES - 1].icon} />
          </div>
        )}
      </div>
    );
  }

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(1200px 800px at 32% 50%, rgba(${C.greenRGB},0.07), transparent 68%)`,
        }}
      />
      {/* Câu dẫn neo cứng ở lề trái — không dùng flex center */}
      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 540,
          transform: `translateY(calc(-50% + ${(1 - stemT) * 50}px))`,
          display: 'flex',
          alignItems: 'center',
          gap: 34,
          opacity: stemT,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: STEM_FS,
            color: C.text,
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          {STEM}
        </span>
        {slot}
      </div>
    </AbsoluteFill>
  );
};
