Promise.resolve(new Response('这是中文')).then(res => {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let arr = [];
  let chunkLength = 2;
  async function push() {
    const { done, value } = await reader.read();
    if (done) {
      arr.forEach(buffer => console.log(decoder.decode(buffer, { stream: true })));
      return;
    }
    // 拆分成小块
    const uint32 = new Uint32Array(value.buffer, 0, Math.floor(value.length / 4)); // 4 的余数被移除
    for (let i = 0; i < Math.ceil(uint32.length / chunkLength); i++) {
      const rest = uint32.length - i * chunkLength;
      const length = rest > chunkLength ? chunkLength : rest;
      arr.push(new Uint32Array(uint32.buffer, i * chunkLength * 4, length));
    }

    push();
  };
  
  push();
});