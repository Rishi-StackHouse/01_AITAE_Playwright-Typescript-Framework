// First Largest - Find and return the largest (maximum) number in an array
console.log('************* First Largest ******************');
function findFirstLargest(arr: number[]): number | null {

    /* 1. we need length for iteration and to check if the array is valid */
    let len = 0;
    for (; arr[len] !== undefined; len++) {}
    if (len === 0) return null;

    /* 2. assuming first element is the largest */
    let first = arr[0];

    /* 3. compare every other element with the assumed one
          if we found a bigger one, then update largest */
    for (let i = 1; i < len; i++) {
        if (arr[i] > first) {
            first = arr[i];
        }
    }

    return first;
}

console.log(findFirstLargest([3, 1, 4, 1, 5, 9, 2, 6]));   // 9
console.log(findFirstLargest([10, 20, 30, 40, 50]));       // 50
console.log(findFirstLargest([-5, -2, -10, -1]));          // -1 (largest among negatives)
console.log(findFirstLargest([7]));                        // 7 (single element)
console.log(findFirstLargest([5, 5, 5, 5]));               // 5 (all same)
console.log(findFirstLargest([0, -89, -8, 2]));                         // 0 (largest among negatives and zero)
console.log(findFirstLargest([60, 70, 80, 90, 90]));                  // 90 (largest among positives)

/**************************************************************************************/

// Remove First Largest - Find and remove the largest number from an array
console.log('************* Remove First Largest ******************');
function removeFirstLargest(arr: number[]): number[] {     // [number[], number | null]

    /* 1. we need length for iteration and to check if the array is valid */
    let len = 0;
    for (; arr[len] !== undefined; len++) {}
    if (len === 0) return [];    // if (len === 0) return [[], null];

    /* 2. assuming first element is the largest and tracking its index for removal */
    let first = arr[0];
    let firstIndex = 0;

    /* 3. compare every other elements with the assumed one
          if its greater, update both the largest value and its index to the newly found largest one */
    for (let i = 1; i < len; i++) {
        if (arr[i] > first) {
            first = arr[i];
            firstIndex = i;
        }
    }

    /* 4. declare a new array and set an iterator
          for building a new output (array without the first largest element) */
    const result: number[] = [];
    let resultLen = 0;

    /* 5. iterate through the original array
          skip the element at the firstIndex, 
          copy all the elements in the other indices into the result array */
    for (let i = 0; i < len; i++) {
        if (i !== firstIndex) {
            result[resultLen] = arr[i];
            resultLen++;
        }
    }
    
    return result;  // return [result, largest];
}

console.log(removeFirstLargest([3,1,4,1,9,5,2,6]));   // [3,1,4,1,5,2,6] (9 removed)
console.log(removeFirstLargest([10, 20, 30, 40, 50]));       // [10,20,30,40] (50 removed)
console.log(removeFirstLargest([-5, -2, -10, -1]));          // [-5,-2,-10] (-1 removed)
console.log(removeFirstLargest([7]));                        // [] (single element removed)
console.log(removeFirstLargest([5, 9, 5, 9]));               // [5,5,9] (first 9 removed)
console.log(removeFirstLargest([]));                         // [] (empty array)

/**************************************************************************************/


// while loop varient

// function removeFirstLargest(arr: number[]): number[] {
//     // 1. count length manually
//     let len = 0;
//     while (arr[len] !== undefined) {
//         len++;
//     }
//     if (len === 0) return [];

//     // 2. first find the largest element and its index
//     let largest = arr[0];
//     let largestIndex = 0;
//     let i = 1;

//     while (i < len) {
//         if (arr[i] > largest) {
//             largest = arr[i];
//             largestIndex = i;
//         }
//         i++;
//     }

//     // 3. build new array without the largest element
//     const result: number[] = [];
//     let resultLen = 0;
//     i = 0;

//     while (i < len) {
//         if (i !== largestIndex) {
//             result[resultLen] = arr[i];
//             resultLen++;
//         }
//         i++;
//     }

//     return result;
// }
