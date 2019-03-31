run().then(() => console.log('success'), error => console.error(error.stack));

async function run() {
  await new Promise(resolve => setTimeout(resolve, 10));
  await foo();
}

async function foo() {
  await new Promise(resolve => setTimeout(resolve, 10));
  await bar();
}

async function bar() {
  await Promise.resolve();
  await baz();
}

async function baz() {
  await Promise.resolve();
  throw new Error('Oops');
}