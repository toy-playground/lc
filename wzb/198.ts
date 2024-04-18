function rob(nums: number[]): number {
  const max = Array(nums.length).fill(0);
  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      max[i] = nums[i];
      continue;
    }
    if (i === 1) {
      max[i] = Math.max(nums[i], nums[i - 1]);
      continue;
    }

    max[i] = Math.max(max[i - 1], max[i - 2] + nums[i]);
  }
  return max[nums.length - 1];
}
