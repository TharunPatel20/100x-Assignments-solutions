// file cleaner
const fs = require("fs");
var file_content;
fs.readFile("a.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("no such file");
  } else {
    const new_content = data.replace(/\s+/g, " ");
    fs.writeFile("b.txt", new_content, (err) => {
      if (err) console.log("error");
    });
  }
});
