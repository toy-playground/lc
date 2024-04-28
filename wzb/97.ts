function isInterleave(s1: string, s2: string, s3: string): boolean {
  if (s3.length !== s1.length + s2.length) return false;
  const l1 = s1.length;
  const l2 = s2.length;
  if (!l1) return s3 === s2;
  if (!l2) return s3 === s1;

  const state = new Array(l1 + 1)
    .fill(0)
    .map((_) => new Array(l2 + 1).fill(false));
  state[0][0] = true;
  for (let i = 1; i <= l1; ++i) {
    state[i][0] = state[i - 1][0] && s3[i - 1] === s1[i - 1];
  }
  for (let j = 1; j <= l2; ++j) {
    state[0][j] = state[0][j - 1] && s3[j - 1] === s2[j - 1];
  }
  for (let i = 1; i <= l1; ++i) {
    for (let j = 1; j <= l2; ++j) {
      state[i][j] =
        (state[i][j - 1] && s3[j + i - 1] === s2[j - 1]) ||
        (state[i - 1][j] && s3[j + i - 1] === s1[i - 1]);
    }
  }
  console.log(state);
  return state[l1][l2];
}

isInterleave("aabcc", "dbbca", "aadbbcbcac");
