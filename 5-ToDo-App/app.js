const input = document.querySelector("input");
const unFinishedUlEL = document.querySelector("#unfinished");
const FinishedUlEL = document.querySelector("#finished");
const ulEl = document.querySelector(".list-items");
const clearButton = document.getElementById("clearButton");
let finished;

const list = JSON.parse(localStorage.getItem("list") || "[]");

finishedTask = (deletingIndex) => {
  list[deletingIndex].finished = true;
  localStorage.setItem("list", JSON.stringify(list));
  showList();
};

deleteTask = (deletingIndex) => {
  list.splice(deletingIndex, 1);
  localStorage.setItem("list", JSON.stringify(list));
  showList();
};

clearButton.addEventListener("click", () => {
  let newList;
  list.forEach((item, index) => {
    newList = list.filter((e) => {
      if (!e.finished) {
        return true;
      }
    });
  });

  localStorage.setItem("list", JSON.stringify(newList));
  location.reload();
});

showList = () => {
  document.querySelectorAll(".list-item").forEach((note) => note.remove());
  list.forEach((item, index) => {
    if (!item.finished) {
      let liEl = `<li onclick="finishedTask(${index})" class="list-item">${item.title}</li>`;
      ulEl.innerHTML += liEl;
    } else {
      let liEl = `<li onclick="deleteTask(${index})" class="list-item">${item.title}</li>`;
      FinishedUlEL.innerHTML += liEl;
    }
  });
};

showList();

addItemToLS = (taskName) => {
  list.push(taskName);
  localStorage.setItem("list", JSON.stringify(list));
  input.value = "";
};

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (input.value == "") {
      alert("You must fill in the blank");
      return;
    } else {
      let taskInfo = {
        title: input.value,
        finished: false,
      };
      addItemToLS(taskInfo);
      showList();
    }
  }
});
