const subscribers = [];
const stateHandler = {
  set: (target, prop, value, receiver) => {
    if (target[prop] === value) return true;
    target[prop] = value;
    for (const s of subscribers) {
      if (s.props.indexOf(prop) > -1) s.element[prop] = value;
    }
    console.log(target);
    return true;
  },
  get: (target, prop, receiver) => prop in target ? target[prop] : undefined
};
const state = new Proxy({type: '', user: {name: 'Widge', dob: '1990-08-28'}}, stateHandler);
export {state, subscribers};