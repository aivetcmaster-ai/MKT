import React from 'react';
import { Composition } from 'remotion';
import { VetcCuuHo } from './vetc/Main';
import { FPS, TOTAL } from './vetc/shots';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="VetcCuuHo"
      component={VetcCuuHo}
      durationInFrames={TOTAL}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{ bgm: false }}
    />
  </>
);
