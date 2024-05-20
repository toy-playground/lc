function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length;
  if (!m) return false;
  const n = matrix[0].length;
  if (!n) return false;

  let l = 0,
    r = m * n - 1;
  while (l + 1 < r) {
    const mid = Math.floor((l + r) / 2);
    const t = matrix[Math.floor(mid / n)][mid % n];
    t <= target ? (l = mid) : (r = mid);
  }
  return matrix[Math.floor(l / n)][l % n] === target;
}

console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    3
  )
);
