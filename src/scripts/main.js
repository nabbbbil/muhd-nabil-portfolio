import '../styles/variables.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/sections.css';
import '../styles/responsive.css';

import { initSmoothScroll } from './smoothScroll.js';
import { initPreloader } from './preloader.js';
import { initCursor } from './cursor.js';
import { initHeroCanvas } from './heroCanvas.js';
import { initStripMotion } from './stripMotion.js';
import { initProcessStack } from './processStack.js';
import { initToolkitPreview } from './toolkitPreview.js';
import { initContactForm } from './contactForm.js';
import { initProjectModal } from './projectModal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Smooth Scrolling
  initSmoothScroll();

  // 2. Initialize Custom Cursor
  initCursor();

  // 3. Initialize Interactive Canvas
  initHeroCanvas();

  // 4. Initialize Project Details Modal
  initProjectModal();

  // 5. Initialize 3D Perspective Strip
  initStripMotion();

  // 5. Initialize Sticky Stacking Deck
  initProcessStack();

  // 6. Initialize Capabilities Accordion & Preview
  initToolkitPreview();

  // 7. Initialize Multi-Step Contact Form
  initContactForm();

  // 8. Initialize Preloader
  initPreloader(() => {
    // Trigger hero entrance reveals after preloader finishes
    document.querySelectorAll('#hero [data-reveal]').forEach(el => {
      el.classList.add('is-inview');
    });
  });

  // 9. Mobile Menu Toggles
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 10. Scroll Reveals & Manifesto Word Highlights
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

    // Word reveal in manifesto
    const manifestoText = document.getElementById('manifestoText');
    if (manifestoText) {
      const words = manifestoText.textContent.trim().split(/\s+/);
      manifestoText.innerHTML = words.map(w => `<span class="w">${w}</span> `).join('');

      const wordSpans = manifestoText.querySelectorAll('.w');
      const manifestoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            wordSpans.forEach((span, i) => {
              setTimeout(() => {
                span.classList.add('is-active');
              }, i * 35);
            });
            manifestoObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      manifestoObserver.observe(manifestoText);
    }
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-inview'));
  }
});
