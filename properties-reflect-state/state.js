import equal from '../common/fast-deep-equal.js';

const stateHandler = {
  set: (target, prop, value, receiver) => {
    // only update if the data has actually changed
    const sameObj = typeof value === 'object' && equal(value, target[prop]);
    if (sameObj || target[prop] === value) return true;
    // update the state
    target[prop] = value; 
    if (subscribers[prop]) {
      // update the subscribers
      const s = subscribers[prop];
      for (let i = s.length; i-- !== 0;) s[i][prop] = value;
    }
    return true;
  },
  get: (target, prop, receiver) => prop in target ? target[prop] : undefined
};
const state = new Proxy({reportType: '', user: {name: '', dob: ''}}, stateHandler);
const subscribers = {};

export {state, subscribers};