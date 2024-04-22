function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  const indexG = new Map<string, number>();

  const graph = new Map<string, { node: string; val: number }[]>();

  let nodesLength = 0;
  for (let i = 0; i < equations.length; ++i) {
    const a = equations[i][0];
    const b = equations[i][1];
    const w = values[i];
    if (!graph.has(a)) {
      graph.set(a, []);
      indexG.set(a, nodesLength++);
    }
    if (!graph.has(b)) {
      graph.set(b, []);
      indexG.set(b, nodesLength++);
    }
    graph.get(a)!.push({ node: b, val: w });
    graph.get(b)!.push({ node: a, val: 1 / w });
  }

  console.log(graph,indexG);


  const res: number[] = [];
  for (let query of queries) {
    let result = -1.0;
    const a = query[0];
    const b = query[1];
    if (graph.has(a) && graph.has(b)) {
      if (a === b) result = 1.0;
      else {
        const queue = [a];
        const p = new Array(nodesLength).fill(-1);
        p[indexG.get(a)!] = 1;
        const targetI = indexG.get(b)!;
        while (queue.length) {
          const currenNode = queue.shift();
          const currentI = indexG.get(currenNode!)!;
          for (let neighbor of graph.get(currenNode!)!) {
            const indexN = indexG.get(neighbor.node)!;
            if (p[indexN] === -1) {
              p[indexN] = p[currentI] * neighbor.val;
              queue.push(neighbor.node);
            }
          }
          if (p[targetI] !== -1) {
            break;
          }
        }
        result = p[targetI];
      }
    }
    res.push(result);
  }
  return res;
}

console.log(calcEquation(
  [
    ["a", "b"],
    ["b", "c"],
  ],
  [2.0, 3.0],
  [
    ["a", "c"],
    // ["b", "a"],
    // ["a", "e"],
    // ["a", "a"],
    // ["x", "x"],
  ]
));
