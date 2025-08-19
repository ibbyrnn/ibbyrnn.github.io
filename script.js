/***** Year in footer *****/
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/***** Smooth scroll with header offset *****/
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/***** Reveal-on-scroll *****/
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/***** Typewriter (with mobile/reduced-motion off-switch) *****/
// Disable typing on small screens OR if user prefers reduced motion
let reduceMotion = false;
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) reduceMotion = true;
if (window.innerWidth < 900) reduceMotion = true;

/* Type a string into an element.
   Returns total duration (ms) for this element including delay. */
function typeIt(el, text, speed = 45, delay = 200) {
  if (reduceMotion) {
    el.textContent = text;
    el.classList.remove('typing'); // ensure caret hidden
    return 0;
  }
  el.textContent = '';
  el.classList.add('typing'); // CSS caret shows while typing
  let i = 0;
  const start = delay;
  setTimeout(() => {
    const timer = setInterval(() => {
      el.textContent += text.charAt(i++);
      if (i > text.length) {
        clearInterval(timer);
        el.classList.remove('typing'); // hide caret when done
      }
    }, speed);
  }, delay);
  return delay + speed * text.length + 50; // approximate end time
}

/***** Apply typewriter to all .typewriter elements (sequential) *****/
const typeEls = Array.from(document.querySelectorAll('.typewriter'));
let cumulative = 0;
const speed = 45;
const baseDelay = 200;
const stagger = 250; // small gap between lines

typeEls.forEach((el, idx) => {
  const text = el.getAttribute('data-text') || el.textContent;
  const delay = reduceMotion ? 0 : baseDelay + cumulative;
  const dur = typeIt(el, text, speed, delay);
  cumulative += (dur || 0) + (reduceMotion ? 0 : stagger);
});

/***** Hero image fade-in (after typing, or immediately if typing disabled) *****/
const profileImg = document.querySelector('.hero__image img');
if (profileImg) {
  const when = reduceMotion ? 0 : baseDelay + cumulative + 100;
  setTimeout(() => profileImg.classList.add('visible'), when);
}
