function findMinimumTime(tasks: number[][]): number {
  tasks.sort((a, b) => a[1] - b[1]);
  console.log(tasks);
  let res = new Set<number>();
  for (let task of tasks) {
    let tt = 0;
    for (let i = task[1]; i >= task[0]; i--) {
      if (res.has(i)) {
        tt++;
      }
    }
    console.log(tt);

    for (let i = task[1]; i >= task[0]; i--) {
      if (tt >= task[2]) {
        break;
      }
      if (!res.has(i)) {
        res.add(i);
        tt++;
      }
    }
  }
  console.log(res);
  return Array.from(res).length;
}

findMinimumTime([[8,19,1],[3,20,1],[1,20,2],[6,13,3]]);
