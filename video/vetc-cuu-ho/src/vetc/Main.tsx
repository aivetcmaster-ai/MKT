// Trục thời gian phim quảng bá VETC Cứu hộ 24/7.
// Mọi thời lượng lấy từ src/vetc/shots.ts (nguồn sự thật duy nhất).
// BGM: tắt mặc định — xem DESIGN-SPEC.md mục "Sai lệch có ý thức" (kho nhạc
// của skill toàn bản tech-house / hip-hop, lệch giọng thương hiệu VETC).
// Muốn bật: đặt file nhạc đã có bản quyền vào public/audio/bgm.mp3 rồi render
// với --props='{"bgm":true}'. Lúc đó phải xuất hai bản (có nhạc / không nhạc).
import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { C } from './brand';
import { SHOTS, TOTAL } from './shots';
import { FontGate } from './Fonts';
import { Sfx } from './Sfx';
import { S1NightOpen } from './shots/S1NightOpen';
import { S2TitleNight, S5TitleOnsite } from './shots/TitleCard';
import { S3Relay } from './shots/S3Relay';
import { S4Timeline } from './shots/S4Timeline';
import { S6Services } from './shots/S6Services';
import { S7Hotline } from './shots/S7Hotline';
import { S8Outro } from './shots/S8Outro';

const Bgm: React.FC = () => {
  const frame = useCurrentFrame();
  const volume = interpolate(frame, [0, 30, TOTAL - 50, TOTAL], [0, 0.34, 0.34, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <Audio src={staticFile('audio/bgm.mp3')} volume={volume} />;
};

export const VetcCuuHo: React.FC<{ bgm?: boolean }> = ({ bgm = false }) => (
  <AbsoluteFill style={{ background: C.bgDeep }}>
    <FontGate />

    <Sequence from={SHOTS.nightOpen.from} durationInFrames={SHOTS.nightOpen.dur} name="S1 · đêm và chữ VETC">
      <S1NightOpen />
    </Sequence>
    <Sequence from={SHOTS.titleNight.from} durationInFrames={SHOTS.titleNight.dur} name="S2 · 2 giờ sáng">
      <S2TitleNight />
    </Sequence>
    <Sequence from={SHOTS.relay.from} durationInFrames={SHOTS.relay.dur} name="S3 · cuộc gọi đi">
      <S3Relay />
    </Sequence>
    <Sequence from={SHOTS.timeline.from} durationInFrames={SHOTS.timeline.dur} name="S4 · bốn bước">
      <S4Timeline />
    </Sequence>
    <Sequence from={SHOTS.titleOnsite.from} durationInFrames={SHOTS.titleOnsite.dur} name="S5 · ngay tại chỗ">
      <S5TitleOnsite />
    </Sequence>
    <Sequence from={SHOTS.services.from} durationInFrames={SHOTS.services.dur} name="S6 · năm hạng mục">
      <S6Services />
    </Sequence>
    <Sequence from={SHOTS.hotline.from} durationInFrames={SHOTS.hotline.dur} name="S7 · 1900 6010">
      <S7Hotline />
    </Sequence>
    <Sequence from={SHOTS.outro.from} durationInFrames={SHOTS.outro.dur} name="S8 · lockup thương hiệu">
      <S8Outro />
    </Sequence>

    <Sfx />
    {bgm ? <Bgm /> : null}
  </AbsoluteFill>
);
