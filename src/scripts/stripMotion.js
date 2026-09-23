import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData.js';

gsap.registerPlugin(ScrollTrigger);

export function initStripMotion() {
  const stripSection = document.getElementById('strip');
  const rail = document.getElementById('stripRail');
  const viewport = document.getElementById('stripViewport');
  const counterCurrent = document.getElementById('stripCurrent');
  const counterTotal = document.getElementById('stripTotal');
  const filterContainer = document.getElementById('stripFilters');
  const prevBtn = document.getElementById('stripPrevBtn');
  const nextBtn = document.getElementById('stripNextBtn');

  if (!stripSection || !rail || !viewport) return;

  let activeCategory = 'All';
  const allProjects = portfolioData.projects;
  let stripScrollTrigger = null;
  let currentFilteredProjects = allProjects;

  // Staggered zero-gravity floating parameters (inspired by studiors.be)
  const floatParams = [
    { y: 7, dur: '6.4s', delay: '-1.2s', rot: '0.4deg' },
    { y: 9, dur: '7.2s', delay: '-3.6s', rot: '-0.5deg' },
    { y: 6, dur: '5.8s', delay: '-2.1s', rot: '0.3deg' },
    { y: 8, dur: '6.8s', delay: '-4.8s', rot: '-0.4deg' },
    { y: 7, dur: '7.5s', delay: '-0.8s', rot: '0.5deg' }
  ];

  function renderCards(category = 'All') {
    currentFilteredProjects = category === 'All' 
      ? allProjects 
      : allProjects.filter(p => p.category === category);

    if (counterTotal) {
      counterTotal.textContent = String(currentFilteredProjects.length).padStart(2, '0');
    }
    if (counterCurrent) {
      counterCurrent.textContent = '01';
    }

    rail.innerHTML = '';

    currentFilteredProjects.forEach((p, index) => {
      const float = floatParams[index % floatParams.length];
      const card = document.createElement('div');
      card.className = 'strip-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('data-cursor-label', 'EXPLORE ↗');
      card.setAttribute('data-cursor-icon', '↗');

      const coverImg = p.images && p.images.length > 0 ? p.images[0] : null;

      card.innerHTML = `
        <div class="strip-card__float" style="
          --float-y: ${float.y}px;
          --float-duration: ${float.dur};
          --float-delay: ${float.delay};
          --float-rot: ${float.rot};
        ">
          <figure class="strip-card__media">
            <div class="strip-card__mockup" style="--card-accent: ${p.accent};">
              ${coverImg ? `<img class="strip-card__bg-img" src="${coverImg}" alt="${p.title}" />` : ''}
              <div class="strip-card__mockup-overlay"></div>
              <div class="strip-card__mockup-head">
                <span class="strip-card__mockup-badge">${p.status}</span>
                <span>${p.year}</span>
              </div>
              <div class="strip-card__mockup-art">
                <h3 class="strip-card__mockup-title">${p.title}</h3>
                <p class="strip-card__mockup-sub">${p.subtitle}</p>
              </div>
              <div class="strip-card__mockup-stack">
                ${p.stack.map(tech => `<span class="strip-card__mockup-pill">${tech}</span>`).join('')}
              </div>
            </div>
            <span class="strip-card__open">
              View Project <i>↗</i>
            </span>
          </figure>
          <div class="strip-card__meta">
            <div class="strip-card__meta-top">
              <span class="strip-card__meta-num">${p.index}</span>
              <span class="strip-card__meta-year">${p.category} · ${p.year}</span>
            </div>
            <h4 class="strip-card__meta-title">${p.title}</h4>
          </div>
        </div>
      `;

      // Click card to open full project modal
      card.addEventListener('click', () => {
        if (window.openProjectModal) {
          window.openProjectModal(p.id);
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (window.openProjectModal) {
            window.openProjectModal(p.id);
          }
        }
      });

      rail.appendChild(card);
    });

    setupPinnedHorizontalScroll();
  }

  function setupPinnedHorizontalScroll() {
    // Kill existing trigger if any
    if (stripScrollTrigger) {
      stripScrollTrigger.kill();
      stripScrollTrigger = null;
    }

    gsap.set(rail, { clearProps: 'transform,x' });

    // Ensure DOM is painted before measuring
    requestAnimationFrame(() => {
      const railWidth = rail.scrollWidth;
      const viewportWidth = window.innerWidth;
      const totalDistance = Math.max(0, railWidth - viewportWidth + 120);

      if (totalDistance <= 20) {
        // Not enough items to scroll horizontally
        return;
      }

      // Create Pinned Horizontal Scroll
      const tween = gsap.to(rail, {
        x: -totalDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: '#strip',
          pin: true,
          start: 'top top',
          end: () => `+=${Math.max(totalDistance * 1.35, window.innerHeight * 2)}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (counterCurrent && currentFilteredProjects.length > 0) {
              const count = currentFilteredProjects.length;
              const currentIndex = Math.min(
                count,
                Math.max(1, Math.round(self.progress * (count - 1)) + 1)
              );
              counterCurrent.textContent = String(currentIndex).padStart(2, '0');
            }
          }
        }
      });

      stripScrollTrigger = tween.scrollTrigger;
      ScrollTrigger.refresh();
    });
  }

  // Initial render
  renderCards('All');

  // Filter Buttons
  if (filterContainer) {
    const categories = ['All', 'Web Engineering', 'Game Technology'];
    filterContainer.innerHTML = '';

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `filter-chip ${cat === activeCategory ? 'is-active' : ''}`;
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        activeCategory = cat;
        filterContainer.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        renderCards(cat);
      });
      filterContainer.appendChild(btn);
    });
  }

  // Arrow Navigation Buttons
  function navigateStep(direction) {
    if (!stripScrollTrigger) return;

    const count = currentFilteredProjects.length;
    if (count <= 1) return;

    const currentProg = stripScrollTrigger.progress;
    const step = 1 / (count - 1);
    const targetProg = Math.max(0, Math.min(1, currentProg + direction * step));
    const targetScrollY = stripScrollTrigger.start + targetProg * (stripScrollTrigger.end - stripScrollTrigger.start);

    if (window.lenis) {
      window.lenis.scrollTo(targetScrollY, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateStep(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateStep(1));
  }

  // Window resize handler
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
}
