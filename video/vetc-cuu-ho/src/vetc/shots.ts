// BẢNG PHÂN CẢNH — nguồn sự thật duy nhất của timeline.
// Bảng ghim âm thanh (Sfx.tsx) và mọi tham chiếu khác đều phái sinh từ đây,
// ghim theo biểu thức tương đối SHOTS.x.from + offset, không bao giờ ghim số khung trần.
// 30fps, 1920x1080.

export const FPS = 30;

type ShotDef = { dur: number; note: string; card: string };

const defs = {
  nightOpen: {
    dur: 162,
    note: 'Đêm. Ba quầng sáng trôi hữu cơ. Chữ VETC hiện dần theo từng nét, chốt nét cuối thì nhịp sáng.',
    card: 'glow-flyline-moves/glow-orb-ambient + opening/stroke-segment-build',
  },
  titleNight: {
    dur: 76,
    note: 'Chữ nhịp thở: "2 giờ sáng. Xe không nổ máy." nhấn hổ phách.',
    card: 'typography/paper-title-card (bản trường tối)',
  },
  relay: {
    dur: 168,
    note: 'Cuộc gọi đi: bác tài -> tổng đài VETC -> đội cứu hộ gần nhất, quầng sáng cộng hưởng cùng khung.',
    card: 'effects/glow-flyline-moves/orb-flyline-relay',
  },
  timeline: {
    dur: 156,
    note: 'Du hành trục thời gian bốn mốc: tiếp nhận - định vị - điều đội - có mặt, phanh gấp rồi đẩy gần.',
    card: 'data/timeline-travel',
  },
  titleOnsite: {
    dur: 76,
    note: 'Chữ nhịp thở: "Xử lý ngay tại chỗ." nhấn hổ phách.',
    card: 'typography/paper-title-card (bản trường tối)',
  },
  services: {
    dur: 176,
    note: 'Câu "VETC có mặt để ___" đổi năm hạng mục cứu hộ rồi kết "bác lăn bánh tiếp."',
    card: 'typography/pill-slot-cycle',
  },
  hotline: {
    dur: 140,
    note: 'Số tổng đài 1900 6010 cuộn từng con số, khoá dần từ trái sang phải.',
    card: 'data/odometer-digit-roll',
  },
  outro: {
    dur: 175,
    note: 'Vòng sáng thu về thành dấu hiệu, chữ VETC vào lockup, tagline chốt, giữ yên hơn 1 giây.',
    card: 'outro/logo-shrink-wordmark-lockup',
  },
} satisfies Record<string, ShotDef>;

export type ShotName = keyof typeof defs;

const order = Object.keys(defs) as ShotName[];

let acc = 0;
export const SHOTS = order.reduce((out, name) => {
  out[name] = { ...defs[name], from: acc, to: acc + defs[name].dur };
  acc += defs[name].dur;
  return out;
}, {} as Record<ShotName, ShotDef & { from: number; to: number }>);

export const TOTAL = acc; // 1129f = 37.6s
export const SHOT_ORDER = order;
