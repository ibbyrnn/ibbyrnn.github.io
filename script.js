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

/***** Typewriter with mobile/reduced-motion kill-switch *****/
let reduceMotion = false;
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) reduceMotion = true;
if (window.innerWidth < 900) reduceMotion = true;  // phones/tablets: no typing

function typeLine(el, text, speed = 45, delay = 0) {
  return new Promise(resolve => {
    if (!el) return resolve();
    if (reduceMotion) { el.textContent = text; el.classList.remove('typing'); return resolve(); }
    el.textContent = '';
    el.classList.add('typing');
    let i = 0;
    setTimeout(() => {
      const timer = setInterval(() => {
        el.textContent += text.charAt(i++);
        if (i > text.length) {
          clearInterval(timer);
          el.classList.remove('typing');
          resolve();
        }
      }, speed);
    }, delay);
  });
}

(async () => {
  const hello   = document.getElementById('hello');
  const nameEl  = document.getElementById('name');
  const tagLine = document.getElementById('tagline');

  const t1 = (hello  ?.getAttribute('data-text') || hello ?.textContent || '').trim();
  const t2 = (nameEl ?.getAttribute('data-text') || nameEl?.textContent || '').trim();
  const t3 = (tagLine?.getAttribute('data-text') || tagLine?.textContent || '').trim();

  await typeLine(hello,  t1, 45, 200);   // Hello, I'm
  await typeLine(nameEl, t2, 45, 150);   // Name
  await typeLine(tagLine,t3, 45, 150);   // Tagline

  // Fade in the hero image afterwards (or immediately on mobile)
  const profileImg = document.querySelector('.hero__image img');
  if (profileImg) profileImg.classList.add('visible');
})();
