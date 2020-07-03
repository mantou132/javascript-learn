const root = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
    },
    right: {
      val: 5,
    }
  },
  right: {
    val: 3,
    left: {
      val: 6,
    },
    right: {
      val: 7
    }
  }
}

function traversal(rt) {
  const nodes = [];
  const queue = [rt];
  while (queue.length) {
    const node = queue.shift();
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
    nodes.push(node);
  }
  return nodes;
}
console.log(traversal(root).map(e => e.val));
