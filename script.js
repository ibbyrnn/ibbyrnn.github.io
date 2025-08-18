document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// Respect user's reduced-motion preference
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeIt(el, text, speed = 45, delay = 200) {
  if (reduceMotion) { el.textContent = text; el.style.borderRight = 'none'; return; }
  el.textContent = '';
  let i = 0;
  setTimeout(() => {
    const timer = setInterval(() => {
      el.textContent += text.charAt(i++);
      if (i > text.length) {
        clearInterval(timer);
        el.style.borderRight = 'none'; // remove caret after typing
      }
    }, speed);
  }, delay);
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeIt(el, text, speed = 45, delay = 200) {
  if (reduceMotion) { el.textContent = text; return; }
  el.textContent = '';
  el.classList.add('typing');          // show caret
  let i = 0;
  setTimeout(() => {
    const timer = setInterval(() => {
      el.textContent += text.charAt(i++);
      if (i > text.length) {
        clearInterval(timer);
        el.classList.remove('typing'); // hide caret when done
      }
    }, speed);
  }, delay);
}

// Apply sequentially
document.querySelectorAll('.typewriter').forEach((el, idx) => {
  const t = el.getAttribute('data-text') || el.textContent;
  typeIt(el, t, 45, 200 + idx * 1800);
});

// Fade-in the profile image after the text has typed
const profileImg = document.querySelector('.hero__image img');
if (profileImg) {
  // wait until the last typewriter finishes (~200 + 1800*2 ms)
  setTimeout(() => {
    profileImg.classList.add('visible');
  }, 200 + 1800 * 3); // adjust if you tweak typing delays
}
