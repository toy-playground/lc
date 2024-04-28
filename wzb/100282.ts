const num2bitReverse = (n: number) => {
  let res = "";
  while (n) {
    if (n % 2 === 0) {
      res += "0";
      n = n / 2;
    } else {
      res += "1";
      n = (n - 1) / 2;
    }
  }
  return res;
};

const bit2num = (s: string) => {
  return parseInt(s, 2);
};

function minEnd(n: number, x: number): number {
  // reverse bit
  const bitx = num2bitReverse(x);

  const bitn = num2bitReverse(n - 1);

  let currentNIndex = 0;
  let res = "";
  for (let i = 0; i < bitx.length; ++i) {
    if (bitx[i] === "1") {
      res = "1" + res;
    } else if (currentNIndex < bitn.length) {
      res = bitn[currentNIndex] + res;
      currentNIndex += 1;
    } else {
      res = "0" + res;
    }
  }
  res = bitn.slice(currentNIndex).split("").reverse().join("") + res;
  return bit2num(res);
}
console.log(minEnd(2, 7));
