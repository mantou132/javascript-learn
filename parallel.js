function parallel(tasks, limit = 3) {
  const pool = new Set;
  tasks.reduce((preValue, task) => {
    const exec = () => {
      const t = task();
      pool.add(t);
      t.finally(() => pool.delete(t));
    };
    if (pool.size < limit - 1) {
      exec();
      return true;
    } else {
      return Promise.resolve(preValue).finally(() => {
        exec();
        return Promise.race(pool);
      });
    }
  }, false);
}

const sleep = (t) => {
  return new Promise(resolve => {
    setTimeout(resolve, t);
  });
};

parallel([
  async () => {
    console.log('start: 1000');
    await sleep(1000);
    console.log(1000);
  },
  async () => {
    console.log('start: 2000');
    await sleep(2000);
    console.log(2000);
  },
  async () => {
    console.log('start: 3000');
    await sleep(3000);
    console.log(3000);
    return Promise.reject(3000);
  },
  async () => {
    console.log('start: 4000');
    await sleep(4000);
    console.log(4000);
  },
  async () => {
    console.log('start: 5000');
    await sleep(5000);
    console.log(5000);
  },
  async () => {
    console.log('start: 6000');
    await sleep(6000);
    console.log(6000);
  },
  async () => {
    console.log('start: 7000');
    await sleep(7000);
    console.log(7000);
  },
]);