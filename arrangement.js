function permutation(arr, index = 0) {
  const length = arr.length;
  if (index === length) {
    console.count('index');
    console.log(arr);
  }
  for(let i = index; i < length; i++) {
    [arr[i], arr[index]] = [arr[index], arr[i]]
    permutation(arr, index + 1);
    [arr[index], arr[i]] = [arr[i], arr[index]];
  }
}
permutation([1,2,3,4]);