function minimumTotal(triangle: number[][]): number {
  if(!triangle.length) throw Error("triangle is null");
  let res = triangle[0][0];
  for (let i = 1; i < triangle.length; ++i) {
    for (let j = 0; j < triangle[i].length; ++j) {
      if (j === 0) triangle[i][j] += triangle[i - 1][j];
      else if (j === triangle[i].length - 1)
        triangle[i][j] += triangle[i - 1][j - 1];
      else
        triangle[i][j] += Math.min(triangle[i - 1][j], triangle[i - 1][j - 1]);
      if (i === triangle.length - 1) {
        res = j === 0 ? triangle[i][j] : Math.min(triangle[i][j], res);
      }
    }
  }

  return res;
}

minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]);
