function minimumOperations(grid: number[][]): number {
  const m = grid.length;
  const n = grid?.[0].length;
  if (!n || !m) return 0;

  const matrix: number[][] = new Array(n)
    .fill(0)
    .map((_) => new Array(10).fill(m));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      matrix[i][grid[j][i]] -= 1;
    }
  }
  let res = Infinity;
  console.log(matrix);
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < 10; ++j) {
      const x =
        i === 0
          ? [0]
          : matrix[i - 1].slice(0, j).concat(matrix[i - 1].slice(j + 1));
      matrix[i][j] = Math.min(...x) + matrix[i][j];
      if (i === n - 1 && matrix[i][j] < res) res = matrix[i][j];
    }
  }

  return res;
}

console.log(
  minimumOperations([
    [1, 0, 2],
    [1, 0, 2],
  ])
);
