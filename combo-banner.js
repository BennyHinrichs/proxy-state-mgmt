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
  propertyChangedCallback(name, oldValue, newValue) {
    console.log({name, oldValue, newValue})
    this.render();
  }
  setMessage(reportType) {
    this.message = this.messages[reportType] || 'Select below how you want the report to be generated';
  }
  get reportType() {
    return this.properties.reportType;
  }
  set reportType(val) {
    this.properties.reportType = val;
  }
  get user() {
    return this.properties.user;
  }
  set user(val) {
    this.properties.user = val;
  }
  render() {
    this.innerHTML = `<div>Report Type: ${this.reportType || 'TYPE'}</div><div>On ${(this.user || {}).dob || 'DATE'} there was ${(this.user || {}).name || 'NAME'}</div>`;
  }
}
customElements.define('combo-banner', ComboBanner);