"use strict";
const fetchSmartCaptcha = src => {
  scriptLoad = new Promise((resolve, reject) => {
    // ...
  });
  return scriptLoad;
};
Promise.all([
  fetchSmartCaptcha('//g.alicdn.com/sd/nvc/1.1.112/guide.js'),
  fetchSmartCaptcha('//g.alicdn.com/sd/smartCaptcha/0.0.1/index.js')
]).catch(console.log);
