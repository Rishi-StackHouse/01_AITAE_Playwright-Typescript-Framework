console.log('\nPrint the Fibonacci series (each number is the sum of the previous two)');

console.log('\n*************Iterative (loop)******************');
// 0, 1, 1, 2, 3, 5, 8, 13, 21 ...
function fibonacciSeries(n: number): number[] {
    if (n <= 0) return [];

    const series: number[] = [];
    let prev = 0;   // f(0)
    let curr = 1;   // f(1)

    for (let i = 0; i < n; i++) {
        series[i] = prev;            // store the current term

        const next = prev + curr;    // next term = sum of the previous two
        prev = curr;                 // shift the window forward
        curr = next;
    }
    return series;
}

console.log(fibonacciSeries(0));    // []
console.log(fibonacciSeries(1));    // [0]
console.log(fibonacciSeries(5));    // [0, 1, 1, 2, 3]
console.log(fibonacciSeries(10));   // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
/*********************************************************************************************************/

console.log('\n*************Nth term only******************');
// Returns just the nth Fibonacci number (0-based): f(0)=0, f(1)=1
function fibonacciNth(n: number): number {
    if (n < 0) return -1;   // invalid input
    if (n === 0) return 0;
    if (n === 1) return 1;

    let prev = 0;
    let curr = 1;

    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}

console.log(fibonacciNth(0));    // 0
console.log(fibonacciNth(1));    // 1
console.log(fibonacciNth(7));    // 13
console.log(fibonacciNth(10));   // 55
/*********************************************************************************************************/

console.log('\n*************Recursive******************');
// Same logic using recursion: f(n) = f(n-1) + f(n-2)
function fibonacciRecursive(n: number): number {
    if (n < 0) return -1;        // invalid input
    if (n === 0) return 0;       // base case 1
    if (n === 1) return 1;       // base case 2

    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

console.log(fibonacciRecursive(0));    // 0
console.log(fibonacciRecursive(6));    // 8
console.log(fibonacciRecursive(10));   // 55
/*********************************************************************************************************/


