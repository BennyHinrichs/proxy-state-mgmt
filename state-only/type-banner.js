import { state } from './state.js';
import SubscriberElement from './subscriber-element.js';

class TypeBanner extends SubscriberElement {
  observedProperties = new Set(['reportType'])
  
  #messages = {
    current: 'Report generated from current system data.',
    modify: 'Modifying system data for new report. Any changes will be saved to the system.',
    mock: 'Working with temporary values. No changes will be saved to the system.'
  }

  setMessage() {
    this.message = this.#messages[state.reportType] || 'Select below how you want the report to be generated';
  }

  render() {
    this.setMessage();
    this.innerText = this.message;
  }
}
customElements.define('type-banner', TypeBanner);