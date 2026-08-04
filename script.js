const header = document.querySelector('.site-header');
const progress = document.querySelector('.page-progress');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.primary-nav');
const heroImage = document.querySelector('.hero-image');

function updatePage() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;

  header.classList.toggle('scrolled', y > 30);
  progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

  if (heroImage) {
    heroImage.style.translate = `0 ${y * 0.08}px`;
  }
}

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.primary-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', updatePage, { passive: true });
updatePage();
