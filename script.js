const header = document.querySelector('.site-header');
const progress = document.querySelector('.page-progress');
const glow = document.querySelector('.cursor-glow');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

function updateScrollUI() {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 30);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  document.querySelector('.hero-media')?.style.setProperty('transform', `translateY(${y * 0.08}px) scale(1.02)`);
}
updateScrollUI();
window.addEventListener('scroll', updateScrollUI, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    glow.style.opacity = '1';
  });

  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-5px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - r.left - r.width/2) * .08}px, ${(e.clientY - r.top - r.height/2) * .08}px)`;
    });
    btn.addEventListener('pointerleave', () => btn.style.transform = '');
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Quote Request - ${data.get('service')}`);
  const body = encodeURIComponent(
`Name: ${data.get('name')}
Company: ${data.get('company') || 'Not provided'}
Phone: ${data.get('phone')}
Email: ${data.get('email')}
Service: ${data.get('service')}

Project details:
${data.get('details')}`
  );
  window.location.href = `mailto:carlospineda@tricoreindustrial.com?subject=${subject}&body=${body}`;
});
