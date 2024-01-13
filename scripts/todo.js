"use strict";

// lấy dữ liệu từ ô nhập
const task = document.getElementById("input-task");

// bấm vào ô Thêm
const add = document.getElementById("btn-add");

// chọn vào ô task itself
const taskItem = document.querySelector("#todo-list li");

// danh sách chứa các tasks
const taskList = document.getElementById("todo-list");

// chứa mọi thứ về các tasks dựa theo username đã đăng nhập (ở đây là biến owner cho ngang bằng với username đã logged)
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// biến trích xuất danh sách tasks dựa theo username đã logged in từ local storage
const todoArr =
  JSON.parse(getFromStorage("tasks")) == null
    ? []
    : JSON.parse(getFromStorage("tasks"));
// check console
console.log("todoArr: ");
console.log(todoArr);

// báo user không bỏ trống ô nhập task trc khi click Add
function validateData() {
  if (task.value == "") {
    alert("Please input task before hitting Add button");
    return false;
  } else return true;
}

let currentUser =
  JSON.parse(getFromStorage("usernameCurrent")) == null
    ? []
    : JSON.parse(getFromStorage("usernameCurrent"));

// render tasks
function renderTasks(todoArr) {
  document.getElementById("todo-list").innerHTML = "";
  for (let i = 0; i < todoArr.length; i++) {
    // lướt qua toàn bộ danh sách các task và point vào những task object có username đã lưu giống với usernameCurrent của userCurrent
    if (todoArr[i].owner == currentUser[0].usernameCurrent) {
      let newAddedTask = document.createElement("li");

      if (todoArr[i].isDone == false) {
        newAddedTask.innerHTML = `<li id="task-item" onclick="toggleTask(${i})">${todoArr[i].task}<span class="close" onclick="deleteTask('${todoArr[i].task}')">×</span></li>`;
      } else if (todoArr[i].isDone == true) {
        newAddedTask.innerHTML = `<li id="task-item" class="checked" onclick="toggleTask(${i})">${todoArr[i].task}<span class="close" onclick="deleteTask('${todoArr[i].task}')">×</span></li>`;
      }

      document.getElementById("todo-list").appendChild(newAddedTask);
    }
  }
}
// mớI vào trang thì render
renderTasks(todoArr);

// những gi diễn ra sau khi click vào nút thêm mới 1 task
add.addEventListener("click", function () {
  // đặt hết dữ liệu đã nhập ở ô task vào 1 biến
  const data1 = {
    task: task.value,
    owner: currentUser[0].usernameCurrent,
    isDone: false,
  };

  if (validateData()) {
    // tạo biến chứa dữ liệu vừa nhập dựa theo class Task
    const newTask = new Task(data1.task, data1.owner, data1.isDone);

    todoArr.push(newTask);
    // copy 1 bản vào storage sau khi đã push
    // saveToStorage("owner", JSON.stringify(todoArr));
    saveToStorage("tasks", JSON.stringify(todoArr));

    // lưu xong task đã nhập thì render ra bảng
    renderTasks(todoArr);

    //render xong thì xoá ô input
    task.value = "";
  }

  const getTasksFromLS = JSON.parse(getFromStorage("tasks"));
  console.log("getTasksFromLS: ", getTasksFromLS); 
});

// này để check F12
console.log("currentUser: ");
console.log(currentUser);

// hàm này để check item todo đã hoàn thành hoặc uncheck nếu đổi ý, đồng thời đổi giá trị của isDone tuỳ theo người dùng có check/uncheck hay không
function toggleTask(position) {
  console.log("selected position to toggle on off: ", position);
  console.log("task được chọn để toggle: ", todoArr[position].task);

  // sau đó render lại từ localstorage
  const getTasksFromLS = JSON.parse(getFromStorage("tasks"));
  console.log("sau khi toggle thì đây là list task: ", getTasksFromLS);

  document.querySelectorAll("#task-item")[position].classList.toggle("checked");

  if (
    document
      .querySelectorAll("#task-item")
      [position].classList.contains("checked")
  ) {
    todoArr[position].isDone = true;
    // update dữ liệu mới toggle vào localstorage
    saveToStorage("tasks", JSON.stringify(todoArr));
  } else {
    todoArr[position].isDone = false;
    // update dữ liệu mới toggle vào localstorage
    saveToStorage("tasks", JSON.stringify(todoArr));
    // console.log(todoArr);
  }

  // và tải lại trang sau khi toggle
  setTimeout(() => {
    getTasks();
  }, 1000);
}

// lấy dữ liệu của key tasks dưới localstorage
function getTasks () {
  const todoArrList = JSON.parse(getFromStorage("tasks"));
  console.log("task lấy được từ localstorage sau khi xóa/toggle nhằm tự động tải lại trang: ", todoArrList);

  document.getElementById("todo-list").innerHTML = "";
  for (let i = 0; i < todoArrList.length; i++) {
    // lướt qua toàn bộ danh sách các task và point vào những task object có username đã lưu giống với usernameCurrent của userCurrent
    if (todoArrList[i].owner == currentUser[0].usernameCurrent) {
      let newAddedTask = document.createElement("li");

      if (todoArrList[i].isDone == false) {
        newAddedTask.innerHTML = `<li id="task-item" onclick="toggleTask(${i})">${todoArrList[i].task}<span class="close" onclick="deleteTask('${todoArrList[i].task}')">×</span></li>`;
      } else if (todoArrList[i].isDone == true) {
        newAddedTask.innerHTML = `<li id="task-item" class="checked" onclick="toggleTask(${i})">${todoArrList[i].task}<span class="close" onclick="deleteTask('${todoArrList[i].task}')">×</span></li>`;
      }

      document.getElementById("todo-list").appendChild(newAddedTask);
    }
  }
}

// hàm xoá task khỏi todo list
const deleteTask = (task) => {
  setTimeout(() => {
  console.log("task to delete: ", task);

  for (let i = 0; i < todoArr.length; i++) {
    if (todoArr[i].task == task) {
      todoArr.splice(i, 1);
      // update dữ liệu mới xoá vào localstorage
      saveToStorage("tasks", JSON.stringify(todoArr));
      // saveToStorage("owner", JSON.stringify(todoArr));
    }
  }
  }, 1000);

  // xoá xong thì gọi lại bảng
  setTimeout(() => {
    getTasks();
  }, 1000);
};
