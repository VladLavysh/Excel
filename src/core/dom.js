class Dom {
  constructor(selector) {
    //this.$$listeners = {}
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html
      return this
      // для успешного выполнения чейна (метод должен что-то вернуть)
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html("")
    return this
  }

  on(eventType, callback) {
    //this.$$listeners[eventType] = callback
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    // -------
    this.$el.removeEventListener(eventType, callback)
  }

  // полифилл для метода append
  append(node) {
    if (node instanceof Dom)
      node == node.$el

    if (Element.prototype.append)
      this.$el.append(node.$el)
    else
      this.$el.appendChild(node.$el)

    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = "") => {
  const el = document.createElement(tagName)
  if (classes) el.classList.add(classes)

  return $(el)
}
