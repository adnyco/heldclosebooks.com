/* ─── GLOBAL: Footer Year Auto-Update ─── */
const yearSpan = document.querySelector('.footer-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
