fetch('/').then(res => {
  const reader = res.body.getReader();
  async function push() {
    const { done, value } = await reader.read();
    console.log(done, value, value && value.length);
    if (done) {
      return;
    }
    push();
  };
  
  push();
});