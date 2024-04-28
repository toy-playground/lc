const check = (nums1: number[], nums2: number[], delta: number) => {
  const newNums2 = nums2.map((x) => x - delta);
  let cnt = 0;
  for (let i = 0, j = 0; i < nums1.length; ++i) {
    if (j <= nums2.length - 1 && newNums2[j] === nums1[i]) {
      ++j;
    } else {
      cnt++;
    }
  }
  return cnt === 2;
};

function minimumAddedInteger(nums1: number[], nums2: number[]): number {
  nums1.sort((a, b) => b - a);
  nums2.sort((a, b) => b - a);
  if (check(nums1, nums2, nums2[0] - nums1[0])) {
    return nums2[0] - nums1[0];
  }
  if (check(nums1, nums2, nums2[0] - nums1[1])) {
    return nums2[0] - nums1[1];
  }
  if (check(nums1, nums2, nums2[0] - nums1[2])) {
    return nums2[0] - nums1[2];
  }
  return 0;
}

console.log(minimumAddedInteger([3,5,5,3], [7,7])); // 0
