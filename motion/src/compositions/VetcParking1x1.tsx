// Motion graphic VETC Parking, khổ vuông 1080x1080 cho social.
// Chuyển từ posters/vetc-parking/motion-1x1.html sang Remotion, giữ nguyên
// kịch bản, nhịp và bố cục để hai bản ra hình giống nhau.
import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { color, font, layoutMargin, leading, tracking, weight } from '../brand/tokens';
import { progress, rise } from '../brand/motion';
import { SmartLine } from '../brand/SmartLine';

export type Step = {
  icon: string;
  label: string;
  title: string;
};

export type VetcParking1x1Props = {
  lockup: string;
  eyebrow: string;
  headline: [string, string];
  lead: string;
  steps: [Step, Step, Step];
  note: string;
  hotline: string;
  website: string;
  tagline: string;
};

export const vetcParking1x1DefaultProps: VetcParking1x1Props = {
  lockup: 'assets/logo/sub-parking-white.png',
  eyebrow: 'Gửi xe không tiền mặt',
  headline: ['Lấy xe là đi,', 'không dừng trả tiền'],
  lead: 'Bật tự động thanh toán phí gửi xe trên ứng dụng VETC. Barie mở, xe lăn bánh, phí trừ thẳng vào tài khoản giao thông.',
  steps: [
    { icon: 'assets/icons/wallet.png', label: 'Bước 1', title: 'Bật tự động thanh toán' },
    { icon: 'assets/icons/parking.png', label: 'Bước 2', title: 'Vào bãi liên kết' },
    { icon: 'assets/icons/check-circle.png', label: 'Bước 3', title: 'Lấy xe và đi' },
  ],
  note: 'Vui lòng duy trì số dư đủ trong tài khoản giao thông để giao dịch thành công.',
  hotline: '1900 6010',
  website: 'vetc.com.vn',
  tagline: 'Sống hiện đại - Lái văn minh',
};

// Mốc thời gian của kịch bản, tính bằng giây.
const CUE = {
  lockup: 0.2,
  eyebrow: 0.6,
  headline1: 0.8,
  headline2: 1.0,
  lead: 1.5,
  wipe: 2.1,
  step1: 2.6,
  step2: 2.8,
  step3: 3.0,
  note: 3.5,
  smartline: 3.9,
  contact: 4.3,
  outro: 7.4,
} as const;

export const VetcParking1x1: React.FC<VetcParking1x1Props> = ({
  lockup,
  eyebrow,
  headline,
  lead,
  steps,
  note,
  hotline,
  website,
  tagline,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wipe = progress(frame, fps, CUE.wipe);
  const line = progress(frame, fps, CUE.smartline);
  const contact = progress(frame, fps, CUE.contact);
  const outro = progress(frame, fps, CUE.outro, 0.5);
  const stepCues = [CUE.step1, CUE.step2, CUE.step3];

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
          flex: 'none',
          padding: layoutMargin,
          boxSizing: 'border-box',
          color: color.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Img
          src={staticFile(lockup)}
          alt="VETC Parking"
          style={{ height: 64, width: 'auto', display: 'block', ...rise(frame, fps, CUE.lockup) }}
        />
        <p
          style={{
            margin: '44px 0 0',
            fontSize: 20,
            fontWeight: weight.semibold,
            textTransform: 'uppercase',
            letterSpacing: tracking.uppercase,
            color: 'rgba(255,255,255,.85)',
            ...rise(frame, fps, CUE.eyebrow),
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            margin: '24px 0 0',
            fontSize: 88,
            lineHeight: leading.display,
            fontWeight: weight.extrabold,
            letterSpacing: '-.01em',
          }}
        >
          <span style={{ display: 'block', ...rise(frame, fps, CUE.headline1) }}>{headline[0]}</span>
          <span style={{ display: 'block', ...rise(frame, fps, CUE.headline2) }}>{headline[1]}</span>
        </h1>
        <p
          style={{
            margin: '32px 0 0',
            fontSize: 28,
            lineHeight: leading.body,
            fontWeight: weight.regular,
            color: 'rgba(255,255,255,.92)',
            maxWidth: 840,
            ...rise(frame, fps, CUE.lead),
          }}
        >
          {lead}
        </p>
      </div>

      {/* Khối trắng: ba bước và chú thích, mở ra bằng tấm xanh trượt xuống */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: color.white,
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: 0,
            boxSizing: 'border-box',
            padding: `0 ${layoutMargin}px`,
            display: 'flex',
            alignItems: 'center',
            gap: 36,
          }}
        >
          {steps.map((step, i) => (
            <div key={step.label} style={{ flex: 1, ...rise(frame, fps, stepCues[i]) }}>
              <Img src={staticFile(step.icon)} alt="" style={{ width: 72, height: 72, display: 'block' }} />
              <p
                style={{
                  margin: '24px 0 0',
                  fontSize: 20,
                  fontWeight: weight.bold,
                  letterSpacing: tracking.uppercase,
                  textTransform: 'uppercase',
                  color: color.greenPlus2,
                }}
              >
                {step.label}
              </p>
              <p
                style={{
                  margin: '10px 0 0',
                  fontSize: 28,
                  lineHeight: leading.subhead,
                  fontWeight: weight.bold,
                  color: color.black,
                }}
              >
                {step.title}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            margin: `0 ${layoutMargin}px`,
            flex: 'none',
            height: 76,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            borderTop: `1px solid ${color.neutral300}`,
            fontSize: 20,
            lineHeight: 1.35,
            color: color.neutral500,
            ...rise(frame, fps, CUE.note),
          }}
        >
          {note}
        </p>

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
      <div style={{ height: 80, flex: 'none', overflow: 'hidden', backgroundColor: color.green }}>
        <SmartLine style={{ transform: `translateX(${(-100 + line * 100).toFixed(2)}%)` }} />
      </div>

      {/* Dải liên hệ */}
      <div
        style={{
          height: 80,
          flex: 'none',
          backgroundColor: color.green,
          color: color.white,
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${layoutMargin}px`,
          boxSizing: 'border-box',
          fontSize: 20,
          fontWeight: weight.semibold,
          transform: `translateY(${((1 - contact) * 100).toFixed(2)}%)`,
        }}
      >
        <span>{hotline}</span>
        <span style={{ margin: '0 16px', color: 'rgba(255,255,255,.55)', fontWeight: weight.regular }}>/</span>
        <span>{website}</span>
        <span style={{ marginLeft: 'auto', fontWeight: weight.regular, color: 'rgba(255,255,255,.9)' }}>
          {tagline}
        </span>
      </div>

      {/* Khép cảnh về nền xanh để ghép vòng lặp liền mạch */}
      <AbsoluteFill style={{ backgroundColor: color.green, opacity: outro }} />
    </AbsoluteFill>
  );
};
