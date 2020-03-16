import { state, subscribers } from './state.js'

export default class SubscriberElement extends HTMLElement {
  constructor() {
    super()
    this.properties = new Proxy({}, {
      set: (obj, prop, newValue) => {
        const oldValue = obj[prop]
        obj[prop] = newValue
        this.propertyChangedCallback(prop, oldValue, newValue)
        return true
      },
      get: (obj, prop) => prop in obj ? obj[prop] : undefined
    })
  }

  connectedCallback() {
    this.subscribeToProps(this.observedProperties)
    this.render()
  }
  
  propertyChangedCallback(name, oldValue, newValue) {
    this.render()
  }

  subscribeToProp(prop) {
    // create the subscription category if it doesn't exist
    !subscribers[prop] && (subscribers[prop] = new Set())
    // add the element to the subscription category
    subscribers[prop].add(this)
    // initialize the element's prop to the state's prop
    this[prop] = state[prop]
    // add the prop to observedProperties if it's not there
    !this.observedProperties.has(prop) < 0 && this.observedProperties.add(prop)
  }

  unsubscribeFromProp(prop) {
    // remove from global subscribers
    subscribers[prop].delete(this)
    // remove from element's observedProperties
    this.observedProperties.delete(prop)
  }

  subscribeToProps(props) {
    props.forEach(p => this.subscribeToProp(p))
  }
}