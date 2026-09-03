// Template dọc 9:16 cho TikTok, Reels và Zalo: một tiêu đề lớn và tối đa bốn ý.
// Toàn bộ nội dung nạp từ props nên một file JSON dựng được cả loạt clip,
// không phải sửa mã cho từng bài.
import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { color, font, leading, tracking, weight } from '../brand/tokens';
import { FPS, progress, rise } from '../brand/motion';
import { SmartLine } from '../brand/SmartLine';

export type Tip = {
  title: string;
  detail?: string;
};

export type VetcTip9x16Props = {
  lockup: string;
  eyebrow: string;
  /** Tối đa ba dòng, mỗi dòng vào sau dòng trước 0,2 giây. */
  headline: string[];
  lead: string;
  /** Tối đa bốn ý, quá bốn thì tách thành clip khác cho dễ đọc. */
  tips: Tip[];
  note?: string;
  hotline: string;
  website: string;
  tagline: string;
};

export const vetcTip9x16DefaultProps: VetcTip9x16Props = {
  lockup: 'assets/logo/vetc-wordmark-white-alpha.png',
  eyebrow: 'Mẹo cho bác tài',
  headline: ['Qua trạm', 'một lần là trót lọt'],
  lead: 'Ba việc làm trước khi lăn bánh để không phải dừng lại ở làn ETC.',
  tips: [
    { title: 'Kiểm tra số dư trước chuyến đi', detail: 'Số dư đủ thì barie mở, không phải lùi ra làn hỗn hợp.' },
    { title: 'Dán thẻ đúng vị trí đã hướng dẫn', detail: 'Thẻ dán sai chỗ là đầu đọc không nhận.' },
    { title: 'Biển số trên xe khớp với tài khoản', detail: 'Đổi biển hay đổi xe thì cập nhật lại ngay.' },
  ],
  note: 'Cần hỗ trợ, bác tài gọi tổng đài 24/7.',
  hotline: '1900 6010',
  website: 'vetc.com.vn',
  tagline: 'Sống hiện đại - Lái văn minh',
};

const MARGIN = 64;

// Mốc thời gian của kịch bản, tính bằng giây. Nội dung dài ngắn khác nhau nên
// mốc phải tính từ props, dùng chung cho cả component và calculateMetadata.
export const tipTimeline = (props: VetcTip9x16Props) => {
  const headline = props.headline.map((_, i) => 0.7 + i * 0.2);
  const lead = (headline.at(-1) ?? 0.7) + 0.5;
  const wipe = lead + 0.4;
  const tips = props.tips.map((_, i) => wipe + 0.5 + i * 0.35);
  const note = (tips.at(-1) ?? wipe) + 0.5;
  const smartline = note + 0.4;
  const contact = smartline + 0.4;
  const hold = 2.2;
  const outro = contact + 0.4 + hold;

  return {
    lockup: 0.2,
    eyebrow: 0.5,
    headline,
    lead,
    wipe,
    tips,
    note,
    smartline,
    contact,
    outro,
    total: outro + 0.5,
  };
};

export const calculateVetcTip9x16Metadata = ({ props }: { props: VetcTip9x16Props }) => ({
  durationInFrames: Math.round(tipTimeline(props).total * FPS),
});

export const VetcTip9x16: React.FC<VetcTip9x16Props> = (props) => {
  const { lockup, eyebrow, headline, lead, tips, note, hotline, website, tagline } = props;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cue = tipTimeline(props);

  const wipe = progress(frame, fps, cue.wipe);
  const line = progress(frame, fps, cue.smartline);
  const contact = progress(frame, fps, cue.contact);
  const outro = progress(frame, fps, cue.outro, 0.5);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color.green,
        fontFamily: font.sans,
        display: 'flex',
        flexDirection: 'column',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Khối xanh: logo, eyebrow, headline, dẫn nhập */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          padding: MARGIN,
          boxSizing: 'border-box',
          color: color.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Img
          src={staticFile(lockup)}
          alt="VETC"
          style={{ height: 56, width: 'auto', display: 'block', ...rise(frame, fps, cue.lockup) }}
        />
        {/* Nhóm chữ nằm giữa phần xanh còn lại, không dính đáy cũng không dính logo */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: weight.semibold,
              textTransform: 'uppercase',
              letterSpacing: tracking.uppercase,
              color: 'rgba(255,255,255,.85)',
              ...rise(frame, fps, cue.eyebrow),
            }}
          >
            {eyebrow}
          </p>
          <h1
            style={{
              margin: '28px 0 0',
              fontSize: 96,
              lineHeight: leading.display,
              fontWeight: weight.extrabold,
              letterSpacing: '-.01em',
            }}
          >
            {headline.map((row, i) => (
              <span key={row} style={{ display: 'block', ...rise(frame, fps, cue.headline[i]) }}>
                {row}
              </span>
            ))}
          </h1>
          <p
            style={{
              margin: '36px 0 0',
              fontSize: 32,
              lineHeight: leading.body,
              fontWeight: weight.regular,
              color: 'rgba(255,255,255,.92)',
              ...rise(frame, fps, cue.lead),
            }}
          >
            {lead}
          </p>
        </div>
      </div>

      {/* Khối trắng: danh sách ý, mở ra bằng tấm xanh trượt xuống */}
      <div
        style={{
          position: 'relative',
          flex: 'none',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
          padding: `${MARGIN}px ${MARGIN}px ${MARGIN}px`,
          boxSizing: 'border-box',
          backgroundColor: color.white,
        }}
      >
        {tips.map((tip, i) => (
          <div
            key={tip.title}
            style={{ display: 'flex', gap: 28, alignItems: 'flex-start', ...rise(frame, fps, cue.tips[i]) }}
          >
            <span
              style={{
                flex: 'none',
                width: 56,
                height: 56,
                borderRadius: 4,
                backgroundColor: color.green,
                color: color.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: weight.bold,
              }}
            >
              {i + 1}
            </span>
            <div>
              <p style={{ margin: 0, fontSize: 32, lineHeight: leading.subhead, fontWeight: weight.bold, color: color.black }}>
                {tip.title}
              </p>
              {tip.detail ? (
                <p style={{ margin: '10px 0 0', fontSize: 24, lineHeight: leading.body, color: color.neutral500 }}>
                  {tip.detail}
                </p>
              ) : null}
            </div>
          </div>
        ))}

        {note ? (
          <p
            style={{
              margin: 0,
              paddingTop: 32,
              borderTop: `1px solid ${color.neutral300}`,
              fontSize: 24,
              lineHeight: leading.body,
              color: color.neutral500,
              ...rise(frame, fps, cue.note),
            }}
          >
            {note}
          </p>
        ) : null}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: color.green,
            zIndex: 2,
            transform: `translateY(${(wipe * 100).toFixed(2)}%)`,
          }}
        />
      </div>

      {/* Smart Line chạy trái sang phải, neo đáy bố cục */}
      <div style={{ height: 96, flex: 'none', overflow: 'hidden', backgroundColor: color.green }}>
        <SmartLine style={{ transform: `translateX(${(-100 + line * 100).toFixed(2)}%)` }} />
      </div>

      {/* Dải liên hệ */}
      <div
        style={{
          height: 96,
          flex: 'none',
          backgroundColor: color.green,
          color: color.white,
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${MARGIN}px`,
          boxSizing: 'border-box',
          fontSize: 24,
          fontWeight: weight.semibold,
          transform: `translateY(${((1 - contact) * 100).toFixed(2)}%)`,
        }}
      >
        <span>{hotline}</span>
        <span style={{ margin: '0 16px', color: 'rgba(255,255,255,.55)', fontWeight: weight.regular }}>/</span>
        <span>{website}</span>
        <span style={{ marginLeft: 'auto', fontWeight: weight.regular, color: 'rgba(255,255,255,.9)' }}>{tagline}</span>
      </div>

      {/* Khép cảnh về nền xanh để ghép vòng lặp liền mạch */}
      <AbsoluteFill style={{ backgroundColor: color.green, opacity: outro }} />
    </AbsoluteFill>
  );
};
