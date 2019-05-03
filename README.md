## Overview
You only have a few things to keep track of. You don't want to load a whole library like Redux or MobX to manage your state. Well try this method instead. It takes advantage of JavaScript object proxies to let you subscribe to individual properties on the global state. With this, everything is stored on your custom element as properties instead of attributes (so no `attributeChangedCallback`). It assumes that if you care enough to wed an element to the state, you'll have no issues in making a custom element of it.

## Properties Reflect State
Sometimes you need your elements to be carrying the live data. Maybe you have a bunch of form fields that you need to collect data from at once. You wouldn't want to have to go to the state and try and map all of the properties to inputs. You would just want to grab all the fields and their data in one easy swoop. In a case like this, you'll want to mirror the state onto the element's properties.

### Usage
1. Make thee a custom element that extends my `SubscriberElement` class.
1. In the 'constructor', define a list of properties you want to observe. I call this: `observedProperties`. Soon this will be able to just be a field on the class (available as of Chrome 74). 
1. In the `connectedCallback`, call `this.subscribeToProps(this.observedProperties)`.
1. Implement a `propertyChangedCallback` on the element (in which you'll probably call `this.render()`).
1. Make getters and setters for each property. This could potentially be done in the `subscribeToProp` method, but I don't know if I want to take that flexibility away from the programmer.
1. If for whatever reason you need to stop listening to state changes for a certain prop, you can call `unsubscribeFromProp`, passing in the name of the undesired prop.

## State Only
**This method is preferred for most cases I run into.** Sometimes you don't care that the element itself is carrying the data; simply accessing it from elsewhere is fine. The most salient case is where the state is only affecting the visual aspect of your components. Such instances lend themselves very well to shielding your elements from the burden of bearing the state.

### Usage
The exact same as the Properties Reflect State version, except you don't need to make getters and setters (unless you're watching local attributes *in addition* to the global properties).

## Both
If you look at the two `subscriber-element.js` files, you'll notice they only differ by a constructor. You could extend the State Only `SubscriberElement`, add the constructor, and call that one something like `SubscriberWithProps`. Then you can use both in one app.

If you want to do this, you'll have to modify `state.js` to include a check to see which element it's extending. That would look like

```javascript
set: (target, prop, value, receiver) => {
  const sameObj = typeof value === 'object' && equal(value, target[prop]);
  if (sameObj || target[prop] === value) return true;
  const oldValue = target[prop];
  target[prop] = value;
  if (subscribers[prop]) {
    const s = subscribers[prop];
    for (let i = s.length; i-- !== 0;) {
      const element = s[i];
      // here's the exciting part
      if (Object.getPrototypeOf(Object.getPrototypeOf(element)).constructor.name === 'SubscriberElement') {
        element.propertyChangedCallback(prop, oldValue, value);
      } else {
        element[prop] = value;
      }
      
    }
  }
  return true;
}
Object.getPrototypeOf(Object.getPrototypeOf($0)).constructor.name
```

## Extras
### Server Integration
A beautiful aspect of this is that it's source-agnostic; it doesn't care where the change came from. You can receive an update from the server as JSON, parse and push it, and all your elements will get updated. I haven't done any testing in that regard.

### Rich Data, JS Optionals
My current preferred method for checking if object properties exist is: `(((level1 || {}).level2 || {}).level3 || {}).key`. There is [a TC-39 proposal](https://github.com/tc39/proposal-optional-chaining) in stage one for optional chaining syntax, so it could look like `obj?.level1?.level2?.level3?.key`. Isn't that just lovely? Anyway, the point is don't pass in rich data (like an object), then shoot yourself in the foot by not doing null checks on it.

### Smart `render()`
What should go in my render function? How do I make it smart? My first suggestion is to split your visual updates into two categories: content and style. If a visual update can be achieved by adding or removing a class, do that instead of resetting the entire `this.innerHTML`.

One idea is to have a `firstRender` function called inside of `connectedCallback`. Inside of this, you set `this.innerHTML` to the initial render, then you go through and create a registry of every node as a property on the element. Then inside of `propertyChangedCallback` you write it so that it only alters the nodes relevant to the updated property. Since they're already stored in a registry, there's no need for `querySelector`.

### Easy Web Server for Chrome
If you want to try out the demo but don't want to start up some command line server, try out [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en). Clone the repo, then point that server to the folder.

### Help, I'm Lost!
State management is when you have one piece of data that multiple components on your page need to know about all at the same time. An easy example is just the current page. You might want different components to render differently based on which view of your app the user is on. All of those components need to know what page you're switching to at the same time. So you keep that data in a central location and send out patches. Imagine your mom texting the family that dinner is ready. She only had to do one action, but every individual decides how they react to this update.
