export function initCursor() {
  // Only enable on pointer fine (desktop) and no reduced motion
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  document.documentElement.classList.add('has-cursor');

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const badge = document.getElementById('cursorBadge');
  const badgeLabel = document.getElementById('cursorBadgeLabel');
  const badgeIcon = document.getElementById('cursorBadgeIcon');

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      if (badge) badge.style.opacity = '1';
    }

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    if (badge) badge.style.opacity = '0';
  });

  window.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-state--press');
  });

  window.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-state--press');
  });

  // Smooth lerp loop for the trailing ring and badge
  function loop() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    if (badge) {
      badge.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    }

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Delegate hover state listeners
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, input, textarea, select, [data-cursor-label], .strip-card');
    if (!target) {
      document.body.classList.remove('cursor-state--hover', 'cursor-state--badge', 'cursor-state--text');
      return;
    }

    if (target.matches('input, textarea, [contenteditable="true"]')) {
      document.body.classList.add('cursor-state--text');
      return;
    } else {
      document.body.classList.remove('cursor-state--text');
    }

    const label = target.getAttribute('data-cursor-label');
    const icon = target.getAttribute('data-cursor-icon') || '↗';

    if (label && badgeLabel) {
      badgeLabel.textContent = label;
      if (badgeIcon) badgeIcon.textContent = icon;
      document.body.classList.add('cursor-state--badge');
    } else {
      document.body.classList.remove('cursor-state--badge');
      document.body.classList.add('cursor-state--hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, input, textarea, select, [data-cursor-label], .strip-card');
    if (target) {
      document.body.classList.remove('cursor-state--hover', 'cursor-state--badge', 'cursor-state--text');
    }
  });
}
