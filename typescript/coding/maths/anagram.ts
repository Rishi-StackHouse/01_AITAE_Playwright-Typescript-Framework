console.log('\nCheck whether the given strings are an anagram or not');

console.log('*************Case Sensitive******************');
function isAnagram_withCaseSensitive(s1: string, s2: string): boolean {
    // 1. Return false for the falsy values (null, undefined, empty string, NaN, etc.)
    if (!s1 || !s2) return false;    // negation operator - if s1 and s2 are falsy, condition becomes true

    // 2. Determine the strings length; Check difference in length → not an anagram
    let len1 = 0;
    for (; s1[len1] !== undefined; len1++) {
    }
    let len2 = 0;
    for (; s2[len2] !== undefined; len2++) {
    }
    if (len1 !== len2) return false;   

    // 3. Setting an false boolean array to track which chars of s2 are already matched with s1
    const used: boolean[] = [];
    for (let k = 0; k < len2; k++) {
        used[k] = false;
    }

    /* 4. For each chars in s1, checking whether that char exist in s2 or not 
          if yes mark and skip to next if not return false */
    for (let i = 0; s1[i] !== undefined; i++) {
        let found = false;

        for (let j = 0; s2[j] !== undefined; j++) {
            if (used[j] === false && s1[i] === s2[j]) {  // direct char compare
                used[j] = true;                          // marks this char of s2 is matched with s1 char
                found = true;
                break;                                   //stop seaching for s2, move to next char in s1, since we found a match for s1 char
            }
        }
        if (found === false) return false;   // no partner for this s1 char
    }

    return true;   // every char paired → anagram
}

console.log(isAnagram_withCaseSensitive("listen", "Silent"));  // false
console.log(isAnagram_withCaseSensitive("listen", "silent"));    // true
console.log(isAnagram_withCaseSensitive("racecar", "carrace"));    // true
/********************************************************************************************************/

console.log('*************Case Insensitive******************');
// Manual uppercase → lowercase map (no built-in methods)
const LOWER: Record<string, string> = {
    A: 'a', B: 'b', C: 'c', D: 'd', E: 'e', F: 'f', G: 'g', H: 'h', I: 'i',
    J: 'j', K: 'k', L: 'l', M: 'm', N: 'n', O: 'o', P: 'p', Q: 'q', R: 'r',
    S: 's', T: 't', U: 'u', V: 'v', W: 'w', X: 'x', Y: 'y', Z: 'z',
};
// Returns the lowercase form of a char; if not uppercase, returns it unchanged
function toLower(ch: string): string {
    if (LOWER[ch] !== undefined) {
        return LOWER[ch];
    } 
    else {
        return ch;
    }
}
function isAnagram_withCaseInSensitive(s1: string, s2: string): boolean {
    if (!s1 || !s2) return false;

    let len1 = 0;
    for (; s1[len1] !== undefined; len1++) { /* count s1 */ }
    let len2 = 0;
    for (; s2[len2] !== undefined; len2++) { /* count s2 */ }
    if (len1 !== len2) return false;

    const used: boolean[] = [];
    for (let k = 0; k < len2; k++)  {
        used[k] = false; 
    }

    for (let i = 0; s1[i] !== undefined; i++) {
        let found = false;
        for (let j = 0; s2[j] !== undefined; j++) {
            // normalize BOTH chars before comparing
            if (used[j] === false && toLower(s1[i]) === toLower(s2[j])) {
                used[j] = true;
                found = true;
                break;
            }
        }
        if (!found) return false;
    }
    return true;
}

console.log(isAnagram_withCaseInSensitive("ListEn", "silent"));  // true
console.log(isAnagram_withCaseInSensitive("listen", "silent"));  // true
console.log(isAnagram_withCaseInSensitive("hello", "world"));    // false
console.log(isAnagram_withCaseInSensitive("hel", "world"));    // false
/*********************************************************************************************************/