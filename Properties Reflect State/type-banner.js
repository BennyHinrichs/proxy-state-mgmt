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
  propertyChangedCallback(name, oldValue, newValue) {
    this.render();
  }
  setMessage(reportType) {
    this.message = this.messages[reportType] || 'Select below how you want the report to be generated';
  }
  get reportType() {
    return this.properties.reportType;
  }
  set reportType(val) {
    this.setMessage(val);
    this.properties.reportType = val;
  }
  render() {
    this.innerText = this.message;
  }
}
customElements.define('type-banner', TypeBanner);