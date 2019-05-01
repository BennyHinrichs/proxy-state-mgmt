## Overview
You only have a few things to keep track of. You don't want to load a whole library like Redux or MobX in to manage your state. Well try this method instead. It takes advantage of JavaScript object proxies and the custom element `attributeChangedCallback`

## Usage
In your `connectedCallback`, use `subscribers.push({ element: this, props: ['prop1','prop2',...] })` to subscribe your custom element to patches made to any props in that list. From there you just need a simple getter and setter for each attribute, along with `attributeChangedCallback` to render (or whatever other shenanigans you get up to).

### Rich Data
I know, you want to be like the big kids and not put rich data in attributes. But there's no `propertyChangedCallback`, only `attributeChangedCallback`. Darned inconvient. My current solution around this is to have two fields on your class, e.g. `user` and `_user`. Here, `user` is the primitive attribute and `_user` is the rich data property. We leverage the native `attributeChangedCallback` to do our listening and our setter looks like

```javascript
set user(val) {
  this._user = val; // set the rich data property
  return this.setAttribute('user', val); // trigger attributeChangedCallback
}
```

You might be wondering why I'm not checking to see if the values are different here. It's because that's already happening in `state.js`. The check is just done in one place, so you don't have to do it in every single element you make. However, if you're expecting people to update your components through other routes than the state, you'll want to include checks at the component level.

## Future Work
I have vaguely envisioned a function that returns endless proxies as you more and more deeply access object properties.