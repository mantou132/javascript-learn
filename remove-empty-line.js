function removeEmptyLine(text) {
  return text.replace(/(\r?\n)\s*\1+/g, '$1');
}

console.assert(removeEmptyLine('a\r\nb') === 'a\r\nb');
console.assert(removeEmptyLine('a\r\n\r\nb') === 'a\r\nb');
console.assert(removeEmptyLine('a\r\n \r\nb') === 'a\r\nb');
console.assert(removeEmptyLine('a\r\n \r\n  \r\nb') === 'a\r\nb');
console.assert(removeEmptyLine('a\r\n \r\n 2\r\n  \r\nb') === 'a\r\n 2\r\nb');
console.assert(removeEmptyLine('a\nb') === 'a\nb');
console.assert(removeEmptyLine('a\n\nb') === 'a\nb');
console.assert(removeEmptyLine('a\n \nb') === 'a\nb');
console.assert(removeEmptyLine('a\n \n  \nb') === 'a\nb');
console.assert(removeEmptyLine('a\n \n2 \n  \nb') === 'a\n2 \nb');