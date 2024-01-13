"use strict";

// array này chứa 2 thông tin vừa nhập vào ở bên setting.js
const settingsArr =
  JSON.parse(getFromStorage("newsperpage")) == null
    ? []
    : JSON.parse(getFromStorage("newsperpage"));

// 2 biến này để thực hiện việc ấn nút Previous và Next để chuyển trang
var pagenum = 1;
var previousPageNum = 1;
async function pageChuyen(pageNum) {
  console.log("pagenum: " + pagenum + ", previousPageNum: " + previousPageNum);
  if (typeof pagenum == "number") {
    // nếu như pagenum là số thì previousPageNum mới nhận giá trị số ấy từ pagenum
    previousPageNum = pagenum;
  }
  pagenum = pageNum;

  const newsurl = `https://newsapi.org/v2/top-headlines?country=hk&category=${settingsArr[0].newscategory}&pageSize=${settingsArr[0].newsperpage}&page=${pageNum}&apikey=c7f3cbf37e7d4d7da2766885ec8c48a1`;
  // making an API call and getting the response back
  const newsAPIUrl = await fetch(newsurl);
  // parsing it to json format
  const data = await newsAPIUrl.json();

  // làm trống những news articles trước đó trước khi tải news article mới
  document.getElementById("news-container").innerHTML = "";

  for (let i = 0; i < data.articles.length; i++) {
    document.getElementById(
      "news-container"
    ).innerHTML += `<div class="card flex-row flex-wrap">
  <div class="card mb-3" style="">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${data.articles[i].urlToImage}"
          class="card-img"
          alt="${data.articles[i].title}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${data.articles[i].title}</h5>
          <p class="card-text">${data.articles[i].description}</p>
          <a href="${data.articles[i].url}"
            class="btn btn-primary">View</a>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  // này là để khi user ấn vào previous hoặc next thì thực hiện chuyển trang
  if (pagenum == "Previous" && previousPageNum != 1) {
    previousPageNum--;
    console.log("nextPrevious co chay previous");
    pageChuyen(previousPageNum);
  } else if (pagenum == "Next") {
    previousPageNum++;
    console.log("nextPrevious co chay next");
    pageChuyen(previousPageNum);
  }

  // sau khi chuyển page thành công thì khởi chạy hàm tạo pagination lại lần nữa
  pageNumberGenerator();
}

const newsurl = `https://newsapi.org/v2/top-headlines?country=hk&category=${settingsArr[0].newscategory}&pageSize=${settingsArr[0].newsperpage}&page=1&apikey=c7f3cbf37e7d4d7da2766885ec8c48a1`;
// làm chức năng hiện bài viết cho news.html
async function getnews() {
  // making an API call and getting the response back
  const newsAPIUrl = await fetch(newsurl);
  // parsing it to json format
  const data = await newsAPIUrl.json();

  for (let i = 0; i < data.articles.length; i++) {
    document.getElementById(
      "news-container"
    ).innerHTML += `<div class="card flex-row flex-wrap">
  <div class="card mb-3" style="">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${data.articles[i].urlToImage}"
          class="card-img"
          alt="${data.articles[i].title}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${data.articles[i].title}</h5>
          <p class="card-text">${data.articles[i].description}</p>
          <a href="${data.articles[i].url}"
            class="btn btn-primary">View</a>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }
}
// chạy hàm ở trên để fetch api và hiện tin tức ngay khi vào
getnews();

// tạo pagination với mỗi page chứa 3 news articles
async function pageNumberGenerator() {
  // making an API call and getting the response back
  const newsAPIUrl = await fetch(newsurl);
  // parsing it to json format
  const data = await newsAPIUrl.json();

  // những dòng dưới đây vừa tạo pagination vừa ẩn nút Previous hoặc Next tuỳ điều kiện
  if (pagenum == 1) {
    // xoá Previous nếu đang ở trang 1
    document.getElementById("numberOfPage").innerHTML = "";

    for (let i = 1; i <= data.totalResults / data.articles.length; i++) {
      let newAddedPage = document.createElement("li");
      newAddedPage.innerHTML = `<li class="page-item" onclick="pageChuyen(${i})">
    <a class="page-link">${i}</a>
  </li>`;
      document.getElementById("numberOfPage").appendChild(newAddedPage);
    }
    numberOfPage.innerHTML += `<li class="page-item" onclick="pageChuyen('Next')">
  <button class="page-link" id="btn-next">Next</button>
</li>`;
  } else if (pagenum == Math.trunc(data.totalResults / data.articles.length)) {
    // xoá Next nếu đang ở trang cuối
    document.getElementById(
      "numberOfPage"
    ).innerHTML = `<li class="page-item" onclick="pageChuyen('Previous')">
  <button class="page-link" href="#" id="btn-prev">Previous</button>
</li>`;

    for (let i = 1; i <= data.totalResults / data.articles.length; i++) {
      let newAddedPage = document.createElement("li");
      newAddedPage.innerHTML = `<li class="page-item" onclick="pageChuyen(${i})">
    <a class="page-link">${i}</a>
  </li>`;
      document.getElementById("numberOfPage").appendChild(newAddedPage);
    }
  } else {
    // nếu đang ở trang số thì nút Previous và nút Next được giữ nguyên
    document.getElementById(
      "numberOfPage"
    ).innerHTML = `<li class="page-item" onclick="pageChuyen('Previous')">
  <button class="page-link" href="#" id="btn-prev">Previous</button>
</li>`;

    for (let i = 1; i <= data.totalResults / data.articles.length; i++) {
      let newAddedPage = document.createElement("li");
      newAddedPage.innerHTML = `<li class="page-item" onclick="pageChuyen(${i})">
    <a class="page-link">${i}</a>
  </li>`;
      document.getElementById("numberOfPage").appendChild(newAddedPage);
    }
    numberOfPage.innerHTML += `<li class="page-item" onclick="pageChuyen('Next')">
  <button class="page-link" id="btn-next">Next</button>
</li>`;
  }
}
// khởi chạy hàm vừa tạo
pageNumberGenerator();
