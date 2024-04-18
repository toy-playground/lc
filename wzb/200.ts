const findIsland = (grid: string[][], x: number, y: number) => {
  const m = grid.length;
  const n = grid[0].length;

  const directions = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];
  const dots = [[x, y]];
  grid[x][y] = "0";
  while (dots.length) {
    const removedDot = dots.shift();
    if (!removedDot) throw Error("error logic");

    for (let direction of directions) {
      const newX = removedDot[0] + direction[0];
      const newY = removedDot[1] + direction[1];
      if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
      if (grid[newX][newY] === "1") {
        grid[newX][newY] = "0";
        dots.push([newX, newY]);
      }
    }
  }
};

function numIslands(grid: string[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  if (!m || !n) return 0;
  let cnt = 0;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (grid[i][j] === "1") {
        findIsland(grid, i, j);
        cnt += 1;
      }
    }
  }
  return cnt;
}

numIslands([
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "0"],
]);
