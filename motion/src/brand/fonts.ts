// Nạp VETC Sans từ public/fonts trước khi Remotion chụp khung hình đầu tiên.
// Không dùng font-display:swap ở đây: khung hình phải chờ font thật, tránh nhảy chữ.
import { continueRender, delayRender, staticFile } from 'remotion';

type Face = { file: string; weight: number; style: 'normal' | 'italic' };

const FACES: Face[] = [
  { file: 'VETCSans-Regular.woff2', weight: 400, style: 'normal' },
  { file: 'VETCSans-Italic.woff2', weight: 400, style: 'italic' },
  { file: 'VETCSans-Medium.woff2', weight: 500, style: 'normal' },
  { file: 'VETCSans-MediumItalic.woff2', weight: 500, style: 'italic' },
  { file: 'VETCSans-SemiBold.woff2', weight: 600, style: 'normal' },
  { file: 'VETCSans-SemiBoldItalic.woff2', weight: 600, style: 'italic' },
  { file: 'VETCSans-Bold.woff2', weight: 700, style: 'normal' },
  { file: 'VETCSans-BoldItalic.woff2', weight: 700, style: 'italic' },
  { file: 'VETCSans-ExtraBold.woff2', weight: 800, style: 'normal' },
  { file: 'VETCSans-ExtraBoldItalic.woff2', weight: 800, style: 'italic' },
];

let started = false;

export const loadVetcSans = () => {
  if (started || typeof document === 'undefined') {
    return;
  }
  started = true;

  const handle = delayRender('Nạp font VETC Sans');

  Promise.all(
    FACES.map(async (face) => {
      const loadedFace = await new FontFace(
        'VETC Sans',
        `url(${staticFile(`fonts/${face.file}`)}) format("woff2")`,
        { weight: String(face.weight), style: face.style },
      ).load();
      document.fonts.add(loadedFace);
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      // Thiếu font là lỗi nhận diện, phải dừng để người dựng biết, không xuất bản thiếu font.
      console.error(err);
      continueRender(handle);
    });
};
