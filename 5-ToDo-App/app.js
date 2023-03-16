const input = document.querySelector("input");
const ulEl = document.querySelector(".list-items");

const list = JSON.parse(localStorage.getItem("list") || "[]");

deleteTask = (deletingIndex) => {
  list.splice(deletingIndex, 1);
  localStorage.setItem("list", JSON.stringify(list));
  showList();
};

showList = () => {
  document.querySelectorAll(".list-item").forEach((note) => note.remove());
  list.forEach((item, index) => {
    let liEl = `<li onclick="deleteTask(${index})" class="list-item">${item}</li>`;
    ulEl.innerHTML += liEl;
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
      addItemToLS(input.value);
      showList();
    }
  }
});
