let taskArray = new Map();
let task = document.querySelector(".taskBoard");
let lastElmentKey;

window.onload = function() {
  taskArray = new Map(JSON.parse(localStorage.taskArray));
  if (taskArray.size > 0) {
    putValueFromLocalStorage();
  }
}

function putValueFromLocalStorage() {
  taskArray = new Map(JSON.parse(localStorage.taskArray));
  taskArray.forEach((value, key) => {
    task.innerHTML += `
    <div class="taskItem" id="${key}">
      <button class="taskButton"onclick='deleteTask("${key}")'>Done</button>
      <div>
        <ul>
            <li> ${value.description}</li>
            <li> Finish task until ${value.date}</li>
        </ul>
      </div>
    </div>`;
  });
 
}

function changeValue() {
  let fieldVaule = document.getElementById("textInput").value.trim();
  let dateVaule = document.getElementById("dateInput").value;
  let importanceValue = document.getElementById("importance").value;
  let fieldID = uuidv4()

  console.log(dateVaule, 'vrednost datuma');
 
  if (!taskArray.has(fieldID) && fieldVaule !== "") {
    let newTask = new ToDoApp(fieldVaule, dateVaule, importanceValue);
    console.log(newTask);
    taskArray.set(fieldID, newTask);
    lastElmentKey = fieldID;
    addElementInBoard();
  }

  document.getElementById("textInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("importance").value = "";
  localStorage.taskArray = JSON.stringify(Array.from(taskArray.entries()));
}

function addElementInBoard() {
  let elName = taskArray.get(lastElmentKey);
  task.innerHTML += `
    <div class="taskItem" id="${lastElmentKey}">
      <button class="taskButton"onclick='deleteTask("${lastElmentKey}")'>Done</button>
      <div>
        <ul>
            <li> ${elName.description}</li>
            <li> Finish task until ${elName.date}</li>
        </ul>
      </div>
    </div>`;
}

function deleteTask(par) {
  taskArray.delete(par);
  let deletedItem = document.getElementById(`${par}`)
  console.log(deletedItem);
  task.removeChild(deletedItem);
  deleteFromLocalStorige(par);
}

function deleteFromLocalStorige(id) {
  let localStorageData  = new Map(JSON.parse(localStorage.taskArray));
  localStorageData.delete(id);
  localStorage.taskArray = JSON.stringify(Array.from(localStorageData.entries()));
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


class ToDoApp {
   description;
   date;
   importance;

   constructor(description, date, importance) {
    this.description = description;
    this.date = date;
    this.importance = importance;
   }
}