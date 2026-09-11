// S8 · outro — thẻ outro/logo-shrink-wordmark-lockup.
// Giữ nguyên tham số đã tinh chỉnh của thẻ (toạ độ thiết kế 480x270):
//   thu về scale 5.4 -> 1 ở t 0.02-0.28 (inOutCubic), chồng phanh quá đà
//   sin(pi)*0.06 ở t 0.26-0.37 — bỏ là đọc thành "đóng băng cứng";
//   vá khuyết + đổi màu cùng đường với lúc thu (t 0.10-0.28),落位 là đã sạch;
//   t 0.34-0.47 dấu hiệu dịch trái nhường chỗ, nối gần như liền với chữ đầu (0.46);
//   chữ vào lệch pha 0.035/chữ, mỗi chữ 0.10, out-cubic, translateX 8 -> 0;
//   tagline màu nhấn vào cả dòng ở t 0.72-0.84, KHÔNG vào từng chữ (tagline là
//   chú thích, thấp hơn chữ chính một bậc).
// Đổi so với demo:
//   - chữ chính 4 ký tự (VETC) thay vì 5, nên dịch trái đổi sang -62 và vị trí
//     hàng chữ đổi theo, cả khối bù 15px cho cân giữa (thẻ dặn hai chỗ này khớp nhau);
//   - dấu hiệu là vòng cung hình học TRỪU TƯỢNG, KHÔNG phải logo VETC thật —
//     xem DESIGN-SPEC.md, phải thay bằng file logo chính thức trước khi phát hành;
//   - thêm một dòng mờ dưới tagline cho định vị thương hiệu (vào sau tagline).
// Thời lượng: hoạt cảnh chạy đúng 132f đã tinh chỉnh, 43f cuối đứng yên thật
// (R1: chữ thương hiệu phải giữ tròn 1 giây).
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { C, FONT } from '../brand';
import { DesignStage, E, lerp, seg } from '../motion';

export const OUTRO_ANIM_FRAMES = 132;

const WORDMARK = 'VETC';
const ICON = 30;
const SHIFT = -62;
const BLOCK_NUDGE = 11; // bù cho lockup cân giữa khi chữ chính còn 4 ký tự

const arcPath = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${large} 1 ${x1.toFixed(2)},${y1.toFixed(2)}`;
};

const Arcs: React.FC<{
  a0: number;
  a1: number;
  col: string;
  w: number;
  blur: number;
  opacity: number;
}> = ({ a0, a1, col, w, blur, opacity }) => (
  <g opacity={opacity}>
    {[
      [a0, a1],
      [a0 + 180, a1 + 180],
    ].map(([b0, b1], i) => (
      <path
        key={i}
        d={arcPath(15, 15, 10.5, b0, b1)}
        fill="none"
        stroke={col}
        strokeWidth={w}
        strokeLinecap="round"
        style={blur ? { filter: `blur(${blur}px)` } : undefined}
      />
    ))}
  </g>
);

export const S8Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const t = Math.min(1, frame / (OUTRO_ANIM_FRAMES - 1));

  const k = seg(t, 0.02, 0.28, E.inOutCubic);
  const brake = Math.sin(seg(t, 0.26, 0.37) * Math.PI) * 0.06;
  const s = lerp(k, 5.4, 1) * (1 + brake);
  const shift = seg(t, 0.34, 0.47, E.inOutCubic) * SHIFT;
  const heal = seg(t, 0.1, 0.28, E.inOutQuad);

  return (
    <DesignStage bg={C.bgDeep}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(260px 180px at 50% 50%, rgba(${C.greenRGB},0.14), transparent 70%)`,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${BLOCK_NUDGE}px)` }}>
          {/* Dấu hiệu: vòng cung trừu tượng (chỗ giữ cho logo chính thức) */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: ICON,
              height: ICON,
              margin: `${-ICON / 2}px 0 0 ${-ICON / 2}px`,
              transform: `translateX(${shift}px) scale(${s})`,
            }}
          >
            <svg
              viewBox="0 0 30 30"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
            >
              <Arcs a0={-32} a1={122} col={`rgba(${C.greenRGB},0.55)`} w={6.5} blur={2.5} opacity={1 - heal} />
              <Arcs a0={-32} a1={122} col={heal > 0.5 ? C.pale : C.greenLift} w={3.4} blur={0} opacity={1 - heal * 0.75} />
              <circle cx={15} cy={15} r={10.5} fill="none" stroke={C.green} strokeWidth={5.5} opacity={heal} />
            </svg>
          </div>
          {/* Chữ chính */}
          <div
            style={{
              position: 'absolute',
              left: 'calc(50% - 33px)',
              top: '50%',
              height: ICON,
              marginTop: -ICON / 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {[...WORDMARK].map((ch, i) => {
              const lk = seg(t, 0.46 + i * 0.035, 0.46 + i * 0.035 + 0.1, E.outCubic);
              return (
                <span
                  key={i}
                  style={{
                    color: C.pale,
                    fontFamily: FONT,
                    fontWeight: 800,
                    fontSize: 27,
                    lineHeight: 1,
                    letterSpacing: 2,
                    opacity: lk,
                    transform: `translateX(${lerp(lk, 8, 0)}px)`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </div>
        </div>
        {/* Tagline màu nhấn — vào cả dòng, không vào từng chữ */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 'calc(50% + 34px)',
            textAlign: 'center',
            color: C.green,
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 13,
            lineHeight: 1,
            letterSpacing: 2.5,
            opacity: seg(t, 0.72, 0.84, E.outQuad),
          }}
        >
          SỐNG HIỆN ĐẠI - LÁI VĂN MINH
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 'calc(50% + 56px)',
            textAlign: 'center',
            color: C.textDim,
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 11,
            lineHeight: 1,
            letterSpacing: 0.4,
            opacity: seg(t, 0.86, 0.95, E.outQuad),
          }}
        >
          Người Đồng Hành của tài xế Việt Nam
        </div>
      </div>
    </DesignStage>
  );
};
