import { Config } from '@remotion/cli/config';
import { findHeadlessShell } from './scripts/find-chromium.mjs';

// Chụp khung hình bằng PNG để giữ nền xanh phẳng, không nhiễu.
// Codec, CRF và pixel format đặt ở từng lệnh render, vì mỗi định dạng đầu ra một khác.
Config.setVideoImageFormat('png');
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('angle');

const browser = findHeadlessShell();
if (browser) {
  Config.setBrowserExecutable(browser);
}
