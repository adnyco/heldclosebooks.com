/* Footer year */
document.querySelectorAll('.footer-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* Mobile nav toggle */
const burger = document.getElementById('navburger');
const navlinks = document.getElementById('navlinks');

burger?.addEventListener('click', () => {
  const isOpen = navlinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(isOpen));
});

navlinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navlinks.classList.remove('open');
    burger?.setAttribute('aria-expanded', 'false');
  });
});

/* Scroll reveal */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.js-fade').forEach(el => observer.observe(el));
}

/* Quote rotator — 8s auto-advance, pauses on hover/focus */
(function () {
  const slides = [...document.querySelectorAll('.rotator-slide')];
  const dots = [...document.querySelectorAll('.rotator-dot')];
  const prevBtn = document.querySelector('.rotator-btn--prev');
  const nextBtn = document.querySelector('.rotator-btn--next');
  const rotator = document.querySelector('.rotator');

  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(n) {
    slides[current].classList.remove('rotator-slide--active');
    dots[current]?.classList.remove('rotator-dot--active');
    dots[current]?.setAttribute('aria-selected', 'false');

    current = (n + slides.length) % slides.length;

    slides[current].classList.add('rotator-slide--active');
    dots[current]?.classList.add('rotator-dot--active');
    dots[current]?.setAttribute('aria-selected', 'true');
  }

  function startTimer() {
    timer = setInterval(() => goTo(current + 1), 8000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetTimer(); }));

  /* Pause on hover and focus-within */
  rotator?.addEventListener('mouseenter', () => clearInterval(timer));
  rotator?.addEventListener('mouseleave', startTimer);
  rotator?.addEventListener('focusin', () => clearInterval(timer));
  rotator?.addEventListener('focusout', startTimer);

  startTimer();
})();
