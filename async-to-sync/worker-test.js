const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
  const sab = new SharedArrayBuffer(4);
  const int32 = new Int32Array(sab);
  const worker = new Worker(__filename, {
    workerData: {
      promiseStr: 'new Promise(resolve => setTimeout(resolve, 1000))',
      int32
    }
  });
  Atomics.wait(int32, 0, 0);
  console.log(int32[0]); // 123
} else {
  const {int32, promiseStr} = workerData;
  console.log('worker stdout');
  eval(promiseStr).finally(() => {
    Atomics.store(int32, 0, 123);
    Atomics.wake(int32, 0, 1);
  });
}
