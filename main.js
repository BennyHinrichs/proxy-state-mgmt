import {state} from './state.js';
import './type-banner.js';
import './user-info.js';

window.addEventListener('load', () => {
  document.querySelector('.actions--type').addEventListener('click', e => {
    if (!e.target.classList.contains('btn')) return;
    state.type = e.target.dataset.action;
  })

  document.querySelector('.actions--user').addEventListener('input', e => {
    state.user = {...state.user, [e.target.dataset.action]: e.target.value};
  })
})