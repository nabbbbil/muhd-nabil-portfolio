import { portfolioData } from '../data/portfolioData.js';

export function initProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const closeBtn = document.getElementById('modalCloseBtn');
  const backdrop = modal.querySelector('.modal__backdrop');

  const mainImg = document.getElementById('modalMainImg');
  const thumbsContainer = document.getElementById('modalThumbs');
  const indexEl = document.getElementById('modalIndex');
  const titleEl = document.getElementById('modalTitle');
  const subtitleEl = document.getElementById('modalSubtitle');
  const statusEl = document.getElementById('modalStatus');
  const roleEl = document.getElementById('modalRole');
  const yearEl = document.getElementById('modalYear');
  const descEl = document.getElementById('modalDesc');
  const stackContainer = document.getElementById('modalStack');
  const liveLinkBtn = document.getElementById('modalLiveLink');
  const githubLinkBtn = document.getElementById('modalGithubLink');
  let lastFocused = null;

  function openProject(projectId) {
    const project = portfolioData.projects.find(p => p.id === projectId);
    if (!project) return;

    // Set Text Content
    if (indexEl) indexEl.textContent = `${project.index} · ${project.category}`;
    if (titleEl) titleEl.textContent = project.title;
    if (subtitleEl) subtitleEl.textContent = project.subtitle;
    if (statusEl) {
      statusEl.textContent = project.status;
      statusEl.className = `tag wash-${project.sticker}`;
    }
    if (roleEl) roleEl.textContent = project.role;
    if (yearEl) yearEl.textContent = project.year;
    if (descEl) descEl.textContent = project.fullDescription || project.leadText;

    // Set Tech Stack
    if (stackContainer) {
      stackContainer.innerHTML = project.stack
        .map(s => `<span class="tag">${s}</span>`)
        .join('');
    }

    // Set Images & Gallery
    const images = project.images && project.images.length > 0
      ? project.images
      : ['/images/projects/football-booking-1.jpeg'];

    if (mainImg) {
      mainImg.src = images[0];
      mainImg.alt = project.title;
    }

    if (thumbsContainer) {
      thumbsContainer.innerHTML = '';
      if (images.length > 1) {
        thumbsContainer.style.display = 'flex';
        images.forEach((imgSrc, idx) => {
          const thumb = document.createElement('button');
          thumb.type = 'button';
          thumb.className = `modal__thumb ${idx === 0 ? 'is-active' : ''}`;
          thumb.setAttribute('data-cursor-label', 'VIEW');
          thumb.setAttribute('data-cursor-icon', '⤢');
          thumb.setAttribute('aria-label', `${project.title} screenshot ${idx + 1}`);
          thumb.innerHTML = `<img src="${imgSrc}" alt="${project.title} screenshot ${idx + 1}" />`;
          thumb.addEventListener('click', () => {
            thumbsContainer.querySelectorAll('.modal__thumb').forEach(t => t.classList.remove('is-active'));
            thumb.classList.add('is-active');
            if (mainImg) {
              mainImg.style.opacity = '0';
              setTimeout(() => {
                mainImg.src = imgSrc;
                mainImg.style.opacity = '1';
              }, 150);
            }
          });
          thumbsContainer.appendChild(thumb);
        });
      } else {
        thumbsContainer.style.display = 'none';
      }
    }

    // Set Action Links
    if (liveLinkBtn) {
      if (project.liveUrl) {
        liveLinkBtn.href = project.liveUrl;
        liveLinkBtn.style.display = 'inline-flex';
        const isVideo = project.liveUrl.includes('youtu');
        liveLinkBtn.textContent = project.liveLabel || (isVideo ? 'Watch Gameplay Demo ↗' : 'Open Live System ↗');
        liveLinkBtn.setAttribute('data-cursor-label', isVideo ? 'WATCH' : 'OPEN');
        liveLinkBtn.setAttribute('data-cursor-icon', isVideo ? '▶' : '↗');
      } else {
        liveLinkBtn.style.display = 'none';
      }
    }

    if (githubLinkBtn) {
      if (project.githubUrl) {
        githubLinkBtn.href = project.githubUrl;
        githubLinkBtn.style.display = 'inline-flex';
      } else {
        githubLinkBtn.style.display = 'none';
      }
    }

    // Open Modal
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.body.classList.remove('cursor-state--badge', 'cursor-state--hover');
    if (window.lenis) window.lenis.start();
    if (lastFocused && lastFocused.focus) lastFocused.focus({ preventScroll: true });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Global trigger helper
  window.openProjectModal = openProject;
}
