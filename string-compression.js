process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    let output = '';
    let lastChar = '';
    let lastCharCount = 0;

    for (let char of chunk) {
      if (char === lastChar) {
        lastCharCount += 1;
      } else {
        output += lastChar + (lastCharCount > 1 ? lastCharCount : '');
        lastChar = char;
        lastCharCount = 1;
      }
    }
    output += lastChar + (lastCharCount > 1 ? lastCharCount : '');
    console.log(output);
  }
});
