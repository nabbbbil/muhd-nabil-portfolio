import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let globalLenis = null;

export function getLenis() {
  return globalLenis;
}

export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  globalLenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    infinite: false
  });

  window.lenis = globalLenis;

  // Synchronize ScrollTrigger with Lenis
  globalLenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  gsap.ticker.add((time) => {
    globalLenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Expose global scroll helper for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          // A pinned section moves to the end of its spacer once scrolled past; aim for the spacer's start
          const parent = targetElement.parentElement;
          const destination = parent && parent.classList.contains('pin-spacer') ? parent : targetElement;
          // force: the mobile drawer stops Lenis and this handler runs before it reopens
          globalLenis.scrollTo(destination, {
            offset: 0,
            force: true,
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      }
    });
  });

  return globalLenis;
}
