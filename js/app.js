important = true;
serverUrl = "https://fsdiapi.azurewebsites.net/";

function toggleImportant() {
  console.log("clicked!");

  if (important) {
    $("#iImportant").removeClass("fas").addClass("far");
    important = false;
  } else {
    $("#iImportant").removeClass("far").addClass("fas");
    important = true;
  }
}

function save() {
  console.log("Saving task");

  // get the value from control
  let title = $("#txtTitle").val();
  let date = $("#selDate").val();
  let location = $("#txtLocation").val();
  let priority = $("#selPriority").val();
  let color = $("#selColor").val();
  let contact = $("#txtContact").val();
  let desc = $("#txtDescription").val();

  // create a new Task object
  let task = new Task(title, important, date, location, priority, color, contact, desc);
  $.ajax({
    type: "POST",
    url: serverUrl + "api/tasks/",
    data: JSON.stringify(task), // from obj to string
    contentType: "application/json",
    success: function (res) {
      console.log("Server says", res);

      let t = JSON.parse(res); // from string to obj
      displayTask(t);
    },
    error: function (error) {
      console.error("Error saving task", error);
    },
  });
}

function displayTask(task) {
  let syntax = `<div class="task">
    <h6>${task.title}</h6>
    <label>${task.location}</label>
    <label>${task.contact}</label>
  </div>`;

  $(".pending-tasks").append(syntax);
}

function init() {
  console.log("Calendar System");

  // load data
  // call a get from the same url
  // json parse
  // travel the array
  // send each objet to display function

  // hook events
  $("#iImportant").click(toggleImportant);
  $("#btnSave").click(save);
}

window.onload = init;

/*

  1 catch the click on the icon
  2 call a function (toggleImportant)
  3 console a message

*/
