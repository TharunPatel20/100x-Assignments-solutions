// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

function clock() {
  const now = new Date();

  const hours24 = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  var hrs12 = ((now.getHours() + 11) % 12) + 1;
  var ampm = hrs12 < 12 ? "AM" : "PM";

  console.log("24-hrs format:" + hours24 + ":" + minutes + ":" + seconds);
  // console.log("12-hrs format:" + hrs12 + ":" + minutes + ":" + seconds + " " + ampm);
  console.log(
    `12-hrs format:${hrs12
      .toString()
      .padStart(2, "0")}:${minutes}:${seconds} ${ampm}`
  );

  setTimeout(clock, 1000);
}

clock();
