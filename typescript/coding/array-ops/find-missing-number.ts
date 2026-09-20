/* Find Missing Number - Given an array of numbers from 1 to N with exactly one
   number missing, find and return that missing number */
console.log('*************Find Missing Number******************');
function findMissingNumber(arr: number[]): number | null {

    // 1. count length
    let len = 0;
    for (; arr[len] !== undefined; len++) { }

    // 2. find min and max in the array
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < len; i++) {
        if (arr[i] < min) { 
            min = arr[i]; 
        }
        if (arr[i] > max) { 
            max = arr[i]; 
        }
    }

    // 3. expected sum from min to max
    let expectedSum = 0;
    for (let i = min; i <= max; i++) {
        expectedSum = expectedSum + i;
    }

    // 4. actual sum
    let actualSum = 0;
    for (let i = 0; i < len; i++) {
        actualSum = actualSum + arr[i];
    }

    // 5. difference is the missing number (null if none missing)
    const missing = expectedSum - actualSum;
    if (missing === 0) {
        return null;
    } else {
        return missing;
    }
}

console.log(findMissingNumber([1, 5, 4, 2, 6]));        // 3
console.log(findMissingNumber([2, 3, 4, 5]));           // 1
console.log(findMissingNumber([1, 2, 3, 4]));           // 5
console.log(findMissingNumber([1, 3]));                 // 2
console.log(findMissingNumber([6,7,8,10])); 

/**************************************************************************************/
