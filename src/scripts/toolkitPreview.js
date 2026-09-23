import { portfolioData } from '../data/portfolioData.js';

export function initToolkitPreview() {
  const container = document.getElementById('toolkitList');
  const previewCard = document.getElementById('toolkitPreviewCard');
  const previewTitle = document.getElementById('toolkitPreviewTitle');
  const previewDesc = document.getElementById('toolkitPreviewDesc');
  const previewTags = document.getElementById('toolkitPreviewTags');

  if (!container) return;

  container.innerHTML = '';

  portfolioData.toolkit.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = `toolkit-sec__item ${index === 0 ? 'is-active' : ''}`;
    row.setAttribute('data-cursor-label', 'VIEW SPEC');

    row.innerHTML = `
      <div class="toolkit-sec__item-head">
        <h3 class="toolkit-sec__name">${item.group}</h3>
        <span class="toolkit-sec__count">${item.count}</span>
      </div>
      <div class="toolkit-sec__tags">
        ${item.items.map(tech => `<span class="toolkit-sec__tag">${tech}</span>`).join('')}
      </div>
    `;

    row.addEventListener('mouseenter', () => {
      container.querySelectorAll('.toolkit-sec__item').forEach(el => el.classList.remove('is-active'));
      row.classList.add('is-active');

      if (previewTitle) previewTitle.textContent = item.group;
      if (previewDesc) previewDesc.textContent = item.desc;
      if (previewTags) {
        previewTags.innerHTML = item.items
          .map(t => `<span class="toolkit-sec__tag" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: #ECE7DE;">${t}</span>`)
          .join('');
      }
    });

    container.appendChild(row);
  });

  // Initial preview state
  const first = portfolioData.toolkit[0];
  if (first && previewTitle && previewDesc && previewTags) {
    previewTitle.textContent = first.group;
    previewDesc.textContent = first.desc;
    previewTags.innerHTML = first.items
      .map(t => `<span class="toolkit-sec__tag" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: #ECE7DE;">${t}</span>`)
      .join('');
  }
}
