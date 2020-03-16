import SubscriberElement from './subscriber-element.js'

class TypeBanner extends SubscriberElement {
  observedProperties = new Set(['reportType'])
  #messages = {
    current: 'Report generated from current system data.',
    modify: 'Modifying system data for new report. Any changes will be saved to the system.',
    mock: 'Working with temporary values. No changes will be saved to the system.',
  }

  propertyChangedCallback(prop, oldValue, newValue) {
    console.log('this propertyChangedCallback has been overridden')
    super.propertyChangedCallback()
  }

  setMessage(reportType) {
    this.message = this.#messages[reportType] || 'Select below how you want the report to be generated'
  }

  get reportType() {
    return this.properties.reportType
  }
  set reportType(val) {
    this.setMessage(val)
    this.properties.reportType = val
  }
  
  render() {
    this.innerText = this.message
  }
}
customElements.define('type-banner', TypeBanner)