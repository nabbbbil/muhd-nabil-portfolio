export function initPreloader(onComplete) {
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloaderCount');
  const curtain = document.getElementById('preloaderCurtain');

  if (!preloader || !counterEl) {
    if (onComplete) onComplete();
    return;
  }

  // If user prefers reduced motion or is returning, lift quickly
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('nabil_visited')) {
    preloader.style.display = 'none';
    if (onComplete) onComplete();
    return;
  }

  sessionStorage.setItem('nabil_visited', '1');

  let count = 0;
  const duration = 1400; // 1.4s
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Non-linear easing for natural feeling counter
    const easeOutQuad = 1 - (1 - progress) * (1 - progress);
    count = Math.floor(easeOutQuad * 100);
    counterEl.textContent = count;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counterEl.textContent = '100';
      setTimeout(exitPreloader, 200);
    }
  }

  function exitPreloader() {
    if (curtain) {
      curtain.style.transition = 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)';
      curtain.style.transform = 'scaleY(1)';
    }

    setTimeout(() => {
      preloader.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s';
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      
      setTimeout(() => {
        preloader.remove();
        if (onComplete) onComplete();
      }, 600);
    }, 450);
  }

  requestAnimationFrame(updateCounter);
}
