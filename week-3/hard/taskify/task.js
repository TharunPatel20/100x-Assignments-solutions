function createTask() {
  // Get values from input fields
  const heading = document.getElementById("heading").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("type").value;

  // Create a div to display the task
  const task = document.createElement("div");

  // Add the draggable attribute and drag class
  task.setAttribute("draggable", "true");
  task.classList.add("drag");

  // Create elements to hold task details
  const h4 = document.createElement("b");
  const para = document.createElement("p");
  const span = document.createElement("span");
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[date.getUTCMonth()];
  const timeStamp =
    monthName.slice() + " " + date.getHours() + ":" + date.getMinutes();
  // Assign text content to the created elements
  h4.innerHTML = heading;
  para.innerHTML = description;
  span.innerHTML = `<b>creation date:</b> <i>${timeStamp}</i>   <br> <b>priority:</b> <i>${category}</i>`;

  // Append heading, description, and category to the task
  task.appendChild(h4);
  task.appendChild(para);
  task.appendChild(span);

  // Append the new task to the 'tasks' div
  document.getElementById("tasks").appendChild(task);

  // Clear input fields after adding the task
  document.getElementById("description").value = "";
  document.getElementById("heading").value = "";

  // Add drag event listeners to the new task
  addDragEvents(task);
}

// Function to add drag and drop event listeners to an element
function addDragEvents(task) {
  task.addEventListener("dragstart", function (e) {
    let selected = e.target;

    document.querySelectorAll(".drag-container").forEach((container) => {
      container.addEventListener("dragover", function (e) {
        e.preventDefault();
      });

      container.addEventListener("drop", function (e) {
        container.appendChild(selected);
        selected = null;
      });
    });
  });
}

// Add drag event listeners to the existing containers
document.querySelectorAll(".drag-container").forEach((container) => {
  container.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
});
