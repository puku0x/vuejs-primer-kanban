exports.command = function(selector, ecent, keyCode) {
  return this.execute(function(selector, ecent, keyCode) {
    var e = document.createEvent('HTMLEvents')
    e.initEvent(event, true, true)
    if (keyCode) {
      e.keyCode = keyCode
    }
    document.querySelector(selector).dispatchEvent(e)
  }, [selector, event, keyCode])
}
