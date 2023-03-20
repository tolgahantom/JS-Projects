const menuIcon = document.querySelector("#leftMenuIcon");
const leftMenu = document.querySelector(".left-menu");
const addPersonPage = document.querySelector(".add-person-container");
const addPersonButton = document.querySelector(".addPersonButton");
const openPageButton = document.querySelector(".add-person-button");
const closeAddButton = document.querySelector(".close-button");

toggleleftMenu = () => {
  leftMenu.classList.toggle("active");
  menuIcon.classList.toggle("active");
};

addPersonToLS = () => {
  let nickName = document.querySelector("#name").value;
  let date = document.querySelector("#date").value;
  if (nickName == "" || date == "") {
    alert("You must write nickname and date");
    return;
  }
};

openPage = () => {
  addPersonPage.classList.add("active");
};

closePage = () => {
  addPersonPage.classList.remove("active");
};

menuIcon.addEventListener("click", toggleleftMenu);
addPersonButton.addEventListener("click", addPersonToLS);
openPageButton.addEventListener("click", openPage);
closeAddButton.addEventListener("click", closePage);
