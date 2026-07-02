// ============================================
//   MINS Technologies - Contact Page JavaScript
//   (contact form validation, contact.html only)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const required = contactForm.querySelectorAll('[required]');

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        valid = false;
      }
    });

    const email = contactForm.querySelector('[type="email"]');
    if (email && email.value && !email.value.includes('@')) {
      email.style.borderColor = '#ef4444';
      valid = false;
    }

    if (valid) {
      const successMsg = document.getElementById('formSuccess');
      if (successMsg) {
        successMsg.style.display = 'block';
        contactForm.reset();
        setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
      }
    }
  });
});
