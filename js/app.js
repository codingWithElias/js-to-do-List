/*
 * JavaScript Simple To-Do List
 * version: 1.0.0
 * By: Elias Abdurrahman
 * date: june 18, 2019
 */
function loadData() {
  var data;
  if (
    localStorage.getItem("todo_app_data") == null ||
    localStorage.getItem("todo_app_data") == undefined
  ) {
    var Testdata = [{
      id: 1,
      title: "hello world",
      daate_time: "12:00 | june 17 2019",
      done: true
    }];
    localStorage.setItem("todo_app_data", JSON.stringify(Testdata));
    dataJSON = localStorage.getItem("todo_app_data");
    data = JSON.parse(dataJSON);
  } else {
    dataJSON = localStorage.getItem("todo_app_data");
    data = JSON.parse(dataJSON);
  }
  return data;
}

var showToDoVar = document.getElementById("showToDo");

function showToDo() {
  showToDoVar.innerHTML = "";
  if (loadData().length == 1) {
    showToDoVar.innerHTML += `<div class="todo-item">
               <div class="empty">
               <img src="img/f.png" alt="" width='100%'/>
               <img src="img/Ellipsis.gif" alt="" width='80px'/>
               </div>
            </div>`;
  } else {
    for (var i = loadData().length - 1; i > 0; i--) {
      if (loadData()[i].done == true) {
        showToDoVar.innerHTML += `<div class="todo-item">
                <a href="#" class="remove-to-do" onclick="removeToDo(${i})">x</a>
                <input type="checkbox" onchange="doneToDo(true, ${i}, this)" checked="checked" />
                <h2 class="h2-done">${loadData()[i].title}</h2>
                <br />
                <small>created ${loadData()[i].daate_time}</small>
            </div>
            `;
      } else {
        showToDoVar.innerHTML += `<div class="todo-item">
            <a href="#" class="remove-to-do" onclick="removeToDo(${i})">x</a>
            <input type="checkbox" onchange="doneToDo(false, ${i}, this)" />
            <h2>${loadData()[i].title}</h2>
            <br />
            <small>created ${loadData()[i].daate_time}</small>
        </div>
        `;
      }
    }
  }
}

function addToDo() {
  var toDoTitle = document.getElementById("ToDotitle");
  if (toDoTitle.value == "") {
    toDoTitle.style.borderColor = "#FF6666";
    toDoTitle.placeholder = "This field is required";
    return 0;
  }
  var d = new Date();
  objId = d.getTime();
  month = d.getMonth();
  objTime =
    d.getHours() +
    ":" +
    d.getMinutes() +
    " | " +
    d.getDate() +
    " / " +
    month +
    " / " +
    d.getFullYear();

  newObj = {
    id: objId,
    title: toDoTitle.value,
    daate_time: objTime,
    done: false
  };
  var newData = [];
  newData = JSON.parse(localStorage.getItem("todo_app_data"));
  newData.push(newObj);

  newDataStr = JSON.stringify(newData);
  localStorage.setItem("todo_app_data", newDataStr);
  toDoTitle.value = "";
  toDoTitle.style.borderColor = "#ccc";
  toDoTitle.placeholder = "what do you need to do?";


  showToDo();
}

function doneToDo(isDone, index, tag) {
  var newData;
  newData = JSON.parse(localStorage.getItem('todo_app_data'));
  if (isDone == true) {
    tag.nextSibling.nextSibling.removeAttribute('class');
    newData[index].done = false;
    newDataStr = JSON.stringify(newData);
    localStorage.setItem('todo_app_data', newDataStr);
    isDone = false;
  } else {
    tag.nextSibling.nextSibling.setAttribute('class', 'h2-done');
    newData[index].done = true;
    newDataStr = JSON.stringify(newData);
    localStorage.setItem('todo_app_data', newDataStr);
    isDone = true;
  }
  showToDo();
}

function removeToDo(index) {
  var newData;
  newData = JSON.parse(localStorage.getItem("todo_app_data"));
  newData.splice(index, 1);
  newDataStr = JSON.stringify(newData);
  localStorage.setItem("todo_app_data", newDataStr);
  showToDo();
}