/**
 Do not return anything, modify board in-place instead.
 */

const dfs = (x: number, y: number, board: string[][]) => {
  if (board[x][y] !== "O") return;
  board[x][y] = "E";
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (let dir of directions) {
    const newX = x + dir[0];
    const newY = y + dir[1];
    if (
      newX >= 0 &&
      newY >= 0 &&
      newX < board.length &&
      newY < board[0].length &&
      board[newX][newY] === "O"
    ) {
      dfs(newX, newY, board);
    }
  }
};
function solve(board: string[][]): void {
  const m = board.length;
  const n = board[0]?.length;

  if (!m || !n) return;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
        dfs(i, j, board);
      }
    }
  }
  
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (board[i][j] === "E") board[i][j] = "O";
      else board[i][j] = "X";
    }
  }
  return;
}

solve([
  ["X", "X", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "X", "X"],
]);
