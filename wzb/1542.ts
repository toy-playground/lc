function longestAwesome(s: string): number {
    const hashMap: Record<number, number> = {};
    let currentStatus = 0;
    let ans = 1;
    hashMap[0] = -1;
    for (let i = 0; i < s.length; ++i) {
        const c = parseInt(s[i]);
        currentStatus = currentStatus ^ (1 << c);
        for (let j = 0; j < 10; ++j) {
            const nextStatus = currentStatus ^ (1 << j);
            if (hashMap[nextStatus] !== undefined) {
                ans = Math.max(ans, i - hashMap[nextStatus]);
            }
        }
        if (hashMap[currentStatus] === undefined) {
            hashMap[currentStatus] = i;
        } else {
            ans = Math.max(ans, i - hashMap[currentStatus]);
        }
    }
    return ans;
}
