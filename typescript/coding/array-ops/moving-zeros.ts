// BONUS: In-Place Move Zeros to End (modifies original array - Two Pointer approach)
// This is the classic interview approach that doesn't use extra space
console.log('*************In-Place Move Zeros to End (Two Pointer)******************');
function moveZerosToEndInPlace(arr: number[]): number[] {     // 2 pointer technique, modifies original array

    /* 1. we need length for iteration and to check if the array is valid */
    let len = 0;
    for (; arr[len] !== undefined; len++) { /* count items */ }
    if (len < 2) return arr;

    /* 2. Two pointer technique
        - 'i' scans throughout the original array based on the condition if its not zero
        - 'j' increments the position for the next non-zero element, which will be filled with non zero elements */
    let j = 0;
    for (let i = 0; i < len; i++) {
        if (arr[i] !== 0) {
            arr[j] = arr[i];
            j++;
        }
    }

    /* 3. since we know 'j' is the position for the next non-zero element, so fill the rest with zeros */
    for (let i = j; i < len; i++) {
        arr[i] = 0;
    }

    return arr;   // return same array (modified in place)
}

console.log(moveZerosToEndInPlace([0, 1, 0, 3, 12]));          // [1, 3, 12, 0, 0]
console.log(moveZerosToEndInPlace([1, -2, 0, 0, 3, 4, 0, 5]));  // [1, -2, 3, 4, 5, 0, 0, 0]
console.log(moveZerosToEndInPlace([0, 0, 0, 1]));              // [1, 0, 0, 0]

// Move Zeros to End - Move all 0s to the end while maintaining order of non-zero elements

console.log('*************Move Zeros to End******************');
function moveZerosToEnd(arr: number[]): number[] {

    /* 1. we need length for iteration and to check if the array is valid */
    let len = 0;
    for (; arr[len] !== undefined; len++) { /* count items */ }
    if (len < 2) return arr;   // if less than 2 items, nothing to move

    /* 2. declare a new array and set an zero conter which is also used to 
          track the length of the new refactored output array */
    const result: number[] = [];
    let resultlen = 0;      
    let zeroCount = 0;

    /* 3. iterate through the original array, check for non zero elements
          if found add them to the new array, if not its a zero count it*/
    for (let i = 0; i < len; i++) {
        if (arr[i] !== 0) {
            result[resultlen] = arr[i];   // add non-zero element
            resultlen++;
        } 
        else {
            zeroCount++;                   // count zeros for later
        }
    }

    /* 4. since we know how many zeros we have, and all the non-zero elements are already in the result array, we can now
          fill the rest of the result array with zeros */
    for (let i = 0; i < zeroCount; i++) {
        result[resultlen] = 0;
        resultlen++;
    }

    return result;
}

console.log(moveZerosToEnd([0, 1, 0, -3, -12]));          // [1, -3, -12, 0, 0]
console.log(moveZerosToEnd([1, 2, 0, 0, 3, 4, 0, 5]));  // [1, 2, 3, 4, 5, 0, 0, 0]
console.log(moveZerosToEnd([0, 0, 0, 1]));              // [1, 0, 0, 0]
console.log(moveZerosToEnd([1, 2, 3]));                 // [1, 2, 3] (no zeros)
console.log(moveZerosToEnd([0, 0, 0]));                 // [0, 0, 0] (all zeros)

/**************************************************************************************/

// Move Zeros to Front - Move all 0s to the front while maintaining order of non-zero elements

console.log('*************Move Zeros to Front******************');
function moveZerosToFront(arr: number[]): number[] {

    /* 1. we need length for iteration and to check if the array is valid */
    let len = 0;
    for (; arr[len] !== undefined; len++) { /* count items */ }
    if (len < 2) return arr;   // if less than 2 items, nothing to move

    /* 2. declare a new array and set an zero conter which is also used to 
          track the length of the new refactored output array */
    const result: number[] = [];
    let zeroCount = 0;      

    /* 3. counting all the zeros in the original array and incrementing zero Counter */
    for (let i = 0; i < len; i++) {
        if (arr[i] === 0) {
            zeroCount++;
        }
    }

    /* 4. fill the zeros in front in the new result array */
    for (let i = 0; i < zeroCount; i++) {
        result[i] = 0;
    }

    /* 5. since we know how many zeros we have, start adding non-zero elements after the zeros 
          in the new result array */
    let resultLen = zeroCount;   // start after the zeros
    for (let i = 0; i < len; i++) {
        if (arr[i] !== 0) {
            result[resultLen] = arr[i];   // add non-zero element
            resultLen++;
        }
    }

    return result;
}

console.log(moveZerosToFront([0, 1, 0, 3, 12]));          // [0, 0, 1, 3, 12]
console.log(moveZerosToFront([1, 2, 0, 0, 3, 4, 0, 5]));  // [0, 0, 0, 1, 2, 3, 4, 5]
console.log(moveZerosToFront([0, 0, 0, 1]));              // [0, 0, 0, 1]
console.log(moveZerosToFront([1, 2, 3]));                 // [1, 2, 3] (no zeros)
console.log(moveZerosToFront([0, 0, 0]));                 // [0, 0, 0] (all zeros)

/**************************************************************************************/
