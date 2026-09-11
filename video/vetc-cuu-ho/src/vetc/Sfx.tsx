// BẢNG GHIM ÂM THANH — một file duy nhất, mỗi dòng có chú thích động tác tương ứng (S2).
// Ba nguyên tắc bắt buộc của references/sound-design.md:
//  1. Ghim TƯƠNG ĐỐI theo SHOTS.<tên>.from + offset, không bao giờ viết số khung trần (4.5).
//  2. from = khung đỉnh mong muốn − độ trễ đỉnh của file nguồn − độ lệch âm của
//     đường render (4.6 / S5). Hai lượng này trừ trong biểu thức tính from, không
//     sửa tay từng dòng.
//  3. Mẫu dài hơn 5s phải cho durationInFrames, nếu không tiếng sẽ kéo quá động tác (4.1 / S4).
// Mức âm: volume là HỆ SỐ NHÂN, không phải âm lượng đích, nên phải biết đỉnh thật
// của từng file. Bài học của vòng này: đo đỉnh trên bản giải mã 8kHz cho kết quả
// SAI với các mẫu sáng (lọc mất dải cao) — sparkle-touch đo ra -15.6dB ở 8kHz
// nhưng thật ra là -5.2dB. Phải đo ở đúng 48kHz (tools/peaks.py). Sau khi đo lại,
// không file nào trong bộ này dưới -12dB nên toàn bộ volume nằm trong khoảng
// thường dùng 0.2-0.6, không cần hệ số lớn hơn 1.
import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { SHOTS } from './shots';
import { TIMELINE_POP_FRAMES, TIMELINE_BRAKE_FRAME } from './shots/S4Timeline';
import { SERVICES_BEAT, SERVICES_CYCLE_END, SERVICES_INTRO } from './shots/S6Services';
import { HOTLINE_CONFIRM_FRAME, HOTLINE_LOCK_FRAMES } from './shots/S7Hotline';

/**
 * Độ lệch của cả dải âm so với hình ở đầu ra (AAC encoder priming).
 * Đường render của dự án này: Remotion 4.0.484 + AAC 48kHz + mp4, đo ngày
 * 2026-09-11 bằng tools/audio-offset.py trên chính bản render: ba mũi dò
 * (phanh gấp f469, số khoá đầu f787, cú đáp outro f926) đều lệch trong vòng
 * ±1 khung => bù 1.28f là đúng cho đường render này.
 * Đổi bất kỳ thứ nào trong bốn yếu tố (bản Remotion / codec / tần số lấy mẫu /
 * vỏ chứa) thì phải đo lại, không mang hằng số này sang đường render khác.
 */
const OUTPUT_AUDIO_OFFSET_F = 1.28;

/** Độ trễ đỉnh của từng file, đo bằng bao hình RMS cửa sổ 5ms (xem tools/peaks.py). */
const PEAK_LAG: Record<string, number> = {
  'tech-hum-futuristic.mp3': 18.3,
  'gear-lock-metallic.mp3': 6.75,
  'sparkle-poof-hit.mp3': 2.7,
  'riser-cine.mp3': 35.1,
  'swoosh-quick.mp3': 8.25,
  'transition-soft.mp3': 13.5,
  'air-woosh-quick.mp3': 6.75,
  'sparkle-touch.mp3': 14.25,
  'whoosh-fast.mp3': 21.6,
  'pop.mp3': 1.05,
  'bass-hit-short.mp3': 2.55,
  'wind-swoosh-short.mp3': 4.8,
  'sweep-metal-quick.mp3': 18.45,
  'transition-snap.mp3': 3.45,
  'lock-quick.mp3': 0.3,
  'click-camera.mp3': 5.7,
  'impact-deep-whoosh.mp3': 16.5,
  'shimmer-sparkle-sweep.mp3': 27.3,
};

type Cue = {
  /** Khung mà đỉnh tiếng phải rơi vào (tính tương đối từ SHOTS). */
  peakAt: number;
  src: string;
  volume: number;
  /** Bắt buộc với mẫu dài hơn 5s; cũng dùng để cắt tiếng nền theo cảnh. */
  durationInFrames?: number;
  note: string;
};

const S = SHOTS;

export const CUES: Cue[] = [
  // ——— S1 nightOpen ———
  { peakAt: S.nightOpen.from + 18, src: 'tech-hum-futuristic.mp3', volume: 0.13, durationInFrames: 150,
    note: 'tiếng nền đêm, rải suốt cảnh mở (mẫu 6s nên phải cắt)' },
  { peakAt: S.nightOpen.from + 110, src: 'riser-cine.mp3', volume: 0.2, durationInFrames: 62,
    note: 'bệ đỡ dâng lên dưới đoạn các nét chữ sáng dần, đỉnh rơi đúng khung nét cuối chốt' },
  { peakAt: S.nightOpen.from + 110, src: 'gear-lock-metallic.mp3', volume: 0.4,
    note: 'nét cuối chốt — tiếng khoá cơ khí, dấu "đóng" của chữ VETC' },
  { peakAt: S.nightOpen.from + 116, src: 'sparkle-poof-hit.mp3', volume: 0.24,
    note: 'dư âm sau khi chữ chốt (lớp余韵, không phải điểm nhấn)' },

  // ——— S2 titleNight ———
  { peakAt: S.titleNight.from + 4, src: 'swoosh-quick.mp3', volume: 0.34,
    note: 'chữ nhịp thở vào — cùng một tiếng cho mọi thẻ chữ (S2: cùng loại thì cùng tiếng)' },

  // ——— S3 relay ———
  { peakAt: S.relay.from, src: 'transition-soft.mp3', volume: 0.28, note: 'vào cảnh mới' },
  { peakAt: S.relay.from + 18, src: 'tech-hum-futuristic.mp3', volume: 0.1, durationInFrames: 150,
    note: 'tiếng nền đêm tiếp tục dưới cảnh tiếp sóng' },
  { peakAt: S.relay.from + 18, src: 'air-woosh-quick.mp3', volume: 0.3,
    note: 'tia sáng thứ nhất rời điểm bác tài' },
  { peakAt: S.relay.from + 42, src: 'sparkle-touch.mp3', volume: 0.34,
    note: 'tổng đài sáng lên' },
  { peakAt: S.relay.from + 52, src: 'air-woosh-quick.mp3', volume: 0.26,
    note: 'tia sáng thứ hai — âm lượng giảm một bậc để không thành súng máy' },
  { peakAt: S.relay.from + 76, src: 'sparkle-touch.mp3', volume: 0.26,
    note: 'đội cứu hộ sáng lên, bậc thứ hai của thang giảm dần' },

  // ——— S4 timeline ———
  { peakAt: S.timeline.from, src: 'transition-soft.mp3', volume: 0.26, note: 'vào cảnh mới' },
  { peakAt: S.timeline.from + 60, src: 'whoosh-fast.mp3', volume: 0.3,
    note: 'đoạn máy chạy nhanh nhất trên trục thời gian' },
  ...TIMELINE_POP_FRAMES.map((f, i) => ({
    peakAt: S.timeline.from + f + 4,
    src: 'pop.mp3',
    volume: [0.4, 0.35, 0.3, 0.26][i],
    note: `mốc ${i + 1} bật lên — thang âm lượng giảm dần theo trình tự`,
  })),
  { peakAt: S.timeline.from + TIMELINE_BRAKE_FRAME, src: 'bass-hit-short.mp3', volume: 0.42,
    note: 'phanh gấp ở mốc CÓ MẶT (một trong ba cú đánh toàn khung của cả phim)' },

  // ——— S5 titleOnsite ———
  { peakAt: S.titleOnsite.from + 4, src: 'swoosh-quick.mp3', volume: 0.34,
    note: 'chữ nhịp thở vào — cùng tiếng với thẻ chữ trước' },

  // ——— S6 services ———
  { peakAt: S.services.from, src: 'transition-soft.mp3', volume: 0.26, note: 'vào cảnh mới' },
  ...Array.from({ length: 5 }).map((_, i) => ({
    peakAt: S.services.from + SERVICES_INTRO + i * SERVICES_BEAT,
    // Hai mẫu luân phiên (không phải hai file trùng byte) + thang âm lượng giảm dần
    src: i % 2 === 0 ? 'wind-swoosh-short.mp3' : 'sweep-metal-quick.mp3',
    volume: [0.3, 0.27, 0.24, 0.22, 0.2][i],
    note: `đổi hạng mục cứu hộ lần ${i + 1}`,
  })),
  { peakAt: S.services.from + SERVICES_CYCLE_END + 7, src: 'transition-snap.mp3', volume: 0.42,
    note: 'câu kết "bác lăn bánh tiếp." đáp xuống' },

  // ——— S7 hotline ———
  { peakAt: S.hotline.from, src: 'transition-soft.mp3', volume: 0.26, note: 'vào cảnh mới' },
  ...HOTLINE_LOCK_FRAMES.map((f, i) => ({
    peakAt: S.hotline.from + f,
    src: 'lock-quick.mp3',
    volume: [0.34, 0.3, 0.27, 0.24][i],
    note: `con số thứ ${i + 1} khoá lại — tiếng "cạch", thang giảm dần từ trái sang phải`,
  })),
  { peakAt: S.hotline.from + HOTLINE_CONFIRM_FRAME, src: 'click-camera.mp3', volume: 0.45,
    note: 'xác nhận cả dãy số — tiếng màn trập thật, không phải tiếng báo giao diện' },

  // ——— S8 outro: câu ba nhịp riser -> impact -> sparkle ———
  { peakAt: S.outro.from + 41, src: 'riser-cine.mp3', volume: 0.3, durationInFrames: 100,
    note: 'dâng lên trong lúc vòng sáng thu về' },
  { peakAt: S.outro.from + 41, src: 'impact-deep-whoosh.mp3', volume: 0.55,
    note: 'dấu hiệu đáp xuống và phanh — ĐỈNH ÂM LƯỢNG của cả phim' },
  { peakAt: S.outro.from + 66, src: 'shimmer-sparkle-sweep.mp3', volume: 0.28,
    note: 'dư âm sau khi lockup đứng yên' },
];

export const Sfx: React.FC = () => (
  <>
    {CUES.map((c, i) => {
      const from = Math.max(0, Math.round(c.peakAt - (PEAK_LAG[c.src] ?? 0) - OUTPUT_AUDIO_OFFSET_F));
      return (
        <Sequence key={i} from={from} durationInFrames={c.durationInFrames ?? 90} name={`sfx ${c.src}`}>
          <Audio src={staticFile(`audio/sfx/${c.src}`)} volume={c.volume} />
        </Sequence>
      );
    })}
  </>
);
