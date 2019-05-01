const subscribers = [];
const stateHandler = {
  set: (target, prop, value, receiver) => {
    const sameObj = typeof value === 'object' && JSON.stringify(value) === JSON.stringify(target[prop]);
    if (sameObj || target[prop] === value) return true;
    target[prop] = value; // update the state
    for (const s of subscribers) { // update the subscribed elements
      if (s.props.indexOf(prop) > -1) s.element[prop] = value;
    }
    // console.log(target);
    return true;
  },
  get: (target, prop, receiver) => prop in target ? target[prop] : undefined
};
const state = new Proxy({type: '', user: {name: '', dob: ''}}, stateHandler);
export {state, subscribers};