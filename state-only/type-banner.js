import {state} from './state.js';
import SubscriberElement from './subscriber-element.js';

class TypeBanner extends SubscriberElement {
  constructor() {
    super();
    this.observedProperties = ['reportType'];
    this.messages = {
      current: 'Report generated from current system data.',
      modify: 'Modifying system data for new report. Any changes will be saved to the system.',
      mock: 'Working with temporary values. No changes will be saved to the system.'
    };
  }
  connectedCallback() {
    this.subscribeToProps(this.observedProperties);
    this.setMessage();
    this.render();
  }
  propertyChangedCallback(prop, oldValue, newValue) {
    this.setMessage();
    this.render();
  }
  setMessage() {
    this.message = this.messages[state.reportType] || 'Select below how you want the report to be generated';
  }
  render() {
    this.innerText = this.message;
  }
}
customElements.define('type-banner', TypeBanner);