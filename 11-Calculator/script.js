const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");
const firstInput = document.querySelector(".first-value");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
  display.value = displayValue;
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
    default:
      return second;
      break;
  }
};

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

  inputNumber(element.value);
  updateDisplay();
});
