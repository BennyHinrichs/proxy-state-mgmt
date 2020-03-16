import { subscribers } from './state.js'

export default class SubscriberElement extends HTMLElement {
  connectedCallback() {
    this.observedProperties.forEach(prop => this.subscribeToProp(prop))
    // subclasses have to include the render() method
    this.render()
  }

  propertyChangedCallback(prop, oldValue, newValue) {
    this.render()
  }

  disconnectedCallback() {
    this.observedProperties.forEach(prop => this.unsubscribeFromProp(prop))
  }

  subscribeToProp(prop) {
    // create the subscription category if it doesn't exist
    !subscribers[prop] && (subscribers[prop] = new Set())
    // add the element to the subscription category
    !subscribers[prop].has(this) && subscribers[prop].add(this)
    // add the prop to observedProperties if it's not there
    !this.observedProperties.has(prop) && this.observedProperties.add(prop)
  }

  unsubscribeFromProp(prop) {
    // remove from global subscribers
    subscribers[prop].delete(this)
    // remove from element's observedProperties
    this.observedProperties.delete(prop)
  }
}