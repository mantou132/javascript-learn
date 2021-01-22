function add(a, b) {
  return new Promise(res => setTimeout(() => res(a + b), Math.random() * 1000))
}

async function sum(...arg) {
  const numbs = [...arg];
  const tasks = new Set();
  let result = 0;

  const addTask = (a, b) => {
    const task = add(a, b).then(n => {
      tasks.delete(task);
      result = n;
      return n;
    });
    tasks.add(task);
  };

  for (let i = 1; i < numbs.length; i += 2) {
    addTask(numbs.pop(), numbs.pop())
  }

  while (tasks.size) {
    const n = await Promise.race([...tasks])
    if (numbs.length) {
      addTask(numbs.pop(), n);
    } else {
      numbs.push(n);
    }
  }
  return result;
}
