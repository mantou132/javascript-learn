function add(a, b) {
  let result = "";
  for (
    let ai = a.length - 1, bi = b.length - 1, hBit = 0;
    ai >= 0 || bi >= 0 || hBit;
    ai--, bi--
  ) {
    const sum = Number(a[ai] || 0) + Number(b[bi] || 0) + hBit;
    hBit = Math.floor(sum / 10);
    result = String(sum % 10) + result;
  }
  return result;
}

console.assert(add('1', '2') === '3');
console.assert(add('6', '5') === '11');
console.assert(add('9', '0') === '9');
console.assert(add('99', '1') === '100');