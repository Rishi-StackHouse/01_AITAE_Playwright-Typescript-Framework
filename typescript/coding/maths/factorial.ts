console.log('\nFind the factorial of a given number  (n! = n * (n-1) * (n-2) ... * 1)');

console.log('\n*************Iterative (loop)******************');
// 5! = 5 * 4 * 3 * 2 * 1 = 120
function factorial(n: number): number {
    if (n < 0) return -1;   // factorial is not defined for negative numbers
    if (n === 0) return 1;  // 0! = 1

    let result = 1;
    for (let i = 2; i <= n; i++) {
        result = result * i;   // keep multiplying 2 * 3 * 4 ... * n
    }
    return result;
}

console.log(factorial(-3));   // -1 (invalid)
console.log(factorial(0));    // 1
console.log(factorial(1));    // 1
console.log(factorial(5));    // 120
console.log(factorial(10));   // 3628800
/*********************************************************************************************************/

console.log('\n*************Recursive******************');
// Same logic using recursion: n! = n * (n-1)!
function factorialRecursive(n: number): number {
    if (n < 0) return -1;        // invalid input
    if (n === 0 || n === 1) return 1;   // base case

    return n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(0));    // 1
console.log(factorialRecursive(5));    // 120
console.log(factorialRecursive(7));    // 5040
/*********************************************************************************************************/
