import {state, subscribers} from './state.js';

class TypeBanner extends HTMLElement {
  connectedCallback() {
    subscribers.push({ element: this, props: ['type'] });
    this.setMessage();
    this.render();
  }
  static get observedAttributes() {
    return ['type'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  setMessage(type) {
    switch (type) {
      case 'current':
        this.message = 'Report generated from current system data.';
        break;
      case 'modify':
        this.message = 'Modifying system data for new report. Any changes will be saved to the system.';
        break;
      case 'mock':
        this.message = 'Working with temporary values. No data will be saved to the system.';
        break;
      default:
        this.message = 'No option selected';
        break;
    }
  }
  get type() {
    return this.getAttribute('type');
  }
  set type(val) {
    this.setMessage(val);
    return this.setAttribute('type', val);
  }
  render() {
    this.innerText = this.message;
  }
}
customElements.define('type-banner', TypeBanner);