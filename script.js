/***** Helper: safe DOM ready *****/
(function run() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

function init() {
  try {
    setYear();
    smoothScroll();
    revealOnScroll();
    typewriterSequence();
    fadeHeroImage();
  } catch (e) {
    // Never crash the page; log instead.
    console.error('Init error:', e);
  }
}

/***** Year *****/
function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

/***** Smooth scroll *****/
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/***** Reveal on scroll *****/
function revealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/***** Typewriter (desktop only) *****/
function typewriterSequence() {
  // Kill animation on small screens or prefers-reduced-motion
  const reduceMotion =
    window.innerWidth < 900 ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hello  = document.getElementById('hello');
  const nameEl = document.getElementById('name');
  const tag1   = document.getElementById('tag1');
  const tag2   = document.getElementById('tag2');

  const tHello = getText(hello,  "👋 Hello, I'm");
  const tName  = getText(nameEl, "Muhammad Ibrahim Mirza");
  const tTag1  = getText(tag1,   "CS undergrad @ APU · Python · Java · C · R · MySQL");
  const tTag2  = getText(tag2,   "Interested in software engineering, algorithms & optimisation");

  if (reduceMotion) {
    if (hello)  hello.textContent  = tHello;
    if (nameEl) nameEl.textContent = tName;
    if (tag1)   tag1.textContent   = tTag1;
    if (tag2)   tag2.textContent   = tTag2;
    return; // no typing on mobile
  }

  // Sequence: hello -> name -> tag1 -> tag2
  (async () => {
    await typeLine(hello,  tHello, 45, 150);
    await typeLine(nameEl, tName,  45, 120);
    await typeLine(tag1,   tTag1,  45, 120);
    await typeLine(tag2,   tTag2,  45, 120);
  })();
}

function getText(el, fallback) {
  if (!el) return fallback || '';
  const a = (el.getAttribute('data-text') || '').trim();
  const b = (el.textContent || '').trim();
  return a || b || fallback || '';
}

function typeLine(el, text, speed, delay) {
  return new Promise(resolve => {
    if (!el || !text) return resolve();
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

/***** Hero image fade (won’t crash if missing) *****/
function fadeHeroImage() {
  const img = document.querySelector('.hero__image img');
  if (img) img.classList.add('visible');
}
