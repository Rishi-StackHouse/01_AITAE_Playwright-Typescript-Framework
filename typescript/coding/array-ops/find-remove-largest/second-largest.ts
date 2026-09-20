// Second Largest - Find and return the second largest number in an array
console.log('************* Second Largest ******************');
function findSecondLargest(arr: number[]): number | null {

    /* 1. we need length for iteration and to check if the array is valid */
    let len = 0;
    for (; arr[len] !== undefined; len++) {}
    if (len < 2) return null;

    /* 2. assuming first element is the largest and second as null (unknown yet) */
    let first = arr[0];
    let second: number | null = null;

    /* 3. compare every other elements with the assumed one
          if its greater than first, update second as previous first and update first with new largest
          else if its less than first but greater than second, update second */
    for (let i = 1; i < len; i++) {
        if (arr[i] > first) {
            second = first;
            first = arr[i];
        }    
        else if (arr[i] < first) {
            if (second === null || arr[i] > second) {
                second = arr[i];
            }
        }
    }

    return second;
}

console.log(findSecondLargest([3, 1, 4, 1, 5, 9, 2, 6]));   // 6
console.log(findSecondLargest([10, 20, 30, 40, 50]));       // 40
console.log(findSecondLargest([-5, -2, -10, -1]));          // -2
console.log(findSecondLargest([7, 7, 7]));                  // null (all same, no distinct second)
console.log(findSecondLargest([5, 10]));                    // 5
console.log(findSecondLargest([10, 5]));                    // 5
console.log(findSecondLargest([1]));                        // null (not enough elements)

/**************************************************************************************/

// Remove Second Largest - Find and remove the second largest number from an array
console.log('************* Remove Second Largest ******************');
function removeSecondLargest(arr: number[]): [number[], number | null] {

    /* 1. we need length for iteration and to check if the array is valid */
    let len = 0;
    for (; arr[len] !== undefined; len++) {}
    if (len < 2) return [arr, null];

    /* 2. assume the first,second elements and track indices for removal */
    let first = arr[0];
    let firstIndex = 0;
    let second: number | null = null;
    let secondIndex = -1;

    /* 3. compare every other elements with the assumed ones
          if its greater than first, update second as previous first and update first with new largest
          else if its less than first but greater than second, update second */
    for (let i = 1; i < len; i++) {
        if (arr[i] > first) {
            second = first;
            secondIndex = firstIndex;
            first = arr[i];
            firstIndex = i;
        } 
        else if (arr[i] < first) {
            if (second === null || arr[i] > second) {
                second = arr[i];
                secondIndex = i;
            }
        }
    }

    /* 4. if no second largest found (all elements are same), return copy of original array with null */
    if (secondIndex === -1) {
        const copy: number[] = [];
        for (let i = 0; i < len; i++) {
            copy[i] = arr[i];
        }
        return [copy, null];
    }

    /* 5. declare a new array and set an iterator
          for building a new output (array without the second largest element) */
    const result: number[] = [];
    let resultLen = 0;

    /* 6. iterate through the original array
          skip the element at the secondIndex,
          copy all the elements in the other indices into the result array */
    for (let i = 0; i < len; i++) {
        if (i !== secondIndex) {
            result[resultLen] = arr[i];
            resultLen++;
        }
    }

    return [result, second];
}

console.log(removeSecondLargest([3, 1, 4, 1, 5, 9, 2, 6]));   // [3,1,4,1,5,9,2] (6 removed)
console.log(removeSecondLargest([10, 20, 30, 40, 50]));       // [10,20,30,50] (40 removed)
console.log(removeSecondLargest([-5, -2, -10, -1]));          // [-5,-10,-1] (-2 removed)
console.log(removeSecondLargest([7, 7, 7]));                  // [7,7,7] (no distinct second)
console.log(removeSecondLargest([5, 10]));                    // [10] (5 removed)
console.log(removeSecondLargest([1]));                        // [1] (not enough elements)                   
/**************************************************************************************/
