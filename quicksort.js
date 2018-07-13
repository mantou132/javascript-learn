var arr = [];

// 生成随机整数
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成len长度的随机数组
function generateArr(len) {
  for (var i = 0; i < len; i++) {
    arr.push(random(1, len));
  }
}

generateArr(1000000);

var a = 0;
var performance = require('perf_hooks').performance;
Array.prototype.quick_sort = function() {
	var len = this.length;
	if (len <= 1)
		return this.slice(0);
	var left = [];
	var right = [];
	var mid = [this[0]];
	for (var i = 1; i < len; i++)
		if (this[i] < mid[0])
			left.push(this[i]);
		else
      right.push(this[i]);
  var start = performance.now();
  const result = left.quick_sort().concat(mid, right.quick_sort());
  a += performance.now() - start;
  return result;
};


console.time('exec');
arr.quick_sort();
console.timeEnd('exec');
console.log(a);
console.log(process.memoryUsage());