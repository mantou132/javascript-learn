const afn = async function () {
  await new Promise(resolve => {
    setTimeout(() => {
      console.log(Date.now());
      resolve();
    }, 1000)
  })
}
async function* gen(){
  for (let i = 0; i < 3; i++) {
    yield afn();
  }
};
const it = gen();

async function fn () {
  for await (const promise of it) {
    console.log('o');
  }
}

fn();