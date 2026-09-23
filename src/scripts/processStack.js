export function initProcessStack() {
  const cards = document.querySelectorAll('.process-card');
  const legendItems = document.querySelectorAll('.process__legend li');

  if (!cards.length) return;

  function handleScroll() {
    const windowHeight = window.innerHeight;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const shade = card.querySelector('.process-card__shade');

      // If the next card is scrolling over this card, shade this card
      if (index < cards.length - 1) {
        const nextCard = cards[index + 1];
        const nextRect = nextCard.getBoundingClientRect();

        // Calculate overlap progress
        if (nextRect.top < windowHeight && nextRect.top > 0) {
          const progress = 1 - (nextRect.top / windowHeight);
          if (shade) {
            shade.style.opacity = (progress * 0.7).toFixed(2);
          }
        } else if (nextRect.top <= 0) {
          if (shade) shade.style.opacity = '0.7';
        } else {
          if (shade) shade.style.opacity = '0';
        }
      }

      // Highlight active step in legend
      if (rect.top <= windowHeight * 0.4 && rect.bottom > windowHeight * 0.4) {
        legendItems.forEach((item, i) => {
          if (i === index) {
            item.style.color = 'var(--accent)';
          } else {
            item.style.color = 'var(--ink)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}
