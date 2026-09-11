// S7 · hotline — thẻ data/odometer-digit-roll.
// Giữ nguyên tham số đã tinh chỉnh của thẻ:
//   mỗi con số là một dải 0-9 trong hộp overflow:hidden, posAt là hàm thuần
//   của khung (nên render tái lập được); vị trí i bắt đầu hãm ở 20 + i*7f,
//   hãm 16f bằng out-cubic tới đích + nửa dòng (QUÁ ĐÀ nửa ô), rồi 6f bật về
//   số nguyên — khung bật về chính là tiếng "cạch" của con số đó;
//   lúc đang cuộn mỗi số chồng 2 bản bóng mờ lệch khung (0.25 / 0.12), mở theo
//   cổng tốc độ, dừng là tháo; fontVariantNumeric: tabular-nums để không giật;
//   khoá hết ở f63 -> nhịp đậm 8f + phóng nhẹ 1.035; nhãn vào f66-84;
//   từ f84 đứng yên thật (56f, thẻ yêu cầu >= 45f).
// Tuân thủ hố của thẻ "số con số <= 6": tổng đài 1900 6010 có 8 chữ số, nên
// cụm đầu "1900" đứng yên (vào bằng mờ dần), chỉ 4 số sau cuộn thật.
// Số cuộn đúng bằng các chữ số thật của giá trị cuối (6-0-1-0), không chạy số giả.
import React from 'react';
import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame } from 'remotion';
import { C, FONT, T } from '../brand';
import { E, seg } from '../motion';

const ROW = 210;
const DW = 124;
const FS = 184;
const SPIN = 0.85;
const DIGITS = [6, 0, 1, 0]; // bốn số sau của 1900 6010

export const HOTLINE_LOCK_FRAMES = DIGITS.map((_, i) => 20 + i * 7 + 22); // 42,49,56,63
export const HOTLINE_CONFIRM_FRAME = 63;

const posAt = (f: number, i: number): number => {
  const d = DIGITS[i];
  const s = 20 + i * 7;
  const p0 = SPIN * s;
  const target = Math.ceil((p0 + 6 - d) / 10) * 10 + d;
  if (f < s) return SPIN * Math.max(f, 0);
  if (f < s + 16)
    return interpolate(f, [s, s + 16], [p0, target + 0.5], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: E.outCubic,
    });
  if (f < s + 22)
    return interpolate(f, [s + 16, s + 22], [target + 0.5, target], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: E.outCubic,
    });
  return target;
};

const Strip: React.FC<{ pos: number; color: string; opacity?: number; dy?: number }> = ({
  pos,
  color,
  opacity = 1,
  dy = 0,
}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: DW,
      transform: `translateY(${-(pos % 10) * ROW + dy}px)`,
      opacity,
    }}
  >
    {Array.from({ length: 20 }).map((_, k) => (
      <div
        key={k}
        style={{
          width: DW,
          height: ROW,
          lineHeight: `${ROW}px`,
          textAlign: 'center',
          fontSize: FS,
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
          color,
        }}
      >
        {k % 10}
      </div>
    ))}
  </div>
);

const DigitReel: React.FC<{ frame: number; i: number; color: string }> = ({ frame, i, color }) => {
  const pos = posAt(frame, i);
  const speed = Math.abs(pos - posAt(frame - 1, i));
  const gate = interpolate(speed, [0.06, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div style={{ position: 'relative', width: DW, height: ROW, overflow: 'hidden' }}>
      {gate > 0.001 && (
        <>
          <Strip pos={pos} color={color} opacity={0.25 * gate} dy={ROW * 0.5} />
          <Strip pos={pos} color={color} opacity={0.12 * gate} dy={-ROW * 0.5} />
        </>
      )}
      <Strip pos={pos} color={color} />
    </div>
  );
};

const StaticGlyph: React.FC<{ ch: string; color: string; w?: number; opacity?: number }> = ({
  ch,
  color,
  w,
  opacity = 1,
}) => (
  <div
    style={{
      width: w,
      height: ROW,
      lineHeight: `${ROW}px`,
      textAlign: 'center',
      fontSize: FS,
      fontWeight: 800,
      fontVariantNumeric: 'tabular-nums',
      color,
      opacity,
    }}
  >
    {ch}
  </div>
);

export const S7Hotline: React.FC = () => {
  const frame = useCurrentFrame();

  // Nhịp xác nhận: trên trường tối thì đổi chiều so với demo — sáng bật lên rồi
  // trở về, thay vì đậm dần (đậm trên nền tối là không thấy gì).
  const inkNow = interpolateColors(frame, [63, 67, 71], [C.green, C.greenLift, C.green]);
  const pulseScale = interpolate(frame, [63, 67, 71], [1, 1.035, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: E.inOutQuad,
  });
  const labelOp = interpolate(frame, [66, 84], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: E.outQuad,
  });
  const prefixOp = seg(frame, 4, 18, E.outCubic);
  const capIn = seg(frame, 0, 14, E.outCubic);

  return (
    <AbsoluteFill style={{ background: C.bg, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(1300px 800px at 50% 46%, rgba(${C.greenRGB},0.10), transparent 68%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 170,
          width: 1920,
          textAlign: 'center',
          fontFamily: FONT,
          fontSize: T.caption,
          fontWeight: 600,
          color: C.text,
          opacity: capIn,
          transform: `translateY(${(1 - capIn) * 16}px)`,
        }}
      >
        Bác tài chỉ cần nhớ một số.
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 380,
          width: 1920,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          fontFamily: FONT,
          transform: `scale(${pulseScale})`,
          transformOrigin: '960px 105px',
        }}
      >
        <StaticGlyph ch="1" color={inkNow} w={DW} opacity={prefixOp} />
        <StaticGlyph ch="9" color={inkNow} w={DW} opacity={prefixOp} />
        <StaticGlyph ch="0" color={inkNow} w={DW} opacity={prefixOp} />
        <StaticGlyph ch="0" color={inkNow} w={DW} opacity={prefixOp} />
        <StaticGlyph ch=" " color={inkNow} w={54} />
        <DigitReel frame={frame} i={0} color={inkNow} />
        <DigitReel frame={frame} i={1} color={inkNow} />
        <DigitReel frame={frame} i={2} color={inkNow} />
        <DigitReel frame={frame} i={3} color={inkNow} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 660,
          width: 1920,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 26,
          opacity: labelOp,
          fontFamily: FONT,
        }}
      >
        <div style={{ width: 520, height: 4, background: `rgba(${C.greenRGB},0.45)`, borderRadius: 2 }} />
        <div style={{ fontSize: T.title, fontWeight: 700, color: C.text, letterSpacing: '0.04em' }}>
          Nhánh 1 · Cứu hộ đường bộ
        </div>
        <div style={{ fontSize: T.aux, fontWeight: 600, color: C.textDim, letterSpacing: '0.2em' }}>
          TRỰC 24/7 · TOÀN QUỐC
        </div>
      </div>
    </AbsoluteFill>
  );
};
