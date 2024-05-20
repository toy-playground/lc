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

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const ret = new Array();
  const queue = [root];
  let tmp = 0;
  let level = 1;
  let nextLevel = 0;

  while (queue) {
    const x = queue.shift();
    tmp += 1;
    if (tmp === level) {
      tmp = 0;
      ret.push([]);
      level = nextLevel;
      nextLevel = 0;
    }
    ret[ret.length - 1].push(x.val);
    if (x.left) {
      queue.push(x.left);
      nextLevel += 1;
    }
    if (x.right) {
      queue.push(x.right);
      nextLevel += 1;
    }
  }
}
