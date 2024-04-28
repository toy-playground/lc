function convert(s: string, numRows: number): string {
  const strLen = s.length;
  if (numRows >= strLen || numRows === 0 || numRows === 1) {
    return s;
  }

  const x = new Array(numRows).fill(0).map((_) => "");
  for (let i = 0; i < s.length; ++i) {
    const c = s[i];
    const tmp = i % (2 * numRows - 2);
    const index = tmp >= numRows ? 2 * numRows - 2 - tmp : tmp;
    x[index] += c;
  }
  let res = "";
  for (let c of x) {
    res += c;
  }
  return res;
}

console.log(convert("AB", 1));
