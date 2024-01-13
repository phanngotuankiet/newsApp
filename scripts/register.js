"use strict";

// take input from Register button
const fnameInput = document.getElementById("input-firstname");
const lnameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const pwInput = document.getElementById("input-password");
const pwconfirmInput = document.getElementById("input-password-confirm");
// Register btn
const register = document.getElementById("btn-submit");

// đặt hết dữ liệu đã nhập ở trển vào 1 biến
const data = {
  firstname: fnameInput.value,
  lastname: lnameInput.value,
  username: usernameInput.value,
  password: pwInput.value,
  passwordConfirm: pwconfirmInput.value,
};

// lưu userArr xuống localstorage - này đang xài hàm bên storage.js
const userArr =
  JSON.parse(getFromStorage("username")) == null
    ? []
    : JSON.parse(getFromStorage("username"));
// check console
console.log(userArr);

// function validate
function validateData() {
  // lấy dữ liệu từ tất cả các ô input
  var fname = document.forms["registerForm"]["inputFirstName"].value;
  var lname = document.forms["registerForm"]["inputLastName"].value;
  var username = document.forms["registerForm"]["inputUsername"].value;
  var pw = document.forms["registerForm"]["inputPassword"].value;
  var pwconfirm = document.forms["registerForm"]["inputConfirmPassword"].value;

  // Username must be unique
  for (let i = 0; i < userArr.length; i++) {
    if (username == userArr[i].username) {
      alert("Username already exists!");
      return false;
    }
  }

  // check if less than 8 digit password field
  if (fname == "") {
    // no field is left
    alert("First name must be filled out");
    return false;
  } else if (lname == "") {
    alert("Last name must be filled out");
    return false;
  } else if (username == "") {
    alert("Username must be filled out");
    return false;
  } else if (pw == "") {
    alert("Password must be filled out");
    return false;
  } else if (pwconfirm == "") {
    alert("Password confirm must be filled out");
    return false;
  } else if (pw.toString().length <= 8) {
    alert("Password length must be above 8 digits");
    return false;
  } else if (pw != pwconfirm) {
    // check nếu PW trùng PWC
    alert("Password and Confirm Password must be similar!");
    return false;
  } else return true;
}

// đây là những gi sẽ xảy ra sau khi ấn Register
register.addEventListener("click", function () {
  // đặt hết dữ liệu đã nhập ở trển vào 1 biến
  const data1 = {
    firstname: fnameInput.value,
    lastname: lnameInput.value,
    username: usernameInput.value,
    password: pwInput.value,
  };
  if (validateData()) {
    const newUser = new User(
      data1.firstname,
      data1.lastname,
      data1.username,
      data1.password
    );

    userArr.push(newUser);
    // copy 1 bản vào storage sau khi đã push
    saveToStorage("username", JSON.stringify(userArr));

    // chuyển trang đến màn hình login
    window.location.href = "../pages/login.html";
  }
});

// hàm xoá dữ liệu vừa nhập trên form - coi cần k đã
const clearInput = () => {
  fnameInput.value = "";
  lnameInput.value = "";
  usernameInput.value = "";
  pwInput.value = "";
  pwconfirmInput.value = "";
};

// hàm này bài gợi ý nhưng chưa dùng luôn, không biết khi nào dùng nữa
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );

  return user;
}
