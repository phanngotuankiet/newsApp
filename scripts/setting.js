"use strict";

// take in inputs
const newsPerPage = document.getElementById("input-page-size");
const newsCategory = document.getElementById("input-category");

// lấy sự kiện vào nút Save Changes
const saveChanges = document.getElementById("btn-submit");

// mảng này sẽ lưu news per page và news category vào trong local
const settingsArr =
  JSON.parse(getFromStorage("newsperpage")) == null
    ? []
    : JSON.parse(getFromStorage("newsperpage"));

console.log(settingsArr);

// Sau khi update 2 tham số này cho User, bạn cũng sẽ thay đổi phần hiển thị cho trang News với các cài đặt tương ứng.
/*
News per page: Lượng bài viết trong 1 trang.
News Category: Danh mục của các tin tức muốn hiển thị trên bảng tin
*/

saveChanges.addEventListener("click", function () {
  // đặt hết dữ liệu đã nhập ở trển vào 1 biến
  const data1 = {
    newsperpage: newsPerPage.value,
    newscategory: newsCategory.value,
  };
  settingsArr.length = 0;
  if (validateData()) {
    settingsArr.push(data1);
    // copy 1 bản vào storage sau khi đã push
    saveToStorage("newsperpage", JSON.stringify(settingsArr));
    alert("Save changes successfully!");
  }
  // làm sạch ô input sau khi nhập xong
  newsPerPage.value = "";
});

function validateData() {
  // kiểm tra coi người dùng có quên nhập trường nào hay không
  if (newsPerPage.value == "") {
    alert("News Per Page must be filled out first");
    return false;
  } else return true;
}
