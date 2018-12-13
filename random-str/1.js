export default function getValidCodeArray(n, bit) {
  const set = new Set;
  const getRandomStr = () => {
    let str = Math.random().toString().substr(2, bit);
    if (set.has(str)) {
      str = getRandomStr();
    }
    return str;
  };
  for (let i = 0; i < n; i++) {
    set.add(getRandomStr());
  }
  return [...set];
}