const {Worker} = require('worker_threads');

const worker = new Worker('./worker.js');

const sab = new SharedArrayBuffer(4);
const int32 = new Int32Array(sab);

worker.postMessage(sab);

worker.on('message', data => console.log('message', data));
worker.on('error', data => console.log('error', data));
worker.on('exit', data => console.log('exit', data));

// Atomics.wait(int32, 0, 0);
console.log(int32[0]); // 123

setTimeout(() => void 0, 1000);
