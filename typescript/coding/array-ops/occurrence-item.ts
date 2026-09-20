// Count Occurrence of Specific Item - Return how many times a specific item appears in the array

console.log('*************Count Specific Item Occurrence******************');
function countItemOccurrences(arr: (string | number)[], item: string | number): number {

    /* 1. count length manually */
    let len = 0;
    for (; arr[len] !== undefined; len++) { }
    if (len === 0) return 0;

    /* 2. counter for counting the occurrence of a specific item */
    let count = 0;

    /* 3. go through every item in the array and compare with the specific item, 
          if match found increment the counter */
    for (let i = 0; i < len; i++) {
        if (arr[i] === item) {   // strict compare keeps 1 and "1" separate
            count++;
        }
    }

    return count;
}

console.log(countItemOccurrences([1, 2, 2, 3, 3, 3, 4], 3));          // 3
console.log(countItemOccurrences([1, 2, 2, 3, 3, 3, 4], 2));          // 2
console.log(countItemOccurrences(["a", "b", "a", "c", "b", "b"], "b")); // 3
console.log(countItemOccurrences([1, "1", 1, "1"], 1));               // 2 (only number 1, not string "1")
console.log(countItemOccurrences([1, "1", 1, "1"], "1"));             // 2 (only string "1", not number 1)
console.log(countItemOccurrences([5, 5, 5, 5, 5], 5));                // 5
console.log(countItemOccurrences([1, 2, 3, 4, 5], 9));                // 0 (item not found)
console.log(countItemOccurrences([9], 9));                // 0 (item not found)

/**************************************************************************************/

// Count Item Occurrences - Return how many times each item appears in the array

console.log('*************Count Item Occurrences******************');
function countAllItemsOccurrences(arr: (string | number)[]): { value: string | number; count: number }[] {

    // 1. count length manually
    let len = 0;
    for (; arr[len] !== undefined; len++) { }
    if (len === 0) return [];

    // 2. result array to store unique values and their counts
    const result: { value: string | number; count: number }[] = [];
    let resultLen = 0;

    // 3. go through every item in the array
    for (let i = 0; i < len; i++) {
        let foundIndex = -1;

        // 4. check if this item already exists in result
        for (let j = 0; j < resultLen; j++) {
            if (result[j].value === arr[i]) {   // strict compare keeps 1 and "1" separate
                foundIndex = j;
                break;
            }
        }

        // 5. if found, increment count; otherwise add new entry
        if (foundIndex !== -1) {
            result[foundIndex].count++;
        } else {
            result[resultLen] = { value: arr[i], count: 1 };
            resultLen++;
        }
    }

    return result;
}

console.log(countAllItemsOccurrences([1, 2, 2, 3, 3, 3, 4]));           // [{value:1,count:1},{value:2,count:2},{value:3,count:3},{value:4,count:1}]
console.log(countAllItemsOccurrences(["a", "b", "a", "c", "b", "b"]));  // [{value:'a',count:2},{value:'b',count:3},{value:'c',count:1}]
console.log(countAllItemsOccurrences([1, "1", 1, "1"]));                // [{value:1,count:2},{value:'1',count:2}] (number 1 !== string '1')
console.log(countAllItemsOccurrences([5, 5, 5, 5, 5]));                 // [{value:5,count:5}]
console.log(countAllItemsOccurrences([1, 2, 3, 4, 5]));                 // [{value:1,count:1},...] all with count 1

/**************************************************************************************/