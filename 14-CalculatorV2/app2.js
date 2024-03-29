const keys = document.querySelector(".keyboard-keys");
const firstInput = document.querySelector(".first-value");
const answerElement = document.querySelector(".answer-value-text");
const colorModes = document.querySelector(".icons");
const historyIcon = document.querySelector(".history i");
const historyContainer = document.querySelector(".history-container");
const operators = ["+", "-", "*", "/", "%"];

let lastIsOperator = false;
let history = [];
answerElement.innerHTML = "0";

function checkInput(string) {
  let needCheckArray = [];
  for (let i = string.length - 1; i >= 0; i--) {
    needCheckArray.push(string[i]);
    if (operators.includes(string[i])) {
      return needCheckArray.includes(".") ? true : false;
    }
  }
}

function showHistory() {
  historyContainer.querySelector(".history-list").innerHTML = "";
  history.forEach((historyItem) => {
    const item = `
      <li class="history-list-item">
      <span class="">${historyItem.question}</span>
      <span class="">=</span>
      <span class="">${historyItem.result}</span>
     </li>
    `;
    historyContainer.querySelector(".history-list").innerHTML += item;
  });
}

function handleOperator(element) {
  if (element == ".") {
    if (
      !firstInput.innerHTML.includes("+") &&
      firstInput.innerHTML.includes(".")
    ) {
      return;
    }
    let isOkey = checkInput(firstInput.innerHTML);
    if (!isOkey) {
      firstInput.innerHTML += element;
      return;
    } else {
      return;
    }
  }
  if (element == "backspace") {
    if (firstInput.innerHTML != "") {
      firstInput.innerHTML = firstInput.innerHTML.slice(0, -1);
      return;
    } else {
      return;
    }
  }
  if (element == "clear") {
    firstInput.innerHTML = "";
    answerElement.innerHTML = "0";
    return;
  }
  if (element == "=") {
    if (
      firstInput.innerHTML.slice(-1) == "*" ||
      firstInput.innerHTML.slice(-1) == "-" ||
      firstInput.innerHTML.slice(-1) == "/" ||
      firstInput.innerHTML.slice(-1) == "+" ||
      firstInput.innerHTML.slice(-1) == "%"
    ) {
      firstInput.innerHTML = firstInput.innerHTML.slice(0, -1);
    }
    const result = eval(firstInput.innerHTML);
    answerElement.innerHTML = result;
    if (history.length == 3) {
      history.shift();
    }
    history.push({
      question: firstInput.innerHTML,
      result: result,
    });
    firstInput.innerHTML = "";
    showHistory();
    return;
  }
  if (
    firstInput.innerHTML.slice(-1) != "*" &&
    firstInput.innerHTML.slice(-1) != "-" &&
    firstInput.innerHTML.slice(-1) != "/" &&
    firstInput.innerHTML.slice(-1) != "+" &&
    firstInput.innerHTML.slice(-1) != "%"
  ) {
    firstInput.innerHTML += element;
    return;
  }

  if (
    firstInput.innerHTML.slice(-1) == "*" ||
    firstInput.innerHTML.slice(-1) == "-" ||
    firstInput.innerHTML.slice(-1) == "/" ||
    firstInput.innerHTML.slice(-1) == "+" ||
    firstInput.innerHTML.slice(-1) == "%"
  ) {
    firstInput.innerHTML = firstInput.innerHTML.slice(0, -1) + element;
    return;
  }
}

keys.addEventListener("click", (e) => {
  const element = e.target;
  lastIsOperator = false;
  if (!element.matches("button")) return;
  if (
    answerElement.innerHTML != "0" &&
    element.classList.contains("operator")
  ) {
    firstInput.innerHTML = answerElement.innerHTML;
    answerElement.innerHTML = "0";
  }

  if (
    answerElement.innerHTML != "0" &&
    !element.classList.contains("operator")
  ) {
    answerElement.innerHTML = "0";
  }

  if (firstInput.innerHTML == "" && element.value == 0) {
    return;
  }

  if (element.classList.contains("operator")) {
    handleOperator(element.value);
    return;
  }

  firstInput.innerHTML += element.value;
});

colorModes.addEventListener("click", (e) => {
  if (!e.target.classList.contains("fa-regular")) {
    return;
  }
  document.querySelectorAll(".icons i").forEach((icon) => {
    icon.classList.remove("active");
  });
  e.target.classList.add("active");
  document.querySelector("body").classList.toggle("dark-mode");
});

historyIcon.addEventListener("click", () => {
  historyContainer.classList.toggle("active");
});
