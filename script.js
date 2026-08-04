const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

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

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('quote-form').addEventListener('submit', (event) => {
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
