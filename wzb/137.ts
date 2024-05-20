function singleNumber(nums: number[]): number {
    const a = new Array(32).fill(0);
    let neg = 0;
    for(let num of nums){
        num = num < 0 ? (neg++, -num) : num;
        for(let i = 0; i < 32; i++){
            a[i] += num & 1;
            num >>= 1;
        }
    }
    let res = 0;
    for(let i = 31; i >= 0; i--){
        res = res * 2 + a[i] % 3;
    }
    return neg % 3 ? -res : res;
};