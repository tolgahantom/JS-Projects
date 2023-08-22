const display = document.querySelector(".answer-value-text");
const keys = document.querySelector(".keyboard-keys");
const firstInput = document.querySelector(".first-value");
const colorModes = document.querySelector(".icons");
const historyIcon = document.querySelector(".history i");
const historyContainer = document.querySelector(".history-container");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
let history = [];
let multipleOperation;

updateDisplay();
showHistory();

function updateNumber() {
  if (displayValue === "0" || displayValue === 0) {
    return;
  }
  displayValue *= -1;
  firstValue ? (firstValue *= -1) : null;
  updateDisplay();
}

function showHistory() {
  historyContainer.querySelector(".history-list").innerHTML = "";
  history.forEach((historyItem) => {
    const item = `
    <li class="history-list-item">
      <span class="first">${historyItem.firstValue}</span>
      <span class="operator">${historyItem.operator}</span>
      <span class="second">${historyItem.secondValue}</span>
      <span class="">=</span>
      <span class="result">${historyItem.result}</span>
   </li>
  `;
    historyContainer.querySelector(".history-list").innerHTML += item;
  });
}

function updateDisplay() {
  display.innerHTML = displayValue;
}

const showFirstValue = (value, operator) => {
  if (value && operator) {
    switch (operator) {
      case "=":
        firstInput.innerHTML = null;
        break;
      case "*":
        firstInput.innerHTML = value + " x";
        break;
      case "/":
        firstInput.innerHTML = value + ` &divide;`;
        break;
      default:
        firstInput.innerHTML = value + " " + operator;
        break;
    }
  }
};

const inputNumber = (num) => {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    if (displayValue == 0 && !displayValue.includes(".")) {
      displayValue = num;
    } else {
      displayValue += num;
    }
  }
  showFirstValue(firstValue, operator);
};

const inputDecimal = () => {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
};

const clear = () => {
  displayValue = "0";
  waitingForSecondValue = false;
  firstValue = null;
  operator = null;
  firstInput.innerHTML = null;
};

const handleOperator = (selectedOperator) => {
  if (operator && waitingForSecondValue) {
    operator = selectedOperator;
    showFirstValue(firstValue, operator);
    return;
  }
  const value = parseFloat(displayValue);
  if (firstValue == null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    if (history.length == 3) {
      history.shift();
    }
    history.push({
      firstValue: firstValue,
      operator: operator,
      secondValue: value,
      result: result,
    });
    showHistory();
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = selectedOperator;
  showFirstValue(firstValue, operator);
};

const calculate = (first, second, operator) => {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      return first / second;
    case "%":
      return first % second;
    default:
      return second;
  }
};

function changeThema() {
  document.querySelector("body").classList.toggle("dark-mode");
}

keys.addEventListener("click", (e) => {
  const element = e.target;
  if (!element.matches("button")) return;
  if (element.classList.contains("operator")) {
    handleOperator(element.value);
    updateDisplay();
    return;
  }
  if (element.classList.contains("decimal")) {
    inputDecimal();
    updateDisplay();

    return;
  }
  if (element.classList.contains("clear")) {
    clear();
    updateDisplay();
    return;
  }

  if (element.classList.contains("changer")) {
    updateNumber();
    return;
  }

  inputNumber(element.value);
  updateDisplay();
});

colorModes.addEventListener("click", (e) => {
  if (!e.target.classList.contains("fa-regular")) {
    return;
  }
  document.querySelectorAll(".icons i").forEach((icon) => {
    icon.classList.remove("active");
  });
  e.target.classList.add("active");
  changeThema();
});

historyIcon.addEventListener("click", () => {
  historyContainer.classList.toggle("active");
});
