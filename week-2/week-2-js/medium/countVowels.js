/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let totalVowels = 0;
  const chars = str.toLowerCase().split("");
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (c == "a" || c == "e" || c == "i" || c == "o" || c == "u") totalVowels++;
  }
  return totalVowels;
}

module.exports = countVowels;
