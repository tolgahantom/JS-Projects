const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = popupBox.querySelector("header i");
const addButton = popupBox.querySelector("button");
const title = popupBox.querySelector("input");
const desc = popupBox.querySelector("textarea");
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

let isUpdate = false,
  updateId;

// getting notes from LS if exist
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

showNotes = () => {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = `
    <li class="note">
      <div class="details">
        <p>${note.title}</p>
        <span>${note.desc}</span>
      </div>
      <div class="bottom-content">
          <span>${note.date}</span>
        <div class="settings">
        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
          <ul class="menu">
            <li onclick="updateNote('${index}', '${note.title}', '${note.desc}')"><i class="fa-solid fa-pen"></i>Edit</li>
            <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
          </ul>
        </div>
      </div>
    </li>
    `;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
};

showNotes(); // showing notes UI

showMenu = (iTag) => {
  iTag.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != iTag) {
      iTag.parentElement.classList.remove("show");
    }
  });
};

deleteNote = (deleteIndex) => {
  let checkConfirm = confirm("Are you sure you want to delete this note?");
  if (!checkConfirm) return;
  //removing item from Array
  notes.splice(deleteIndex, 1);
  //Saving updates notes to LS
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
};

updateNote = (updateIndex, title, desc) => {
  updateId = updateIndex;
  isUpdate = true;
  addBox.click();
  popupBox.querySelector("input").value = title;
  popupBox.querySelector("textarea").value = desc;
  addButton.innerText = "Update Note";
  document.querySelector(".popup header p").innerText = "Update a Note";
};

changeDateFormat = (date) => {
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

addBox.addEventListener("click", () => {
  popupBox.querySelector("input").focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  popupBox.classList.remove("show");
  title.value = "";
  desc.value = "";
  addButton.innerText = "Add Note";
  document.querySelector(".popup header p").innerText = "Add a new Note";
});

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = title.value;
  let noteDesc = desc.value;
  if (noteDesc == "" || noteTitle == "") {
    alert("You must fill in the blanks");
    return;
  }
  let date = changeDateFormat(new Date());
  let noteInfo = {
    title: noteTitle,
    desc: noteDesc,
    date: date,
  };
  if (!isUpdate) {
    //Adding note to notes array
    notes.push(noteInfo);
  } else {
    isUpdate = false;
    //updating note
    notes[updateId] = noteInfo;
  }
  //Saving notes to LS
  localStorage.setItem("notes", JSON.stringify(notes));
  closeIcon.click();
  showNotes();
});
