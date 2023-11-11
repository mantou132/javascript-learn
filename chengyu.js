const dictionary = new Set(
  Array.from({ length: 9 }, (_, index) =>
    Array.from({ length: 9 }, (_, idx) => `${idx + 1}${index + 1}`)
  ).flat()
);

function find(str) {
  // TODO: 使用分词器 和 flatMap
  const segments = [...dictionary]
    .map((segment) => [...str.matchAll(new RegExp(segment, "g"))])
    .flat();
  const segmentsStartsGroupMap = Map.groupBy(
    segments,
    (segment) => segment[0][0]
  );
  const segmentsEndsGroupMap = Map.groupBy(segments, (segment) =>
    segment[0].at(-1)
  );

  const used = new Set();
  const result = [];
  const genLink = (nextSegment, origin = [], forward = true) => {
    used.add(nextSegment[0]);

    // TODO: 使用双向链表
    const link = forward ? [...origin, nextSegment] : [nextSegment, ...origin];
    if (origin.find((e) => e == nextSegment)) {
      // return result.push(origin);
      return result.push(link);
    }
    const starts = segmentsEndsGroupMap.get(link[0][0][0]);
    const ends = segmentsStartsGroupMap.get(link.at(-1)[0].at(-1));

    if (!ends && !starts) {
      return result.push(link);
    }

    if (ends) {
      ends.forEach((segment) => genLink(segment, link, true));
    }
    if (starts) {
      starts.forEach((segment) => genLink(segment, link, false));
    }
  };
  segments.forEach((segment) => {
    if (used.has(segment[0])) return;
    genLink(segment);
  });
  return result.sort((a, b) => b.length - a.length);
}

function test(str) {
  console.log(`===============${str}`);
  console.log(find(str));
  console.log(`===============${str}`);
}

test("0450120230240");
test("045012023024054");
test("045012023024054044");
