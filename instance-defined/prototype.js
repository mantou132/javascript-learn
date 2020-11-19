class A {
  
}

Object.defineProperty(A.prototype, 'prop', {
  get() {
    const that = this;
    return !!that.internals?.states?.contains(attr);
  },
  set(v) {
    const that = this;
    const internals = that.internals;
    if (v) {
      internals.states.add(attr);
    } else {
      internals.states.remove(attr);
    }
  },
});

console.time('time');
const a = new Array(100_000).fill(null).map(() => new A())
console.timeEnd('time');

console.log(process.memoryUsage())