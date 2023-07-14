const wordElement = document.getElementById("word");
const keys = document.querySelectorAll(".key");
const items = document.querySelectorAll(".item");
const popupElement = document.querySelector(".popup");
const popupMessageElement = document.querySelector(".popup-message");
const playAgainButton = document.querySelector("#play-again");
const wrongWordElement = document.querySelector(".wrong-word");
const turkishWord = document.querySelectorAll(".turkish");
const englishWord = document.querySelectorAll(".english");
const turkeyFlag = document.querySelectorAll(".turkey")[0];
const englandFlag = document.querySelectorAll(".england")[0];
const correctLetter = [];
const wrongLetter = [];
let randomIndex = Math.floor(Math.random() * 100);
let selectedWord;

const letters = document.querySelectorAll(".letter");

(function () {
  let inTurksih = localStorage.getItem("language") == "turkish" ? true : false;
  if (inTurksih) {
    turkeyFlag.classList.add("active");
    getRandomWordInTr();
  } else {
    englandFlag.classList.add("active");
    getRandomWordInEn();
  }
})();

keys.forEach((key) => {
  key.addEventListener("click", handleClick, { once: true });
});

englandFlag.addEventListener("click", function () {
  turkeyFlag.classList.remove("active");
  englandFlag.classList.add("active");
  localStorage.setItem("language", "english");
  restartGame();
});

turkeyFlag.addEventListener("click", function () {
  englandFlag.classList.remove("active");
  turkeyFlag.classList.add("active");
  localStorage.setItem("language", "turkish");
  restartGame();
});

playAgainButton.addEventListener("click", restartGame);

function restartGame() {
  correctLetter.splice(0);
  wrongLetter.splice(0);
  let inTurksih = localStorage.getItem("language") == "turkish" ? true : false;
  if (inTurksih) {
    console.log("tükçe");
    getRandomWordInTr();
  } else {
    console.log("eng");

    getRandomWordInEn();
  }
  popupElement.classList.remove("active");
  items.forEach((item) => {
    item.style.display = "none";
  });
  keys.forEach((key) => {
    key.classList.remove("wrong");
    key.classList.remove("correct");
    key.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  let key = e.target.innerText.toLocaleLowerCase("tr");
  let keyElement = e.target;
  if (selectedWord.includes(key)) {
    if (!correctLetter.includes(key)) {
      correctLetter.push(key);
      keyElement.classList.add("correct");
      displayWord();
    }
  } else {
    wrongLetter.push(key);
    keyElement.classList.add("wrong");
    items.forEach((item, index) => {
      const errorCount = wrongLetter.length;
      if (index < errorCount) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }

      if (wrongLetter.length === items.length) {
        popupMessageElement.innerText = "You Lost";
        wrongWordElement.innerText = selectedWord;
        popupElement.classList.add("active");
      }
    });
  }
}

async function getRandomWordInEn() {
  englishWord.forEach((element) => {
    element.style.display = "block";
  });
  turkishWord.forEach((element) => {
    element.style.display = "none";
  });

  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?lang=en"
  );
  const data = await response.json();
  selectedWord = data[0];
  displayWord();
}

async function getRandomWordInTr() {
  turkishWord.forEach((element) => {
    element.style.display = "block";
  });
  englishWord.forEach((element) => {
    element.style.display = "none";
  });

  const response = await fetch("https://api.etimolojiturkce.com/word/random");
  const data = await response.json();
  selectedWord = data[0];
  const wrongFormat = await symbolCheck(selectedWord);
  if (wrongFormat) {
    restartGame();
  }
  displayWord();
}

function symbolCheck(word) {
  let format = false;
  for (let i = 0; i < word.length; i++) {
    const karakterKodu = word.charCodeAt(i);
    if (karakterKodu > 33 && karakterKodu < 64) {
      format = true;
    }
  }
  return format;
}

async function displayWord() {
  wordElement.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) =>
        `<div class="letter">${
          correctLetter.includes(letter) ? letter : ""
        }</div>`
    )
    .join("")}
`;
  const w = wordElement.textContent.trim().replace(/\n/g, "").toLowerCase();
  if (w.toLowerCase() == selectedWord.toLowerCase()) {
    popupMessageElement.innerText = "You Won";
    wrongWordElement.innerText = "";
    popupElement.classList.add("active");
  }
}
