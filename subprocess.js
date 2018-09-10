setTimeout(() => {
  console.log('end');
}, 90000)

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.');
});
