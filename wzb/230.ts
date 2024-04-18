/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const travelTree = (root: TreeNode | null) => {
  if (!root) return [];

  const left = root?.left ? travelTree(root?.left) : [];
  const right = root?.right ? travelTree(root?.right) : [];

  return left.concat([root.val]).concat(right);
};

function kthSmallest(root: TreeNode | null, k: number): number {
  //   const res = travelTree(root);
  //   return res[k - 1];
  const stack: TreeNode[] = [];
  let tmpRoot = root;
  while (stack.length || root) {
    while (tmpRoot) {
      stack.push(tmpRoot);
      tmpRoot = tmpRoot.left;
    }
    tmpRoot = stack.pop()!;
    k--;
    if (k == 0) return tmpRoot.val;
    tmpRoot = tmpRoot.right;
  }
  return 0;
}
