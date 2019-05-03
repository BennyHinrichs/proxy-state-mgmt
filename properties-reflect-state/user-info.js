import SubscriberElement from './subscriber-element.js';

class UserInfo extends SubscriberElement {
  constructor() {
    super();
    this.observedProperties = ['user'];
  }
  connectedCallback() {
    this.subscribeToProps(this.observedProperties);
    this.render();
  }
  propertyChangedCallback(name, oldValue, newValue) {
    this.render();
  }
  get user() {
    return this.properties.user;
  }
  set user(val) {
    this.properties.user = val;
  }
  render() {
    this.innerHTML = this.user.name && this.user.dob ? `${this.user.name} was born on ${this.user.dob}` : 'Fill out the input fields';
  }
}
customElements.define('user-info', UserInfo);