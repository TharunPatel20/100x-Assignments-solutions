// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)

var count = 1;
function timer(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      reject("error");
    } else {
      setTimeout(resolve, ms);
    }
  });
}
function seconds() {
  console.log(count++);
  timer(1000).then(seconds);
}
timer(1000).then(seconds).catch();
