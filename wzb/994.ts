function orangesRotting(grid: number[][]): number {
  const m = grid.length;
  if (!m) return 0;
  const n = grid[0].length;
  if (!n) return 0;
  const queue: number[] = [];
  const directions = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];

  let totalFreshOrange = 0;
  const depthMap: Map<number, number> = new Map();
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (grid[i][j] === 2) {
        queue.push(i * n + j);
        depthMap.set(i * n + j, 0);
      }
      if (grid[i][j] === 1) totalFreshOrange += 1;
    }
  }

  let ret = 0;
  while (queue.length) {
    const x = queue.shift();
    if (x === undefined) throw Error("");
    const tx = Math.floor(x / n);
    const ty = x % n;
    for (let dir of directions) {
      const ttx = tx + dir[0];
      const tty = ty + dir[1];
      if (tty >= 0 && ttx >= 0 && ttx < m && tty < n && grid[ttx][tty] === 1) {
        grid[ttx][tty] = 2;
        queue.push(ttx * n + tty);
        const xx = depthMap.get(x)!;
        depthMap.set(ttx * n + tty, xx + 1);
        ret = xx + 1;
        totalFreshOrange -= 1;
      }
    }
    if (!totalFreshOrange) break;
  }
  console.log(totalFreshOrange);
  return totalFreshOrange ? -1 : ret;
}

orangesRotting([[2, 2, 2, 1, 1]]);
