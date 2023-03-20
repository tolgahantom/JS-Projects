const menuIcon = document.querySelector("#leftMenuIcon");
const leftMenu = document.querySelector(".left-menu");
const addPersonPage = document.querySelector(".add-person-container");
const addPersonButton = document.querySelector(".addPersonButton");
const openPageButton = document.querySelector(".add-person-button");
const closeAddButton = document.querySelector(".close-button");
const friendList = JSON.parse(localStorage.getItem("friends") || "[]");

showInFriendList = () => {
  document.querySelectorAll(".person-list-item").forEach((item) => {
    item.remove();
  });
  friendList.forEach((friend, index) => {
    let liEl = `
      <li class="person-list-item">
        <h3 class="nickname">${friend.nickname}</h3>
        <div class="settings-button">
          <div onclick="removeFriend(${index})" class="startCountdownButton">
            <i class="fa-solid fa-x"></i>
          </div>
          <div onclick="startCountdown(${index})" class="startCountdownButton">
            <i class="fa-solid fa-paper-plane"></i>
          </div>
        </div>
      </li>
    `;
    document.querySelector(".person-list").innerHTML += liEl;
  });
};

removeFriend = (personIndex) => {
  friendList.splice(personIndex, 1);
  localStorage.setItem("friends", JSON.stringify(friendList));
  showInFriendList();
};

startCountdown = (personIndex) => {
  let selectedPerson = friendList[personIndex];
  console.log(selectedPerson);
};

showInFriendList();

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
  let personInfo = {
    nickname: nickName,
    birthday: date.toString(),
  };
  friendList.push(personInfo);
  localStorage.setItem("friends", JSON.stringify(friendList));
  showInFriendList();
  closeAddButton.click();
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
