function isValidSudoku(board: string[][]): boolean {
  let x = new Array(9).fill(false);
  let y = new Array(9).fill(false);
  let z = new Array(9).fill(false);
  for (let i = 0; i < 9; ++i) {
    x = new Array(9).fill(false);
    y = new Array(9).fill(false);
    z = new Array(9).fill(false);
    for (let j = 0; j < 9; ++j) {
      if (board[i][j] !== ".") {
        const num = Number(board[i][j]) - 1;
        if (x[num]) return false;
        x[num] = true;
      }
      if (board[j][i] !== ".") {
        const ynum = Number(board[j][i]) - 1;
        if (y[ynum]) return false;
        y[ynum] = true;
      }
      let tx = Math.floor(i / 3);
      let ty = Math.floor(j / 3);
      if (board[tx * 3 + ty][(i % 3) * 3 + (j % 3)] !== ".") {
        const znum = Number(board[tx * 3 + ty][(i % 3) * 3 + (j % 3)]) - 1;
        if (z[znum]) return false;
        z[znum] = true;
      }
    }
  }

  return true;
}
