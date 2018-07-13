const afn = async function () {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(Date.now());
      (Math.random() > .9 ? resolve : reject)();
    }, 1000)
  })
}
async function reTry(afn, count){
  for (let i = 1; i <= count; i++) {
    try {
      await afn();
      return;
    } catch (e) {
      console.log(`retry: ${i}`);
      if (i === count) {
        throw new Error(`${count} fail`);
      }
    }
  }
};

reTry(afn, 3).then(() => console.log('then')).catch(() => console.log('catch'));