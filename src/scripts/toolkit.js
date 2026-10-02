import { portfolioData } from '../data/portfolioData.js';

// One sticker wash per group; the first two cards take the wider bento slots
const washes = ['wash-electric-blue', 'wash-lavender', 'wash-mint-pop', 'wash-sunburst', 'wash-sky-wash'];
const spans = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];

export function initToolkit() {
  const container = document.getElementById('toolkitList');
  if (!container) return;

  container.innerHTML = portfolioData.toolkit.map((item, index) => `
    <article class="card-sticker ${washes[index % washes.length]} ${spans[index] || 'lg:col-span-2'} flex flex-col gap-16 p-24" data-reveal>
      <div class="flex items-start justify-between gap-12">
        <span class="display text-[56px] leading-[0.8]">${String(index + 1).padStart(2, '0')}</span>
        <span class="tag">${item.count}</span>
      </div>
      <h3 class="text-subheading font-bold">${item.group}</h3>
      <p class="text-[15px] leading-[1.45]">${item.desc}</p>
      <ul class="mt-auto flex flex-wrap gap-6 pt-8">
        ${item.items.map(tech => `<li class="tag">${tech}</li>`).join('')}
      </ul>
    </article>
  `).join('');
}
