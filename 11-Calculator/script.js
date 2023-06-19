const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
  display.value = displayValue;
}

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
  showFirstValueAndOperator(firstValue, operator);
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
};

const handleOperator = (selectedOperator) => {
  if (operator && waitingForSecondValue) {
    operator = selectedOperator;
    return;
  }

  const value = parseFloat(displayValue);
  if (firstValue == null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;

    console.log(firstValue);
  }

  waitingForSecondValue = true;
  operator = selectedOperator;
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
