## Overview
You only have a few things to keep track of. You don't want to load a whole library like Redux or MobX to manage your state. Well try this method instead. It takes advantage of JavaScript object proxies to let you subscribe to individual properties on the global state. With this, everything is stored on your custom element as properties instead of attributes (so no `attributeChangedCallback`). It assumes that if you care enough to wed an element to the state, you'll have no issues in making a custom element of it.

## Usage
1. Make thee a custom element that extends my `SubscriberElement` class.
1. In the 'constructor', define a list of properties you want to observe. I call this: `observedProperties`. Soon this will be able to just be a field on the class (available as of Chrome 74). 
1. In the `connectedCallback`, call `this.subscribeToProps(this.observedProperties)`.
1. Make getters and setters for each property. This could potentially be done in the `subscribeToProp` method, but I don't know if I want to take that flexibility away from the programmer.
1. Implement a `propertyChangedCallback` on the element. Strictly, this isn't necessary. Perhaps you just care that the element has data on it, and it will be read by something else. Though if that's the case, why don't you just read from the global `state` instead?
1. If for whatever reason you need to stop listening to state changes for a certain prop, you can call `unsubscribeFromProp`, passing in the name of the undesired prop.

### Rich Data
My current preferred method for checking if object properties exist is: `(((level1 || {}).level2 || {}).level3 || {}).key`. There is [a TC-39 proposal](https://github.com/tc39/proposal-optional-chaining) in stage one for optional chaining syntax, so it could look like `obj?.level1?.level2?.level3?.key`. Isn't that just lovely? Anyway, the point is don't pass in rich data (like an object), then shoot yourself in the foot by not doing null checks on it.

## Extras
If you want to try out the demo but don't want to start up some command line server, try out [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en). Clone the repo, then point that server to the folder.
