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

// Disable typing on small screens OR if user prefers reduced motion
let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                || window.innerWidth < 900;

function safeText(el, def = '') {
  if (!el) return def;
  const t1 = (el.getAttribute('data-text') || '').trim();
  const t2 = (el.textContent || '').trim();
  return t1 || t2 || def; // always return something
}

function typeLine(el, text, speed = 45, delay = 0) {
  return new Promise(resolve => {
    if (!el) return resolve();
    // If no text found, do nothing visible, just resolve
    if (!text) { el.textContent = ''; el.classList.remove('typing'); return resolve(); }

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
  const tagline = document.getElementById('tagline');

  const tHello   = safeText(hello,   "👋 Hello, I'm");
  const tName    = safeText(nameEl,  "Muhammad Ibrahim Mirza");
  const tTagline = safeText(tagline, "CS undergrad @ APU · Python · Java · C · R · MySQL | Interested in software engineering, algorithms & optimisation");

  await typeLine(hello,   tHello, 45, 200);  // Hello
  await typeLine(nameEl,  tName,  45, 150);  // Name
  await typeLine(tagline, tTagline,45, 150); // Tagline

  const profileImg = document.querySelector('.hero__image img');
  if (profileImg) profileImg.classList.add('visible');
})();
