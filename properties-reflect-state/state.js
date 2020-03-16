import equal from '../common/fast-deep-equal.js'

const stateHandler = {
  set: (target, prop, value, receiver) => {
    // only update if the data has actually changed
    const sameObj = typeof value === 'object' && equal(value, target[prop])
    if (sameObj || target[prop] === value) return true
    // update the state
    target[prop] = value
    if (subscribers[prop]) {
      // update the subscribers
      subscribers[prop].forEach(s => {
        // implement our own WeakSet, since WeakSet isn't enumerable
        s.parentNode ? (s[prop] = value) : subscribers[prop].delete(s)
      })
    }
    return true
  },
  get: (target, prop, receiver) => prop in target ? target[prop] : undefined
}

const state = new Proxy({reportType: '', user: {name: '', dob: ''}}, stateHandler)
const subscribers = {}

export {state, subscribers}