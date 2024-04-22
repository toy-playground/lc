class PriorityQueue<T> {
  data: T[];
  compare: (a: T, b: T) => number;
  constructor(compare: (a: T, b: T) => number) {
    if (typeof compare !== "function") {
      throw new Error("compare function required!");
    }

    this.data = [];
    this.compare = compare;
  }
  //二分查找 寻找插入位置
  search(target:T) {
    let low = 0,
      high = this.data.length;
    while (low < high) {
      let mid = low + ((high - low) >> 1);
      if (this.compare(this.data[mid], target) > 0) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    return low;
  }
  //添加
  push(elem:T) {
    let index = this.search(elem);
    this.data.splice(index, 0, elem);
    return this.data.length;
  }
  //取出最优元素
  pop() {
    return this.data.pop();
  }
  //查看最优元素
  peek() {
    return this.data[this.data.length - 1];
  }
  length() {
    return this.data.length;
  }
}

function dijiskra(n: number, g: number[][][], start: number): number[] {
  const dis = new Array(n).fill(Infinity);
  const visited = new Array(n).fill(false);

  dis[start] = 0;
  let queue = new PriorityQueue<{ val: number; w: number }>(
    (a, b) => a.w - b.w
  );
  queue.push({val:start,w:0})

  while (queue.length) {
    const { val: currentNode, w: weight } = queue.pop()!;
    if(weight > dis[currentNode])continue;

    visited[currentNode] = true;
    for (let i = 0; i < g[currentNode].length; ++i) {
      const [dest, neighborWeight] = g[currentNode][i];
      if (neighborWeight != Infinity) {
        const nextW = neighborWeight + weight;
        if(nextW < dis[dest]) {
            dis[dest] = nextW;
            queue.push({val:dest,w:nextW})
        }
      }
    }
  }
  return dis;
}

function findAnswer(n: number, edges: number[][]): boolean[] {
  // build graph
  const g: number[][][] = Array.from({ length: n }, () => []);
  for (const [a, b, w] of edges) {
    g[a].push([b, w]);
    g[b].push([a, w]);
  }

  const min = dijiskra(n, g, 0);
  const min2 = dijiskra(n, g, n - 1);

  const res = new Array(edges.length).fill(false);
  if (min[n - 1] === Infinity) return res;
  for (const [i, [a, b, w]] of edges.entries()) {
    if (
      min[a] + min2[b] + w === min[n - 1] ||
      min[b] + min2[a] + w === min[n - 1]
    )
      res[i] = true;
  }
  return res;
}

// function findAnswer(n: number, edges: number[][]): boolean[] {
//     // build graph
//     const g:number[][][] = Array.from({ length: n }, () => []);
//     const indexG = new Map<string,number>();
//     for (const [i,[a, b, w]] of edges.entries()) {
//         g[a].push([b, w])
//         g[b].push([a, w])
//         indexG.set([a,b].join('-'),i);
//         indexG.set([b,a].join('-'),i);
//     }

//     const min = new Array(n).fill(Infinity);

//     const minPath: Array<number>[] = new Array(n).fill([]);
//     min[0] = 0;
//     let queue = [0];

//     while (queue.length) {
//       const currentNode: number = queue.shift()!;
//       for (let i = 0; i < g[currentNode].length; ++i) {
//         const [dest,neighborWeight] = g[currentNode][i];
//         if (neighborWeight != Infinity) {
//           if (min[currentNode] + neighborWeight < min[dest]) {
//             min[dest] = min[currentNode] + neighborWeight;
//             minPath[dest] = [currentNode];

//             queue.push(dest);
//           } else if (min[currentNode] + neighborWeight === min[dest]) {
//             minPath[dest].push(currentNode);
//           }
//         }
//       }
//     }
//     const res = new Array(edges.length).fill(false);
//     queue = [n - 1];
//     while (queue.length) {
//       const currenNode = queue.shift()!;
//       for (let path of minPath[currenNode]) {
//         res[indexG.get([path,currenNode].join('-'))!] = true;
//         queue.push(path);
//       }
//     }
//     return res;
//   }
