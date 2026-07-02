// ============================================
//   MINS Technologies - Shared Site JavaScript
//   (loaded on every page: nav, reveal, counters, tilt, scroll)
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // -- 1. Mobile Menu --
  const hamburger = document.querySelector('.nav-hamburger, .hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const collapsibleLinks = mobileNav || document.querySelector('.nav-links');

  if (hamburger && collapsibleLinks) {
    if (!collapsibleLinks.id) collapsibleLinks.id = 'mobile-navigation';
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-controls', collapsibleLinks.id);
    hamburger.setAttribute('aria-expanded', 'false');

    const setMenuState = (open) => {
      collapsibleLinks.classList.toggle(mobileNav ? 'open' : 'mobile-open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
      const spans = hamburger.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    };

    hamburger.addEventListener('click', () => {
      setMenuState(hamburger.getAttribute('aria-expanded') !== 'true');
    });

    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setMenuState(hamburger.getAttribute('aria-expanded') !== 'true');
      }
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !collapsibleLinks.contains(e.target)) {
        setMenuState(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setMenuState(false);
        hamburger.focus();
      }
    });

    collapsibleLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenuState(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) setMenuState(false);
    });
  }

  // -- 2. Active Nav Link --
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // -- 3. Scroll Reveal --
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  // -- 4. Animated Counters --
  const counters = document.querySelectorAll('.counter');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let count = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.floor(count) + suffix;
        }, 25);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => countObserver.observe(c));

  // -- 5. Card Tilt --
  document.querySelectorAll('.service-card, .card').forEach(card => {
    if (card.closest('.home-services')) return;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // -- 6. Smooth Scroll for anchor links --
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -- 7. Navbar scroll style --
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 4px 24px rgba(229,57,53,0.12)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

});
