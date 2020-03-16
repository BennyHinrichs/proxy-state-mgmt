import {state} from './state.js'
import './type-banner.js'
import './user-info.js'
import './combo-banner.js'

window.addEventListener('load', () => {
  document.querySelector('.actions--type').addEventListener('click', ({target: el}) => {
    if (!el.classList.contains('btn')) return
    state.reportType = el.dataset.action
  })

  document.querySelector('.actions--user').addEventListener('input', ({target: el}) => {
    state.user = {...state.user, [el.dataset.action]: el.value}
  })
})