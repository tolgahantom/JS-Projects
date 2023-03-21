const menuIcon = document.querySelector("#leftMenuIcon");
const leftMenu = document.querySelector(".left-menu");
const addPersonPage = document.querySelector(".add-person-container");
const addPersonButton = document.querySelector(".addPersonButton");
const openPageButton = document.querySelector(".add-person-button");
const closeAddButton = document.querySelector(".close-button");
const friendList = JSON.parse(localStorage.getItem("friends") || "[]");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayEl = document.querySelector(".day").querySelector(".time");
const hourEl = document.querySelector(".hour").querySelector(".time");
const minuteEl = document.querySelector(".minute").querySelector(".time");
const secondEl = document.querySelector(".second").querySelector(".time");
let timer;

showInFriendList = () => {
  document.querySelectorAll(".person-list-item").forEach((item) => {
    item.remove();
  });
  friendList.forEach((friend, index) => {
    let liEl = `
      <li class="person-list-item">
        <div class="person-info">
          <h3 class="nickname">${friend.nickname}</h3>
          <h6 class="birthday">${friend.birthday}</h6>
        </div>
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

yearCalculator = (birthday) => {
  let newBirthday = new Date(birthday);
  if (new Date().getMonth() - newBirthday.getMonth() > 0) {
    return new Date().getFullYear() + 1;
  } else {
    return new Date().getFullYear();
  }
};

startCountdown = async (personIndex) => {
  menuIcon.click();
  clearInterval(timer);
  let selectedPersonBirthday = new Date(friendList[personIndex].birthday);
  let newBirthday = new Date(
    `${
      months[selectedPersonBirthday.getMonth()]
    } ${selectedPersonBirthday.getDate()} ${yearCalculator(
      selectedPersonBirthday
    )} 00:00:00`
  );
  timer = await setInterval(() => {
    let timeLeft = (newBirthday - new Date()) / 1000;

    const days = Math.floor(timeLeft / 3600 / 24);
    const hours = Math.floor(timeLeft / 3600) % 24;
    const mins = Math.floor(timeLeft / 60) % 60;
    const seconds = Math.floor(timeLeft) % 60;

    dayEl.innerHTML = days;
    hourEl.innerHTML = formatTime(hours);
    minuteEl.innerHTML = formatTime(mins);
    secondEl.innerHTML = formatTime(seconds);
  }, 1000);
};

formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
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
  document.querySelector("input").value = "";
  document.querySelector(".calendar").value = "";
  addPersonPage.classList.add("active");
};

closePage = () => {
  addPersonPage.classList.remove("active");
};

menuIcon.addEventListener("click", toggleleftMenu);
addPersonButton.addEventListener("click", addPersonToLS);
openPageButton.addEventListener("click", openPage);
closeAddButton.addEventListener("click", closePage);
