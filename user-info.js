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
    this.render();
  }
  get user() {
    return this._user;
  }
  set user(val) {
    this._user = val;
    return this.setAttribute('user', val);
  }
  render() {
    this.innerHTML = this._user.name && this._user.dob ? `${this._user.name} was born on ${this._user.dob}` : 'Fill out the input fields';
  }
}
customElements.define('user-info', UserInfo);