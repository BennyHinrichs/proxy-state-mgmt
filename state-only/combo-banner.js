import {state} from './state.js';
import SubscriberElement from './subscriber-element.js';

class ComboBanner extends SubscriberElement {
  constructor() {
    super();
    this.observedProperties = ['reportType', 'user'];
  }
  connectedCallback() {
    this.subscribeToProps(this.observedProperties);
    this.render();
  }
  propertyChangedCallback(prop, oldValue, newValue) {
    this.render();
  }
  render() {
    this.innerHTML = `<div>Report Type: ${state.reportType || 'TYPE'}</div><div>On ${(state.user || {}).dob || 'DATE'} there was ${(state.user || {}).name || 'NAME'}</div>`;
  }
}
customElements.define('combo-banner', ComboBanner);