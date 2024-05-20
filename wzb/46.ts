const result: number[][] = [];
const handle = (nums: number[], res: number[]) => {
  if (!nums.length) result.push(res);
  for (let i = 0; i < nums.length; ++i) {
    handle(nums.slice(0, i).concat(nums.slice(i + 1)), [...res, nums[i]]);
  }
};

function permute(nums: number[]): number[][] {
  handle(nums, []);
  return result;
}
