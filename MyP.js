const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

class MyPromise {
  #thenCbs = []
  #catchCbs = []
  #state = STATE.PENDING
  #value
  #onSuccessBind = this.#onSuccess.bind(this)
  #onFailBind = this.#onFail.bind(this)
  constructor(cb) {
    try {
      cb(this.#onSuccessBind, this.#onFailBind)
    } catch (e) {
      this.#onFail(e)
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((cb) => {
        cb(this.#value)
      })

      this.#thenCbs = []
    }

    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach((cb) => {
        cb(this.#value)
      })

      this.#catchCbs = []
    }
  }

  #onSuccess(value) {
    if (this.#state !== STATE.PENDING) return
    this.#value = value
    this.#state = STATE.FULFILLED
  }

  #onFail(value) {
    if (this.#state !== STATE.PENDING) return
    this.#value = value
    this.#state = STATE.REJECTED
  }

  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
      if (thenCb != null) {
        this.#thenCbs.push(thenCb)
      }
      if (catchCb != null) {
        this.#catchCbs.push(catchCb)
      }
      this.#runCallbacks()
    })
  }

  catch(cb) {
    this.then(undefined, cb)
  }

  finally(cb) {
    this.then(cb, cb)
  }
}

module.exports = MyPromise
