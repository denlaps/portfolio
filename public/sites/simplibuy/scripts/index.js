import { ScrollWatcher } from './ScrollWatcher.js';

document.addEventListener('DOMContentLoaded', () => {
  new ScrollWatcher();

  // Open mobile menu
  document.querySelector('.js-menu-burger').addEventListener('click', (ev) => {
    ev.preventDefault();
    document.querySelector('.js-menu-burger').classList.toggle('_show');
    document.querySelector('.js-menu-mobile').classList.toggle('_show');
  })
});