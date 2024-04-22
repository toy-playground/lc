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

const travelBST = (root: TreeNode | null, low: number, high: number) => {
  if (!root) return true;
  if (root.val >= high || root.val <= low) return false;
  return (
    travelBST(root.left, low, root.val) && travelBST(root.right, root.val, high)
  );
};

function isValidBST(root: TreeNode | null): boolean {
  return travelBST(root, -Infinity, Infinity);
}
