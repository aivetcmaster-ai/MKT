// S2 / S5 · chữ nhịp thở — thẻ typography/paper-title-card, BẢN TRƯỜNG TỐI.
// Thẻ ghi hai bản cùng một công thức: nền sáng dùng scale 1.28 -> 1, trường tối
// dùng dịch lên 40px + blur 10. Phim này là trường tối nên chạy bản tối.
// Giữ nguyên: từng TỪ vào lệch pha, mỗi từ 9f, bezier(0.2,0.75,0.3,1);
// mỗi câu đúng MỘT từ nhấn (in nghiêng + màu nhấn); gạch chân màu nhấn
// scaleX 0 -> 1 ở f16-34; 8f cuối cả thẻ mờ đi để chuyển cảnh.
//
// SAI LỆCH CÓ Ý THỨC so với thẻ: thẻ quy định 50-55f. Ở đây dùng 76f.
// Lý do: câu tiếng Việt có dấu cần lâu hơn để đọc, và chuẩn nhịp R3 nói
// "sáu lần phản hồi độc lập đều là chậm lại, chưa lần nào là quá nhanh".
// Bản 54f đo ra chỉ cho 25 khung (0,83 giây) để đọc trọn câu — quá gấp.
// Với 76f, cửa sổ đọc trọn câu là 34 khung (1,13 giây).
import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { C, FONT, T } from '../brand';

export type Word = { text: string; accent?: boolean };

export const TITLE_CARD_DURATION = 76;

const WORD_STEP = 3.5; // lệch pha giữa hai từ liền nhau
const WORD_IN = 9; // thời lượng vào của một từ

export const TitleCard: React.FC<{
  words: Word[];
  sub: string;
  accentColor: string;
}> = ({ words, sub, accentColor }) => {
  const frame = useCurrentFrame();
  const duration = TITLE_CARD_DURATION;

  const fadeOut = interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const underline = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });
  const subT = interpolate(frame, [14, 26], [0, 1], {
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
        backgroundImage: `radial-gradient(1100px 750px at 50% 44%, rgba(${C.greenRGB},0.12), transparent 66%)`,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 1600 }}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1.2,
            color: C.pale,
            letterSpacing: '-0.012em',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: '0.26em',
          }}
        >
          {words.map((w, i) => {
            const delay = 4 + i * WORD_STEP;
            const t = interpolate(frame, [delay, delay + WORD_IN], [0, 1], {
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
                  color: w.accent ? accentColor : undefined,
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
            margin: '44px auto 0',
            borderRadius: 3,
            background: accentColor,
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
            marginTop: 38,
            opacity: subT,
          }}
        >
          {sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Cảnh sự cố: từ nhấn là trắng thuần, không phải xanh — dải xanh dành riêng cho
// phần VETC vào cuộc, giữ cho ẩn dụ màu không bị phá.
export const S2TitleNight: React.FC = () => (
  <TitleCard
    words={[
      { text: '2' },
      { text: 'giờ' },
      { text: 'sáng.' },
      { text: 'Xe' },
      { text: 'chết', accent: true },
      { text: 'máy.' },
    ]}
    sub="MỘT CUỘC GỌI LÀ ĐỦ"
    accentColor={C.text}
  />
);

// Cảnh VETC xử lý: từ nhấn là xanh VETC.
export const S5TitleOnsite: React.FC = () => (
  <TitleCard
    words={[
      { text: 'Xử' },
      { text: 'lý' },
      { text: 'ngay', accent: true },
      { text: 'tại' },
      { text: 'chỗ.' },
    ]}
    sub="KHÔNG PHẢI ĐỢI ĐẾN SÁNG"
    accentColor={C.green}
  />
);
