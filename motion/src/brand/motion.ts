// Quy tắc chuyển động VETC (guideline p.62-68):
// mỗi bước 400ms, nhịp cubic-bezier(.2,0,0,1), chỉ trượt và mờ dần,
// không nảy, không phóng to, Smart Line không xoay.
import { interpolate, Easing } from 'remotion';

export const DURATION_FAST = 120;
export const DURATION_BASE = 200;
export const DURATION_SLOW = 400;

export const easeStandard = Easing.bezier(0.2, 0, 0, 1);
export const easeOut = Easing.bezier(0, 0, 0.2, 1);

/** Tiến độ 0..1 của một bước bắt đầu tại `startInSeconds`, dài `durationInSeconds`. */
export const progress = (
  frame: number,
  fps: number,
  startInSeconds: number,
  durationInSeconds = DURATION_SLOW / 1000,
) =>
  interpolate(
    frame,
    [startInSeconds * fps, (startInSeconds + durationInSeconds) * fps],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: easeStandard,
    },
  );

/** Style "trượt lên và hiện dần" dùng chung cho chữ và khối nội dung. */
export const rise = (
  frame: number,
  fps: number,
  startInSeconds: number,
  distance = 24,
): React.CSSProperties => {
  const p = progress(frame, fps, startInSeconds);
  return {
    opacity: p,
    transform: `translateY(${(distance * (1 - p)).toFixed(2)}px)`,
  };
};
