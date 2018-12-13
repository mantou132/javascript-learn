export default function getValidCodeArray(n, bit) {
  // const total = []
  // const arr = []
  // for (let i = 0; i < Math.pow(10, bit); i++) {
  //   total[i] = i
  // }
  // for (let i = 0; i < n; i++) {
  //   const index = Math.floor(Math.random() * (n - i))
  //   arr[i] = total[index]
  //   total.splice(index, 1)
  // }
  // return arr
  const arr = [];
  const getRandomStr = () => {
    let str = Math.random().toString().substr(2, bit);
    if (arr.includes(str)) {
      str = getRandomStr();
    }
    return str;
  };
  for (let i = 0; i < n; i++) {
    arr[i] = getRandomStr();
  }
  return arr;
}