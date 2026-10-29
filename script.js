const trigger = document.querySelector('[data-trigger]');
const target = document.querySelector('[data-target]');

trigger?.addEventListener('click', () => {
  target?.classList.toggle('is-active');

  if (target) {
    target.textContent = target.classList.contains('is-active')
      ? 'Active'
      : 'Waiting';
  }
});