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

/***** Typewriter with mobile/reduced-motion kill-switch *****/
let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                || window.innerWidth < 900;  // phones/tablets: no typing

function safeText(el, def = '') {
  if (!el) return def;
  const t1 = (el.getAttribute('data-text') || '').trim();
  const t2 = (el.textContent || '').trim();
  return t1 || t2 || def;
}

function typeLine(el, text, speed = 45, delay = 0) {
  return new Promise(resolve => {
    if (!el) return resolve();
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
  const hello  = document.getElementById('hello');
  const nameEl = document.getElementById('name');
  const tag1   = document.getElementById('tag1');
  const tag2   = document.getElementById('tag2');

  const tHello = safeText(hello, "👋 Hello, I'm");
  const tName  = safeText(nameEl, "Muhammad Ibrahim Mirza");
  const tTag1  = safeText(tag1,  "CS undergrad @ APU · Python · Java · C · R · MySQL");
  const tTag2  = safeText(tag2,  "Interested in software engineering, algorithms & optimisation");

  // Sequence: Hello -> Name -> Tagline line 1 -> Tagline line 2
  await typeLine(hello,  tHello, 45, 200);
  await typeLine(nameEl, tName,  45, 150);
  await typeLine(tag1,   tTag1,  45, 150);
  await typeLine(tag2,   tTag2,  45, 150);

  // Fade in profile image afterwards (or immediately when reduceMotion)
  const profileImg = document.querySelector('.hero__image img');
  if (profileImg) profileImg.classList.add('visible');
})();
