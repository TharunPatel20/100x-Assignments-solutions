/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  // let strLen = str.length;
  // if (strLen == 1) return true;

  let str1 = str.toLowerCase().replace(/[^a-z]/g, "");
  let str2 = str1.split("").reverse().join("");
  // let str2 = "";
  // for (let x = str1.length - 1; x >= 0; x--) {
  //   str2 += str1.charAt(x);
  // }
  return str1 === str2;
}

module.exports = isPalindrome;
