import React from 'react';
import { Composition } from 'remotion';
import { loadVetcSans } from './brand/fonts';
import {
  VetcParking1x1,
  vetcParking1x1DefaultProps,
} from './compositions/VetcParking1x1';

loadVetcSans();

const FPS = 30;

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
    </>
  );
};
