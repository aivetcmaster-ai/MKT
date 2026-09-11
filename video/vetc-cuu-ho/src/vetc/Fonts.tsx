// Nạp Inter từ public/fonts (woff2 có sẵn dấu tiếng Việt, subset
// unicode-range của Google Fonts). Chặn render tới khi font sẵn sàng để chữ
// không bị đo sai chiều rộng ở khung đầu.
import React from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';

const WEIGHTS = [400, 600, 700, 800];

export const FontGate: React.FC = () => {
  const [handle] = React.useState(() => delayRender('Nạp font Inter'));

  React.useEffect(() => {
    const href = staticFile('fonts/inter.css');
    let link = document.querySelector<HTMLLinkElement>(`link[href="${href}"]`);
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
    const probe = 'Cứu hộ đường bộ VETC 1900 6010 Sống hiện đại Lái văn minh';
    Promise.all(
      WEIGHTS.map((w) => document.fonts.load(`${w} 100px "Inter"`, probe)),
    )
      .then(() => document.fonts.ready)
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);

  return null;
};
