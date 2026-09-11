// S2 / S5 · chữ nhịp thở — thẻ typography/paper-title-card, BẢN TRƯỜNG TỐI.
// Thẻ ghi rõ hai bản cùng một công thức: bản nền sáng dùng scale 1.28 -> 1,
// bản trường tối dùng dịch lên 40px + blur 10 (ghi trong bảng tham số của thẻ).
// Phim này là trường tối nên chạy bản tối, giữ nguyên phần còn lại:
//   từng từ vào lệch pha delay = 4 + i*4, mỗi từ 9f, bezier(0.2,0.75,0.3,1);
//   mỗi câu đúng MỘT từ nhấn (in nghiêng + màu nhấn);
//   gạch chân màu nhấn scaleX 0 -> 1 ở f16-34 (tín hiệu sắp hết thẻ);
//   8f cuối cả thẻ mờ đi để chuyển cảnh; toàn bộ thẻ 54f (~1.8s).
// Chữ dùng Be Vietnam Pro theo quy chuẩn nhận diện, không dùng serif như demo.
import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT, T } from '../brand';

export type Word = { text: string; accent?: boolean };

export const TITLE_CARD_DURATION = 54;

export const TitleCard: React.FC<{ words: Word[]; sub: string }> = ({ words, sub }) => {
  const frame = useCurrentFrame();
  const duration = TITLE_CARD_DURATION;

  const fadeOut = interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const underline = interpolate(frame, [16, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });
  const subT = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
        backgroundImage: `radial-gradient(1100px 750px at 50% 44%, rgba(${C.greenRGB},0.10), transparent 66%)`,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 1560 }}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1.18,
            color: C.text,
            letterSpacing: '-0.012em',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: '0.26em',
          }}
        >
          {words.map((w, i) => {
            const delay = 4 + i * 4;
            const t = interpolate(frame, [delay, delay + 9], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.75, 0.3, 1),
            });
            return (
              <span
                key={i}
                style={{
                  opacity: t,
                  transform: `translateY(${(1 - t) * 40}px)`,
                  filter: `blur(${(1 - t) * 10}px)`,
                  display: 'inline-block',
                  fontStyle: w.accent ? 'italic' : 'normal',
                  color: w.accent ? C.amber : undefined,
                }}
              >
                {w.text}
              </span>
            );
          })}
        </div>
        <div
          style={{
            height: 6,
            width: 220,
            margin: '42px auto 0',
            borderRadius: 3,
            background: C.amber,
            transform: `scaleX(${underline})`,
          }}
        />
        <div
          style={{
            fontFamily: FONT,
            fontSize: T.aux,
            fontWeight: 600,
            letterSpacing: '0.22em',
            color: C.textDim,
            marginTop: 36,
            opacity: subT,
          }}
        >
          {sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const S2TitleNight: React.FC = () => (
  <TitleCard
    // Ba khối chữ: từ nhấn vào ở khối cuối, chốt ở f21 nên câu đủ nghĩa được
    // đọc trọn 25f trước khi thẻ mờ đi (thẻ chỉ dài 54f, chia nhỏ hơn là hụt).
    words={[{ text: '2 giờ sáng.' }, { text: 'Xe' }, { text: 'không nổ máy.', accent: true }]}
    sub="MỘT CUỘC GỌI LÀ ĐỦ"
  />
);

export const S5TitleOnsite: React.FC = () => (
  <TitleCard
    words={[{ text: 'Xử lý' }, { text: 'ngay tại chỗ.', accent: true }]}
    sub="KHÔNG PHẢI ĐỢI ĐẾN SÁNG"
  />
);
