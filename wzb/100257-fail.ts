function medianOfUniquenessArray(nums: number[]): number {
  if (nums.length === 1) return 1;
  const res = new Array(nums.length + 1).fill(0);
  const mmap: number[][] = new Array(nums.length).fill(0).map((_) => []);
  mmap[0] = new Array(nums.length).fill(1);
  res[1] = nums.length;
  for (let i = 0; i < nums.length - 1; ++i) {
    const x = nums[i] === nums[i + 1] ? 1 : 2;
    mmap[1].push(x);
    res[x] += 1;
  }
  // 动归 O(n^2)
  for (let currentLen = 2; currentLen < nums.length; ++currentLen) {
    for (let i = 0; i < nums.length - currentLen; ++i) {
      const x =
        mmap[currentLen - 1][i] +
        (mmap[currentLen - 2][i + 1] === mmap[currentLen - 1][i + 1] ||
        nums[i] === nums[i + currentLen]
          ? 0
          : 1);
      mmap[currentLen].push(x);
      res[x] += 1;
    }
  }
  let tmp = 0;
  const need = ((nums.length * (nums.length + 1)) / 2 + 1) / 2;
  for (let i = 0; i < res.length; ++i) {
    tmp += res[i];
    if (tmp + 1 > need) {
      return i;
    }
  }
  return 0;
}