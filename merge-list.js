function mergeList(a, b) {
  let result;
  let node1;
  let node2;
  if (a.value < b.value) {
    result = { value: a.value };
    node1 = a.next;
    node2 = b;
  } else {
    result = { value: b.value };
    node1 = a;
    node2 = b.next;
  }
  let current = result;
  while (node1 && node2) {
      if (node1.value < node2.value) {
          current = current.next = {value: node1.value};
          node1 = node1.next;
      } else {
          current = current.next = {value: node2.value};
          node2 = node2.next;
      }
  }
  if (node1) {
    current.next = node1;
  }
  if (node2) {
    current.next = node2;
  }
  return result;
}