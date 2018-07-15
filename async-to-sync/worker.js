// worker 不工作，直接退出
setTimeout(() => {}, 1000);

// const {MessagePort, parentPort} = require('worker_threads');
// parentPort.postMessage('parse(script)');

// MessagePort.on('message', sab => {
//   const int32 = new Int32Array(sab);

//   const promise = new Promise(resolve => setTimeout(resolve));
//   promise.finally(() => {
//     Atomics.store(int32, 0, 123);
//     Atomics.wake(int32, 0, 1);
//   });
// });
