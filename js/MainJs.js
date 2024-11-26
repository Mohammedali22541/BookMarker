let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let addBookmark = document.getElementById("addBtn");
let siteList = [];
let closeBtn = document.getElementById("closeBtn");
let invalidContainer = document.querySelector(".invalid-input-container ");

if (localStorage.getItem("containerList") !== null) {
  siteList = JSON.parse(localStorage.getItem("containerList"));
  displayData();
}

addBookmark.addEventListener("click", function () {
  if (validName() && validUrl()) {
    site = {
      name: siteName.value,
      url: siteUrl.value,
    };
    siteList.push(site);
    displayData();
    // clearData();
    localStorage.setItem("containerList", JSON.stringify(siteList));
  } else {
    invalidContainer.classList.remove("d-none");
  }
});

function displayData() {
  box = "";
  for (var i = 0; i < siteList.length; i++) {
    box += `
    <tr>
      <td>${i}</td>
      <td>${siteList[i].name}</td>
      <td>
        <button class="btn visit-color"
        onclick="window.open('${siteList[i].url}','_blank')" 
        >
          <span><i class="fa-solid fa-eye pe-2"></i></span>
          Visit
          <a href=""></a>
        </button>
      </td>
      <td>
        <button onclick="deleteSite(${i})" class="btn btn-danger ">
          <span><i class="fa-solid fa-trash-can pe-2"></i></span>

          delete
        </button>
      </td>
    </tr>
`;
  }
  document.getElementById("tbody").innerHTML = box;
}

function clearData() {
  siteName.value = null;
  siteUrl.value = null;

  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}

function deleteSite(num) {
  siteList.splice(num, 1);
  displayData();

  console.log(siteList);
  localStorage.setItem("containerList", JSON.stringify(siteList));
}

function validName() {
  var regex = /^[a-zA-Z]{3,15} ?[0-9]?$/gim;
  let text = siteName.value;

  if (regex.test(text)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}

function validUrl() {
  var regex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  let text = siteUrl.value;

  if (regex.test(text)) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    return false;
  }
}

closeBtn.addEventListener("click", function () {
  invalidContainer.classList.add("d-none");
});

document.addEventListener("click", function (e) {
  if (e.target == invalidContainer) {
    invalidContainer.classList.add("d-none");
  }
});
