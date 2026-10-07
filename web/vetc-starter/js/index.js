// Hiệu ứng hiện nội dung khi cuộn tới. Chỉ trượt và mờ dần, đúng quy tắc
// chuyển động trong guideline VETC: 400ms, không nảy, không phóng to, không xoay.
//
// Thay khối này bằng code của một demo trong web/demos khi cần hiệu ứng mạnh hơn.
// Luôn giữ nhánh prefers-reduced-motion và giữ nội dung đọc được khi tắt JavaScript.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function showAll() {
  document.querySelectorAll('.reveal').forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

if (reduceMotion || !window.gsap || !window.ScrollTrigger) {
  showAll();
} else {
  gsap.registerPlugin(ScrollTrigger);

  // power3.out xấp xỉ nhịp cubic-bezier(.2,0,0,1) của guideline: vào nhanh, ra êm, không nảy.
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
      delay: (i % 3) * 0.08, // ba khối cùng hàng hiện lần lượt
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}
