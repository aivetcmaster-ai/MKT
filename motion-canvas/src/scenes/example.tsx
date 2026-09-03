import {Circle, Layout, Rect, Txt, makeScene2D} from '@motion-canvas/2d';
import {all, createRef, easeOutCubic, waitFor} from '@motion-canvas/core';

import {VETC} from '../brand';

export default makeScene2D(function* (view) {
  view.fill(VETC.white);

  const badge = createRef<Circle>();
  const title = createRef<Txt>();
  const tagline = createRef<Txt>();
  const bar = createRef<Rect>();

  view.add(
    <Layout layout direction={'column'} alignItems={'center'} gap={48}>
      <Circle
        ref={badge}
        size={0}
        alignItems={'center'}
        justifyContent={'center'}
        fill={VETC.green}
        shadowColor={'#00000022'}
        shadowBlur={40}
        shadowOffsetY={12}
      >
        <Txt text={'VETC'} fill={VETC.white} fontFamily={VETC.font} fontWeight={700} fontSize={72} />
      </Circle>

      <Txt
        ref={title}
        text={'Motion Canvas đã sẵn sàng'}
        fill={VETC.black}
        fontFamily={VETC.font}
        fontWeight={800}
        fontSize={64}
        opacity={0}
      />

      <Rect ref={bar} width={0} height={8} radius={4} fill={VETC.green} />

      <Txt
        ref={tagline}
        text={VETC.tagline}
        fill={VETC.neutral700}
        fontFamily={VETC.font}
        fontWeight={500}
        fontSize={40}
        opacity={0}
      />
    </Layout>,
  );

  yield* badge().size(320, 0.8, easeOutCubic);
  yield* all(
    title().opacity(1, 0.6),
    title().y(title().y() - 20, 0.6, easeOutCubic),
  );
  yield* bar().width(420, 0.5, easeOutCubic);
  yield* tagline().opacity(1, 0.6);
  yield* waitFor(1);
});
