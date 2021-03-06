// MOCKING
/* eslint-env mocha */
/* eslint-disable no-console */
global.window = {
  location: {
    origin: 'http://localhost:3000',
    href: 'http://localhost:3000/initial'
  },
  history: {}
}
global.history = {
  pushState (_, __, value) {
    window.location.href = window.location.origin + value
    window.location.lastChangedWith = 'pushState'
  },
  replaceState (_, __, value) {
    window.location.href = window.location.origin + value
    window.location.lastChangedWith = 'replaceState'
  }
}
global.addEventListener = global.window.addEventListener = () => {}
global.window.CustomEvent = () => {}
global.window.dispatchEvent = () => {}
global.document = {}
console.warn = function (message) {
  console.warn.warnings.push(message)
}
console.warn.warnings = []

const addressbar = require('addressbar')

module.exports = {
  triggerUrlChange (url) {
    let defaultPrevented = false

    addressbar.emit('change', {
      preventDefault () {
        defaultPrevented = true
      },
      target: {value: addressbar.origin + url}
    })
    if (!defaultPrevented) addressbar.value = url
  }
}
