const check = (num: number, nums: number[]) => {
  const need = Math.floor(((nums.length * (nums.length + 1)) / 2 + 1) / 2);
  const mmap = new Map<number, number>();
  let l = 0;
  let res = 0;
  for (let r = 0; r < nums.length; ++r) {
    if (mmap.has(nums[r])) {
      const x = mmap.get(nums[r])!;
      mmap.set(nums[r], x + 1);
    } else {
      mmap.set(nums[r], 1);
    }
    while (mmap.size > num) {
      let out = nums[l++];
      const x = mmap.get(out)!;
      mmap.set(out, x - 1);
      if (x - 1 === 0) mmap.delete(out);
    }
    res += r - l + 1;
    if (res >= need) return true;
  }

  return false;
};

function medianOfUniquenessArray(nums: number[]): number {
  if (nums.length === 1) return 1;

  let left = 0,
    right = nums.length;
  // 二分 问题拆分
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    check(mid, nums) ? (right = mid) : (left = mid);
  }
  return right;
}
