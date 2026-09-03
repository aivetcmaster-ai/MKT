import React from 'react';
import { Composition } from 'remotion';
import { loadVetcSans } from './brand/fonts';
import { FPS } from './brand/motion';
import {
  VetcParking1x1,
  vetcParking1x1DefaultProps,
} from './compositions/VetcParking1x1';
import {
  VetcTip9x16,
  calculateVetcTip9x16Metadata,
  vetcTip9x16DefaultProps,
} from './compositions/VetcTip9x16';

loadVetcSans();

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VetcParking1x1"
        component={VetcParking1x1}
        durationInFrames={8 * FPS}
        fps={FPS}
        width={1080}
        height={1080}
        defaultProps={vetcParking1x1DefaultProps}
      />
      <Composition
        id="VetcTip9x16"
        component={VetcTip9x16}
        // Độ dài tính theo số ý trong nội dung, xem tipTimeline.
        durationInFrames={10 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={vetcTip9x16DefaultProps}
        calculateMetadata={calculateVetcTip9x16Metadata}
      />
    </>
  );
};
