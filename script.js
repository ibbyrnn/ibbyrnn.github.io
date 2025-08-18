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

// Sequential typing for all .typewriter elements
document.querySelectorAll('.typewriter').forEach((el, idx) => {
  const t = el.getAttribute('data-text') || el.textContent;
  typeIt(el, t, 45, 200 + idx * 1800); // each line starts later
});
