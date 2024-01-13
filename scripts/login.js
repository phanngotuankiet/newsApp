"use strict";

// username and password input
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");

// hit button Login
const login = document.getElementById("btn-submit");

// lấy dữ liệu đã nhập
const data = { username: usernameInput.value, password: passwordInput.value };

// lưu userArr xuống localstorage - này đang xài hàm bên storage.js
const userArr =
  JSON.parse(getFromStorage("username")) == null
    ? []
    : JSON.parse(getFromStorage("username"));

console.log(userArr);

// hàm duyệt coi username nhập vào có ở trong mảng hay không - nếu không thì trả về true - hàm này chỉ dành cho hàm validateData()
function usernameExists() {
  let variable = false;
  // lấy dữu liệu username nhập vào ở ô input username
  var username = document.forms["loginForm"]["inputUsername"].value;
  for (let i = 0; i < userArr.length; i++) {
    // username nhập vào có ở trong mảng hay không
    if (username == userArr[i].username) {
      variable = true;
    }
  }
  return variable;
}
// validate coi có nhập thiếu ô nào không và đưa ra thông báo lỗi nếu nhập sai password hoặc username không tồn tại
function validateData() {
  // lấy dữ liệu từ trường nhập
  var username = document.forms["loginForm"]["inputUsername"].value;
  var pw = document.forms["loginForm"]["inputPassword"].value;

  // duyệt coi password có đúng với username đã lấy trên ô input hay không
  for (let i = 0; i < userArr.length; i++) {
    // đúng username nhưng sai password trong object ấy
    if (username == userArr[i].username && pw != userArr[i].password) {
      alert("Wrong password!");
      return false;
    }
  }

  // kiểm tra coi người dùng có quên nhập trường nào hay không
  if (username == "") {
    alert("Username must be filled out");
    return false;
  } else if (pw == "") {
    alert("Password must be filled out");
    return false;
  } else if (!usernameExists()) {
    alert("Username does not exist");
    return false;
  } else return true;
}

// Lưu thông tin User đăng nhập trong User storage
let currentUser =
  JSON.parse(getFromStorage("usernameCurrent")) == null
    ? []
    : JSON.parse(getFromStorage("usernameCurrent"));

// những gì xảy ra sau khi ấn nút Login
login.addEventListener("click", function () {
  // đặt hết dữ liệu đã nhập trong 2 ô của page Login vào 1 biến
  const data1 = {
    usernameCurrent: usernameInput.value,
    passwordCurrent: passwordInput.value,
  };
  if (validateData()) {
    alert(
      "Đăng nhập thành công!"
    );

    currentUser.push(data1);
    // copy 1 bản vào storage sau khi đã push
    saveToStorage("usernameCurrent", JSON.stringify(currentUser));

    // chuyển đến trang Home
    setTimeout(() => {
      window.location.href = "https://phanngotuankiet.github.io/newsApp/index.html";
    }, 1000);

    // dòng này thử nghiệm console log
    console.log(currentUser);
  }
});

console.log(currentUser);
