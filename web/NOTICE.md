# NOTICE - nguồn và giấy phép của code bên thứ ba

Thư mục `web/demos` chứa code demo lấy từ tổ chức Codrops trên GitHub
(https://github.com/codrops), tải ngày 2026-10-07. Code giữ nguyên bản quyền của
tác giả gốc. VETC dùng làm tham chiếu kỹ thuật và làm nền để dựng sản phẩm.

## Hai loại giấy phép

**MIT.** Các demo gần đây có file `LICENSE` ghi MIT. Cho phép dùng, sửa, phân phối,
dùng trong sản phẩm thương mại, với điều kiện giữ lại thông báo bản quyền và nội dung
giấy phép. File `LICENSE` gốc được giữ nguyên trong từng thư mục demo.

**Điều khoản riêng của Codrops.** Một số demo cũ không có file `LICENSE`, chỉ dẫn tới
https://tympanus.net/codrops/licensing/. Nội dung điều khoản đó: được dùng tự do khi
tích hợp hoặc phát triển thêm trong dự án cá nhân và thương mại như website, web app,
web template bán ra; không được lấy nguyên trạng để bán lại, phân phối lại, đăng lại,
hoặc bán phiên bản đóng gói thành plugin. Luôn phải xét thêm giấy phép của các thư viện,
script và hình ảnh mà demo dùng kèm.

Cả hai loại đều cho VETC dùng trong sản phẩm. Khác biệt nằm ở chỗ không được bán lại
chính bản demo. Khi đưa vào sản phẩm thật, phòng pháp chế đối chiếu lại bảng dưới.

## Bảng đối chiếu từng demo

| Demo | Giấy phép | Bản quyền | Nguồn |
|---|---|---|---|
| 3DCarousel | MIT | 2009 - 2024 Codrops | [GitHub](https://github.com/codrops/3DCarousel) |
| ElasticGridScroll | MIT | 2009 - 2026 Codrops | [GitHub](https://github.com/codrops/ElasticGridScroll) |
| GooeyTextHoverEffect | MIT | 2009 - 2020 Codrops | [GitHub](https://github.com/codrops/GooeyTextHoverEffect) |
| HoverGrid | MIT | 2009 - 2024 Codrops | [GitHub](https://github.com/codrops/HoverGrid) |
| ImageExpansionTypography | MIT | 2009 - 2024 Codrops | [GitHub](https://github.com/codrops/ImageExpansionTypography) |
| IntroGridMotionTransition | MIT | 2009 - 2024 Codrops | [GitHub](https://github.com/codrops/IntroGridMotionTransition) |
| KineticTypePageTransition | MIT | 2009 - 2021 Codrops | [GitHub](https://github.com/codrops/KineticTypePageTransition) |
| LineTextHoverAnimations | MIT | 2009 - 2024 Codrops | [GitHub](https://github.com/codrops/LineTextHoverAnimations) |
| OnScrollLayoutFormations | MIT | 2009 - 2024 Codrops | [GitHub](https://github.com/codrops/OnScrollLayoutFormations) |
| OnScrollSVGFilterText | MIT | 2009 - 2024 Codrops | [GitHub](https://github.com/codrops/OnScrollSVGFilterText) |
| OnScrollTextHighlight | MIT | 2009 - 2022 Codrops | [GitHub](https://github.com/codrops/OnScrollTextHighlight) |
| PageTransitions | Điều khoản Codrops | Codrops | [GitHub](https://github.com/codrops/PageTransitions) |
| ParticleEffectsButtons | Điều khoản Codrops | Codrops | [GitHub](https://github.com/codrops/ParticleEffectsButtons) |
| PushGridItems | MIT | 2009 - 2024 Codrops | [GitHub](https://github.com/codrops/PushGridItems) |
| RepeatingImageTransition | MIT | 2009 - 2026 Codrops | [GitHub](https://github.com/codrops/RepeatingImageTransition) |
| RotatingOnScrollAnimations | MIT | 2009 - 2026 Codrops | [GitHub](https://github.com/codrops/RotatingOnScrollAnimations) |
| ScrollBlurTypography | MIT | 2009 - 2024 Codrops | [GitHub](https://github.com/codrops/ScrollBlurTypography) |
| ScrollTextMotion | MIT | 2009 - 2025 Codrops | [GitHub](https://github.com/codrops/ScrollTextMotion) |
| SidebarTransitions | Điều khoản Codrops | Codrops | [GitHub](https://github.com/codrops/SidebarTransitions) |
| SlideshowAnimations | MIT | 2009 - 2022 Codrops | [GitHub](https://github.com/codrops/SlideshowAnimations) |

20 demo: 17 theo MIT, 3 theo điều khoản riêng của Codrops.

## Thư viện đi kèm trong demo

Một số demo vendor sẵn thư viện bên thứ ba. Các thư viện này có giấy phép riêng,
không đổi theo giấy phép của demo.

| Thư viện | Xuất hiện trong | Giấy phép |
|---|---|---|
| GSAP, kèm ScrollTrigger, ScrollSmoother, Flip, SplitText, ScrambleText, Observer, ScrollTo | 15 demo, và `web/vetc-starter/js` | Giấy phép riêng của GSAP, xem phần dưới |
| Three.js | ElasticGridScroll, RotatingOnScrollAnimations | MIT |
| Lenis | 7 demo, trong đó có OnScrollTextHighlight, ScrollBlurTypography | MIT |
| imagesLoaded | 9 demo, trong đó có 3DCarousel, HoverGrid | MIT |
| anime.js | ParticleEffectsButtons | MIT |
| SplitType | LineTextHoverAnimations, ScrollBlurTypography | MIT |
| Splitting.js | OnScrollTextHighlight | MIT |
| mo.js | ParticleEffectsButtons, nạp từ CDN chứ không vendor | MIT |

**GSAP.** Từ ngày 30/04/2025, Webflow mở GSAP miễn phí cho mọi người dùng, gồm cả các plugin
trước đây thuộc gói Club như SplitText và MorphSVG, và giấy phép chuẩn đã được mở rộng để
bao gồm cả mục đích thương mại. Đây vẫn là giấy phép riêng của GSAP, không phải MIT.
Nguồn: https://gsap.com/community/standard-license/ và https://webflow.com/blog/gsap-becomes-free
Đối chiếu lại trang licensing trước mỗi lần phát hành sản phẩm thương mại.

## Script bên thứ ba cần bỏ trước khi dùng

Ba demo còn giữ script quảng cáo và đo lường của Codrops, đang bật chứ không bị comment:

| Demo | Dòng cần bỏ |
|---|---|
| IntroGridMotionTransition | `adpacks/cda_sponsor.js`, `adpacks/analytics.js` |
| LineTextHoverAnimations | `adpacks/cda_sponsor.js`, `adpacks/analytics.js` |
| OnScrollTextHighlight | `adpacks/cda_sponsor.js`, `adpacks/analytics.js` |

Bốn demo nạp jQuery hoặc webfont.js từ `ajax.googleapis.com`: GooeyTextHoverEffect,
OnScrollTextHighlight, PageTransitions, ScrollBlurTypography.

Các dòng này được giữ nguyên để code khớp bản gốc. Phải xoá hết trước khi đưa vào sản phẩm
VETC: chúng gửi dữ liệu truy cập ra hạ tầng của Codrops và Google. Khi chỉ mở xem tham chiếu
trên máy cá nhân thì không sao, nhưng nên biết là có.

## Hình ảnh và font của demo

Repo này **không** lưu ảnh, video và font của demo. Lý do: phần lớn là ảnh stock hoặc ảnh
minh hoạ của tác giả, VETC không dùng lại trong sản phẩm, và chúng chiếm khoảng 38 MB.
Khi cần xem demo đúng bản gốc, chạy `node tools/restore-assets.mjs <TenDemo>`. File tải về
nằm trong `.gitignore` nên không vào repo.

Khi dựng sản phẩm VETC, thay toàn bộ ảnh demo bằng ảnh của VETC hoặc ảnh có giấy phép rõ ràng.

## Hai thay đổi so với bản gốc

Code trong `web/demos` giống bản gốc, trừ hai điểm:

1. Đã bỏ file media (ảnh, video, font) như nói ở trên.
2. Đã bỏ `.gitignore`, `.gitattributes` và `.DS_Store` của từng demo, vì chúng là cấu hình
   của repo gốc, không còn đúng khi demo nằm lồng trong repo này.

Không sửa HTML, CSS, JavaScript hay file LICENSE của bất kỳ demo nào.
