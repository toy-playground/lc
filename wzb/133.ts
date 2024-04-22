/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     neighbors: Node[]
 *     constructor(val?: number, neighbors?: Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 */

class TNode {
  val: number;
  neighbors: TNode[];
  constructor(val?: number, neighbors?: TNode[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

class CustomNode extends TNode {
  visited: boolean;
  constructor(val?: number, neighbors?: TNode[], visited?: boolean) {
    super(val, neighbors);
    this.visited = !!visited;
  }
}

/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     neighbors: Node[]
 *     constructor(val?: number, neighbors?: Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 */

function cloneGraph(node: TNode | null): TNode | null {
  if (!node) return null;

  const map = new Map<number, CustomNode>();
  const resNode = new CustomNode(node?.val, undefined, false);
  map.set(node!.val, resNode);
  const queue = [node];
  while (queue.length) {
    const currenNode = queue.shift();
    if (!map.has(currenNode!.val)) {
      map.set(
        currenNode!.val,
        new CustomNode(currenNode?.val, undefined, false)
      );
    }
    const cloneCurrenNode = map.get(currenNode!.val);
    if (cloneCurrenNode!.visited) continue;

    for (let neighbor of currenNode!.neighbors) {
      if (!map.has(neighbor.val)) {
        map.set(neighbor!.val, new CustomNode(neighbor?.val, undefined, false));
      }
      const neighborCloneNode = map.get(neighbor.val)!;
      cloneCurrenNode!.neighbors.push(neighborCloneNode);
      queue.push(neighbor);
    }
    cloneCurrenNode!.visited = true;
  }

  return resNode;
}
