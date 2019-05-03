import { state, subscribers } from './state.js';

export default class SubscriberElement extends HTMLElement {
  subscribeToProp(prop) {
    // create the subscription category if it doesn't exist
    !subscribers[prop] && (subscribers[prop] = []);
    // add the element to the subscription category
    subscribers[prop].push(this);
    // initialize the element's prop to the state's prop
    this[prop] = state[prop];
    // add the prop to observedProperties if it's not there
    !this.observedProperties.indexOf(prop) < 0 && this.observedProperties.push(prop);
  }
  unsubscribeFromProp(prop) {
    // remove from global subscribers
    let index = subscribers[prop].indexOf(this);
    subscribers[prop].splice(index, 1);
    // remove from element's observedProperties
    index = this.observedProperties.indexOf(prop);
    this.observedProperties.splice(index, 1);
  }
  subscribeToProps(props) {
    for (const prop of props) this.subscribeToProp(prop);
  }
}