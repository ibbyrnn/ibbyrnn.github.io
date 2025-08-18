// ---- Dynamic year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Smooth scroll with header offset ----
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

// ---- Reveal-on-scroll ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- Typewriter (caret via CSS .typing pseudo-element) ----
const reduceMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  window.matchMedia('(max-width: 900px)').matches;

function typeIt(el, text, speed = 45, delay = 200) {
  if (reduceMotion) { el.textContent = text; return; }
  el.textContent = '';
  el.classList.add('typing'); // show caret
  let i = 0;
  setTimeout(() => {
    const timer = setInterval(() => {
      el.textContent += text.charAt(i++);
      if (i > text.length) {
        clearInterval(timer);
        el.classList.remove('typing'); // hide caret
      }
    }, speed);
  }, delay);
}

// Apply sequentially to all .typewriter elements
document.querySelectorAll('.typewriter').forEach((el, idx) => {
  const t = el.getAttribute('data-text') || el.textContent;
  typeIt(el, t, 45, 200 + idx * 1800); // stagger lines
});

// ---- Hero image fade-in after typing ----
const profileImg = document.querySelector('.hero__image img');
if (profileImg) {
  setTimeout(() => {
    profileImg.classList.add('visible');
  }, 200 + 1800 * 3); // adjust if you change the stagger above
}
