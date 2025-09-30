// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== THEME TOGGLE ===== */
const themeToggle = document.getElementById('themeToggle');
const KEY = 'timo-theme';

function getTheme(){
  return document.documentElement.getAttribute('data-theme') || 'light';
}
function setTheme(mode){
  document.documentElement.setAttribute('data-theme', mode);
  themeToggle?.setAttribute('aria-pressed', mode === 'dark');
}

const stored = localStorage.getItem(KEY);
if (stored) setTheme(stored);

themeToggle?.addEventListener('click', () => {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  localStorage.setItem(KEY, next);
});

/* ===== REVEAL ON SCROLL ===== */
const revealEls = document.querySelectorAll('.card, .timeline__item, .skill, .hero__image, .badge');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.animate(
        [{opacity:0, transform:'translateY(12px)'},{opacity:1, transform:'translateY(0)'}],
        {duration:500, easing:'cubic-bezier(.2,.6,.2,1)', fill:'forwards'}
      );
      io.unobserve(entry.target);
      // animate skill bars after reveal
      if (entry.target.classList.contains('skill')){
        const bar = entry.target.querySelector('.skill__bar span');
        if (bar){
          // trigger width transition
          const w = getComputedStyle(bar).getPropertyValue('--w');
          requestAnimationFrame(() => bar.style.width = w);
        }
      }
    }
  });
}, {threshold:.14});
revealEls.forEach(el => io.observe(el));