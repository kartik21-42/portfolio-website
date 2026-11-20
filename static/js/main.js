// Navigation stays usable without waiting for animations or third-party services.
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  navLinks.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav')) closeMenu();
});
window.matchMedia('(min-width: 801px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    if (!visible.length) return;
    const sectionId = visible[0].target.id;
    document.querySelectorAll('.nav-link').forEach(link => {
      const active = link.getAttribute('href') === `#${sectionId}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}

document.querySelectorAll('.filter-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.project-card').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && !card.dataset.category.split(' ').includes(button.dataset.filter);
    });
  });
});

const contactForm = document.getElementById('contact-form');
const sendButton = document.getElementById('send-button');
const formStatus = document.getElementById('form-status');
let sending = false;

contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending || !contactForm.reportValidity()) return;
  const fields = new FormData(contactForm);
  const name = fields.get('name').trim();
  const email = fields.get('email').trim();
  const message = fields.get('message').trim();
  const subject = fields.get('subject').trim() || 'Portfolio inquiry';
  if (!name || !email || !message) {
    formStatus.textContent = 'Please enter your name, email, and a message.';
    return;
  }
  sending = true;
  sendButton.disabled = true;
  sendButton.textContent = 'Sending...';
  formStatus.textContent = '';
  try {
    if (!window.emailjs) throw new Error('Email service unavailable');
    window.emailjs.init({ publicKey: 'KaiPXMYEBP_6PbOZz' });
    await window.emailjs.send('service_in5xr5e', 'template_n9um31r', {
      from_name: name,
      from_email: email,
      subject,
      message,
    });
    formStatus.textContent = 'Thanks for reaching out. Your message has been sent.';
    contactForm.reset();
  } catch {
    formStatus.textContent = 'The form could not send your message. ';
    const fallback = document.createElement('a');
    const body = `Hi Kartik,\n\n${message}\n\nBest regards,\n${name}\n${email}`;
    fallback.href = `mailto:kartik.nair1717@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    fallback.textContent = 'Open your email app to send it.';
    formStatus.appendChild(fallback);
  } finally {
    sending = false;
    sendButton.disabled = false;
    sendButton.textContent = 'Send message';
  }
});
