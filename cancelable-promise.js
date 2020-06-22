class CancelablePromise extends Promise {
  static resolve(v) {
    return new CancelablePromise((res) => res(v));
  }

  static reject(v) {
    return new CancelablePromise((res, rej) => rej(v));
  }

  constructor(executor, options) {
    super(executor);
    this.options = options || { isCanceled: false };
  }

  cancel() {
    this.options.isCanceled = true;
    return new CancelablePromise((res) => res());
  }

  then(onfulfilled, onrejected) {
    return new CancelablePromise((res, rej) => {
      super.then(
        (v) => !this.options.isCanceled && res(onfulfilled?.(v)),
        (v) => !this.options.isCanceled && rej(onrejected?.(v)),
      );
    }, this.options);
  }

  catch(onrejected) {
    return new CancelablePromise((res) => {
      super.then(res, (v) => !this.options.isCanceled && res(onrejected(v)));
    }, this.options);
  }

  finally(onfinallyed) {
    return new CancelablePromise((res, rej) => {
      super.then((v) => {
        onfinallyed();
        res(v);
      }, (v) => {
        onfinallyed();
        rej(v);
      });
    }, this.options);
  }
}

// example

CancelablePromise.resolve("not log 2")
  .finally((e) => console.log(e ? "not log 1" : "log 1"))
  .catch(console.log);

CancelablePromise.reject("log 3")
  .finally((e) => console.log(e ? "not log 3" : "log 2"))
  .catch(console.log);

CancelablePromise.resolve("static resolve 1")
  .catch(console.log)
  .then(console.log);

CancelablePromise.resolve("static resolve 2").then(console.log);

const p = new CancelablePromise((resolve) => {
  console.log("log 4");
  setTimeout(() => resolve(), 1000);
}).then(() => {
  console.log("not log 4");
});

setTimeout(() => {
  p.cancel().then(() => console.log("log 5"));
}, 10);
