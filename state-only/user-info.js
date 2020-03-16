import {state} from './state.js'
import SubscriberElement from './subscriber-element.js'

class UserInfo extends SubscriberElement {
  constructor() {
    super()
    this.observedProperties = new Set(['user'])
  }
  render() {
    this.innerHTML = state.user.name && state.user.dob ? `${state.user.name} was born on ${state.user.dob}` : 'Fill out the input fields'
  }
}
customElements.define('user-info', UserInfo)