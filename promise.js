const _queueMicrotask = typeof queueMicrotask === 'function' ? queueMicrotask : function (callback) {
  setTimeout(callback);
}

class A {
  constructor (fn) {
    this._state = 'pending';
    this._onFulfillment = [];
    this._onRejection = [];
    this._value = undefined;

    const resolve = (result) => {
      if (this._state === 'pending') {
        this._state = 'fulfilled';
        this._value = result;
        this._onFulfillment.forEach(e => e(result));
      }
    };
    const reject = (err) => {
      if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = err;
        this._onRejection.forEach(e => e(err));
      }
    };
    fn(resolve, reject);
  }
  then(_onFulfillment, _onRejection) {
    let resolve;
    let reject;
    const promise = new A((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });
    const onFulfillment = (result) => {
      const r = _onFulfillment(result);
      if (r instanceof A) {
        r.then(resolve);
      } else {
        resolve(r);
      }
    };
    this._onFulfillment.push(onFulfillment);
    const onRejection = (err) => {
      this._onRejection = (err) => {
        const r = _onRejection(err);
        if (r instanceof A) {
          r.catch(reject);
        } else {
          reject(r);
          promise._state = 'fulfilled';
        }
      };
    };
    this._onRejection.push(onRejection);
    if (this._state === 'fulfilled') {
      _queueMicrotask(() => onFulfillment(this._value));
    }
    if (this._state === 'rejected') {
      _queueMicrotask(() => onRejection(this._value));
    }
    return promise;
  }
  catch(_onRejection) {
    let resolve;
    let reject;
    const promise = new A((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });
    const onRejection = (err) => {
      const r = _onRejection(err);
      if (r instanceof A) {
        r.catch(reject);
      } else {
        reject(r);
        promise._state = 'fulfilled';
      }
    };
    this._onRejection.push(onRejection);
    if (this._state === 'rejected') {
      _queueMicrotask(() => onRejection(this._value));
    }
    return promise;
  }
  static resolve(result) {
    if (result instanceof A) return result;
    return new A((resolve) => {
      resolve(result);
    });
  }
  static reject(err) {
    return new A((resolve, reject) => {
      reject(err);
    });
  }
}

new A((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000)
})
  .then((result) => {
    console.log(result)
    return A.resolve(1);
  })
  .then((result) => {
    console.log({result});
  })