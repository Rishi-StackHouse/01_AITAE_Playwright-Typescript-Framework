console.log('\nCheck whether the given sequence of string is a palindrome or not');

console.log('\n*************Case Sensitive******************');
function isPalindromeSimple(s1: string): boolean {
    // 1. Return false for the falsy values (null, undefined, empty string, NaN, etc.)
    if (!s1) return false;

    // 2. Count the length of the string
    let len = 0;
    for (; s1[len] !== undefined; len++) { /* count chars */ }

    /* 3. Compare characters from the start and end of the string, moving towards the center and check whether they are equal or not. 
          If any pair of characters is not equal, return false. 
          If all pairs are equal, return true.*/
    let left = 0;
    let right = len - 1;

    while (left < right) {
        if (s1[left] !== s1[right]) return false;
        left++;
        right--;
    }
    return true;
}

console.log(isPalindromeSimple("racecar"));  // true
console.log(isPalindromeSimple("raar"));     // true

console.log(isPalindromeSimple("madam"));    // true
console.log(isPalindromeSimple("hello"));    // false
console.log(isPalindromeSimple("Madam"));    // false (case sensitive)
/*********************************************************************************************************/

console.log('\n*************Case Insensitive******************');
// Manual uppercase → lowercase map (no built-in methods)
const LOWERR: Record<string, string> = {
    A: 'a', B: 'b', C: 'c', D: 'd', E: 'e', F: 'f', G: 'g', H: 'h', I: 'i',
    J: 'j', K: 'k', L: 'l', M: 'm', N: 'n', O: 'o', P: 'p', Q: 'q', R: 'r',
    S: 's', T: 't', U: 'u', V: 'v', W: 'w', X: 'x', Y: 'y', Z: 'z',
};
function toLowerr(ch: string): string {
    if (LOWERR[ch] !== undefined) {
        return LOWERR[ch];
    } else {
        return ch;
    }
}
// Keep only letters and digits (drops spaces, punctuation, etc.)
function isAlphaNumeric(ch: string): boolean {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9');
}

function isPalindrome_CI(s1: string): boolean {
    if (!s1) return false;

    let len = 0;
    for (; s1[len] !== undefined; len++) { /* count chars */ }

    // 1. convert original string to lowercase, skipping whitespace/punctuation
    let lowerOriginal = "";
    for (let i = 0; i < len; i++) {
        if (!isAlphaNumeric(s1[i])) continue;
        lowerOriginal = lowerOriginal + toLowerr(s1[i]);   // add lowercase char to the END
    }

    // 2. build the reversed lowercase string
    let reversed = "";
    for (let i = 0; i < len; i++) {
        if (!isAlphaNumeric(s1[i])) continue;
        reversed = toLowerr(s1[i]) + reversed;   // add lowercase char to the FRONT
    }

    // 3. compare reversed with the lowercase original; if same → palindrome
    if (reversed === lowerOriginal) {
        return true;
    }
    else {
        return false;
    }
}

console.log(isPalindrome_CI("Racecar"));  // true 
console.log(isPalindrome_CI("MAdam"));    // true 
console.log(isPalindrome_CI("Madamm"));    // false
console.log(isPalindrome_CI("a mAn a plan a canal panamA"));  // true
console.log(isPalindrome_CI("a man a plan a canal panama fwkfhwiufhiu"));  // false
/*********************************************************************************************************/