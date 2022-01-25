export default {
  get: function(key) {
    return window.localStorage[key]
      ? JSON.parse(window.localStorage[key])
      : null
  },
  set: function(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
    return JSON.parse(window.localStorage[key])
  },
  del: function(key) {
    window.localStorage.removeItem(key)
    return true
  }
}
