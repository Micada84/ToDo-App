let taskArray = new Map();
let task = document.querySelector(".taskBoard");
let lastElmentKey;

window.onload = function() {
  taskArray = new Map(JSON.parse(localStorage.taskArray));
  if (taskArray.size > 0) {
    // console.log(taskArray);
    putValueFromLocalStorage();
  }
}

function putValueFromLocalStorage() {
  taskArray.forEach((value, key) => {
    task.innerHTML += `
    <div class="taskItem" id="${key}">
      <button onclick='deliteTask("${key}")'>Done</button> 
      ${value}
    </div>`;
  });
 
}

function changeValue() {
  let fieldVaule = document.getElementById("textInput").value.trim();
  let fieldID = uuidv4()
 
  if (!taskArray.has(fieldID) && fieldVaule !== "") {
    let newTask = new ToDoApp(fieldVaule, fieldVaule, fieldVaule);
    taskArray.set(fieldID, newTask);
    lastElmentKey = fieldID;
    addElementInBoard();
  }

  document.getElementById("textInput").value = "";
  localStorage.taskArray = JSON.stringify(Array.from(taskArray.entries()));
}

function addElementInBoard() {
  let elName = taskArray.get(lastElmentKey);
  task.innerHTML += `
    <div class="taskItem" id="${lastElmentKey}">
      <button onclick='deliteTask("${lastElmentKey}")'>Done</button>${elName.description}
    </div>`;
}

function deliteTask(par) {
  console.log(">>>>>" + par);
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