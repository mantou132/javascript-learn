const uploadLimit = 4;
const uploadPool = new Map;
const paths = Array(13).fill().map((e, i) => i);

const upload = (path) => new Promise(resolve => {
  console.log('ing:', path, uploadPool.size);
  setTimeout(resolve, 1000 * (1 + Math.random()));
}).then(() => {
  console.log('uploaded:', path, uploadPool.size);
  return path;
});

paths.reduce((prevValue, path, index) => {
  if (uploadPool.size < uploadLimit) {
    uploadPool.set(path, upload(path));
    return Promise.race(uploadPool.values());
  } else {
    return prevValue.then(uploadedPath => {
      uploadPool.delete(uploadedPath);
      uploadPool.set(path, upload(path));
      return Promise.race(uploadPool.values());
    });
  }
}, true).then(() => Promise.all(uploadPool.values())).then(() => {
  console.log('complete');
});
