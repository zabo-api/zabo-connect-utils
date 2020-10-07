const SYNC_INTERVAL = 2000

class Adapter {
  constructor (nameSpace, events) {
    this._events = events || {
      on: (event, callback) => window.oc.events.on(`${event}.${nameSpace}`, callback),
      fire: (event, ...args) => window.oc.events.fire(event, [nameSpace, ...args]),
      reset: () => window.oc.events.reset()
    }

    this._close = this._close.bind(this)
    this.observe = this.observe.bind(this)
    this.start = this.start.bind(this)
    this.close = this.close.bind(this)

    this._synced = false
    this._syncInterval = null
  }

  _close () {
    window.clearInterval(this._syncInterval)
    this._synced = false
    this._events.fire('ACK')
  }

  observe (event, resolve) {
    this._events.on(event, (e, ...args) =>
      resolve(...args)
        .then(res => this._events.fire(`on${event}`, res))
        .catch(err => this._events.fire('onerror', err))
    )
  }

  start () {
    this._events.on('SYN-ACK', () => {
      this._synced = true
      this._events.fire('ACK')
    })

    this._events.on('FIN', () => {
      this._close()
    })

    this._syncInterval = window.setInterval(() => {
      this._events.fire('SYN')
    }, SYNC_INTERVAL)
  }

  close () {
    this._events.fire('FIN')
  }
}

export default Adapter
