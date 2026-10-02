import '../styles/app.css';

import { initSmoothScroll } from './smoothScroll.js';
import { initPreloader } from './preloader.js';
import { initCursor } from './cursor.js';
import { initStripMotion } from './stripMotion.js';
import { initToolkit } from './toolkit.js';
import { initProjectModal } from './projectModal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Smooth Scrolling
  initSmoothScroll();

  // 2. Initialize Custom Cursor
  initCursor();

  // 3. 3D ribbon — Three.js loads as its own chunk so it never blocks first paint
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    import('./ribbon3d.js')
      .then(({ initRibbon }) => initRibbon(heroCanvas))
      .catch(() => heroCanvas.remove());
  }

  // 4. Initialize Project Details Modal
  initProjectModal();

  // 5. Initialize Pinned Project Strip
  initStripMotion();

  // 6. Render Toolkit Cards
  initToolkit();

  // 7. Initialize Preloader
  initPreloader(() => {
    // Trigger hero entrance reveals after preloader finishes
    document.querySelectorAll('#hero [data-reveal]').forEach(el => {
      el.classList.add('is-inview');
    });
  });

  // 8. Nav slides up once the announcement band scrolls away
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNav = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // 9. Mobile Menu Toggles
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    const setMenu = (isOpen) => {
      burger.classList.toggle('is-open', isOpen);
      mobileMenu.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (window.lenis) isOpen ? window.lenis.stop() : window.lenis.start();
    };

    burger.addEventListener('click', () => setMenu(!burger.classList.contains('is-open')));

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && burger.classList.contains('is-open')) setMenu(false);
    });
  }

  // 10. Scroll Reveals
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-inview'));
  }
});
