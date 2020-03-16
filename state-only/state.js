import equal from '../common/fast-deep-equal.js'

const stateHandler = {
  set: (target, prop, value, receiver) => {
    // only update if the data has actually changed
    const sameObj = typeof value === 'object' && equal(value, target[prop])
    if (sameObj || target[prop] === value) return true
    // update the state
    const oldValue = target[prop]
    target[prop] = value
    if (subscribers[prop]) {
      // notify the subscribers
      subscribers[prop].forEach(s => s.propertyChangedCallback(prop, oldValue, value))
    }
    return true
  },
  get: (target, prop, receiver) => prop in target ? target[prop] : undefined
}

const state = new Proxy({reportType: '', user: {name: '', dob: ''}}, stateHandler)
const subscribers = {}

export {state, subscribers}