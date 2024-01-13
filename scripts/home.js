"use strict";

// làm 1 chức năng mà dò nếu người dùng chưa login thì hiện ra trang này, còn nếu đã đăng nhập rồi thì hiển thị ra trang nọ

// Nếu người dùng đã đăng nhập, bạn sẽ hiển thị thông điệp chào mừng như sau: "Welcome + Firstname" và nút Logout.
const welcomeMessage = document.getElementById("welcome-message");

// hit button Logout - này sẽ hiện ra sau khi login thành công - và ở đây là lây sự kiện từ việc click vào nút này
const logout = document.getElementById("btn-logout");

// lưu userArr xuống localstorage - này đang xài hàm bên storage.js
const userArr =
  JSON.parse(getFromStorage("username")) == null
    ? []
    : JSON.parse(getFromStorage("username"));
// thử nghiệm - sau xoá
console.log(userArr);

// lấy biến curentUser trong local storage
let currentUser =
  JSON.parse(getFromStorage("usernameCurrent")) == null
    ? []
    : JSON.parse(getFromStorage("usernameCurrent"));
// này để check - nhớ xoá
console.log(currentUser);

// nếu user chưa login, màn hình sẽ hiển thị chỉ 2 nút login và register và xoá btn logout
function checkIfUserLoggedIn() {
  if (currentUser.length != 0) {
    // khi người dùng đã logged in
    // này để hiển thị Welcome message của người đăng nhập ấy
    for (let i = 0; i < userArr.length; i++) {
      if (currentUser[0].usernameCurrent == userArr[i].username) {
        welcomeMessage.innerHTML = "Welcome " + userArr[i].firstName;
      }
    }
    document.getElementById("login-modal").classList.add("d-none");
  } else {
    // khi chưa logged in
    document.getElementById("main-content").classList.add("d-none");
  }
}
// coi user đã đăng nhập chưa để xoá những thẻ không cần thiết
checkIfUserLoggedIn();

// nếu user chọn logout
logout.addEventListener("click", function () {
  // currentUser.length = 0;
  localStorage.removeItem("usernameCurrent");
  console.log(currentUser);
  alert("You have been logged out!");
  setTimeout(function () {
    // chuyển trang đến màn hình login
    window.location.href = "../pages/login.html";
  }, 1000);
});
