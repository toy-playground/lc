const findGCD = (x: number, y: number) => {
  let [a, b]: [number, number] = x > y ? [x, y] : [y, x];
  while (a % b !== 0) {
    const mod: number = a % b;
    a = b;
    b = mod;
  }
  return b;
};

const findLCM = (x: number, y: number) => {
  const gcd = findGCD(x, y);
  return (x * y) / gcd;
};

interface ILCM {
  lcm: number;
  vector: number[];
}

const fetchLCMRecursive = (coins: number[], lcms: ILCM[]) => {
  let res: ILCM[][] = [lcms];
  const tmp: ILCM[] = [];
  for (let i = 0; i < lcms.length; i++) {
    const l = lcms[i];
    for (let j = 0; j < l.vector.length; j++) {
      const lcm = findLCM(l.lcm, coins[l.vector[j]]);
      tmp.push({ lcm, vector: l.vector.slice(j + 1) });
    }
  }
  if (!tmp.length) return res;
  const x = fetchLCMRecursive(coins, tmp);
  for (let i = 0; i < x?.length; i++) {
    res.push(x[i]);
  }
  return res;
};

const fetchLCM = (coins: number[]) => {
  const len = coins.length;
  const init: ILCM[] = coins.map((x, i) => {
    return {
      lcm: x,
      vector: Array(len - i - 1)
        .fill(0)
        .map((_, a) => a + i + 1),
    };
  });
  const res: ILCM[][] = fetchLCMRecursive(coins, init);
  return res;
};

function findKthSmallest(coins: number[], k: number): number {
  if (coins.indexOf(1) !== -1) {
    return k;
  }

  coins.sort((a, b) => a - b);

  const coinsFlag = new Array(coins.length).fill(false);
  for (let i = 0; i < coins.length; i++) {
    for (let j = i + 1; j < coins.length; j++) {
      if (coins[j] % coins[i] === 0) coinsFlag[j] = true;
    }
  }

  const coinsC = coins.filter((x, i) => !coinsFlag[i]);

  const ll = fetchLCM(coinsC);
  const lcm = ll[ll.length - 1][0].lcm;
  let setSize = 0;

  let addFlag = 1;
  for (let i = 0; i < ll.length; i++) {
    const lcms = ll[i];
    const t = lcms.reduce((sum, x) => {
      return sum + lcm / x.lcm;
    }, 0);

    setSize += addFlag ? t : -t;

    addFlag = (addFlag + 1) % 2;
  }
//   console.log("ll", ll, lcm, setSize);

  //   for (let i = 1; i < coins.length; i++) {
  //     const coin = coins[i];
  //     let lcmTmp = findLCM(lcm, coin);
  //     size = size * (lcmTmp / lcm) + lcmTmp / coin - 1;
  //     collision = collision * (lcmTmp / lcm) + 1;
  //     lcm = lcmTmp;
  //   }

  //   const setSize =
  //     coins.reduce((sum, x) => {
  //       return sum + lcm / x;
  //     }, 0) - collision;

  const kTmp = k % setSize;

  let coins_copy = coinsC.map((x, i) => {
    return {
      value: x,
      index: i,
    };
  });
  let res: number = coins_copy[0].value;

  for (let i = 0; i < kTmp; i++) {
    res = coins_copy[0].value;
    // console.log("res", res, coins_copy);
    for (let j = coins_copy.length - 1; j > 0; j--) {
        if (coins_copy[j].value === coins_copy[0].value) {
          coins_copy[j].value += coinsC[coins_copy[j].index];
        }
        if (coins_copy[j].value < coins_copy[0].value) {
          break;
        }
      }
    coins_copy[0].value += coinsC[coins_copy[0].index];

    coins_copy.sort((a, b) => {
      if (a.value !== b.value) {
        return a.value - b.value;
      }
      return a.index - b.index;
    });
  }
  //   const tmp = new Set<number>();
  //   for (let coin of coinsC) {
  //     let coinTmp = coin;
  //     let i = 0;
  //     while (coinTmp <= lcm && i < kTmp) {
  //       tmp.add(coinTmp);
  //       coinTmp += coin;
  //       i++;
  //     }
  //   }
  //   const arr = Array.from(tmp);
  //   arr.sort((a, b) => a - b);
  //   console.log(arr.length, arr);

  //   console.log(
  //     arr,
  //     lcm,
  //     Math.floor(k / arr.length) * lcm,
  //     k % arr.length ? arr[(k % arr.length) - 1] : 0
  //   );
  
  return Math.floor(k / setSize) * lcm + (k % setSize ? res : 0);
}

console.log(findKthSmallest([2,3,5,7,11,13,17,19,23,25,20,18], 1000000000));
