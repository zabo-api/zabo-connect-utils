class Storage {
  constructor () {
    this._storage = this._getStorage()
    this._fallback = {}
  }

  _getStorage () {
    try {
      return window.sessionStorage
    } catch (err) {}

    try {
      return window.localStorage
    } catch (err) {}

    return null
  }

  setItem (name, value) {
    if (this._storage) {
      return this._storage.setItem(name, value)
    }
    this._fallback[name] = value
  }

  getItem (name) {
    if (this._storage) {
      return this._storage.getItem(name)
    }
    return this._fallback[name]
  }

  removeItem (name) {
    if (this._storage) {
      return this._storage.removeItem(name)
    }
    delete this._fallback[name]
  }

  clear () {
    if (this._storage) {
      return this._storage.clear()
    }
    this._fallback = {}
  }

  key (n) {
    if (this._storage) {
      return this._storage.key(n)
    }
    return Object.keys(this._fallback)[n]
  }

  get length () {
    if (this._storage) {
      return this._storage.length
    }
    return Object.keys(this._fallback).length
  }
}

export default new Storage()
