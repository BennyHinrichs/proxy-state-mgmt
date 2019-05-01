import { state, subscribers } from './state.js';

class UserInfo extends HTMLElement {
  connectedCallback() {
    subscribers.push({ element: this, props: ['user'] });
    this._user = state.user;
    this.render();
  }
  static get observedAttributes() {
    return ['user'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    // const isObj = typeof newValue === 'object';
    // const isEqual = isObj ? JSON.stringify(newValue) === JSON.stringify(oldValue) : oldValue !== newValue;
    // if (isObj || oldValue !== newValue) {
    //   this.render();
    // }
    this.render();
  }
  get user() {
    return this._user;
  }
  set user(val) {
    if (JSON.stringify(val) !== JSON.stringify(this._user)) {
      this._user = val;
      return this.setAttribute('user', val);
    }
  }
  render() {
    this.innerHTML = `<span>${this._user.name}</span> was born on <span>${this._user.dob}</span>`;
  }
}
customElements.define('user-info', UserInfo);