const input = document.querySelector(".generated-password");
const generateButton = document.querySelector(".generate-button");
const uppperEL = document.querySelector("#upper");
const lowerEL = document.querySelector("#lower");
const numberEL = document.querySelector("#number");
const symbolEL = document.querySelector("#symbol");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

getLowercase = () => {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
};

getUppercase = () => {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
};

getNumber = () => {
  return numbers[Math.floor(Math.random() * numbers.length)];
};

getSymbol = () => {
  return symbols[Math.floor(Math.random() * symbols.length)];
};

findRandomFunctionLength = () => {
  let cnt = 0;
  const checkedEl = document.querySelectorAll("input[type='checkbox']");
  checkedEl.forEach((element) => {
    if (element.checked) cnt++;
  });

  return cnt;
};

fillRandomFunctionArray = () => {
  randomFunction = {};

  if (uppperEL.checked) {
    Object.assign(randomFunction, { getUppercase });
  }
  if (lowerEL.checked) {
    Object.assign(randomFunction, { getLowercase });
  }
  if (numberEL.checked) {
    Object.assign(randomFunction, { getNumber });
  }
  if (symbolEL.checked) {
    Object.assign(randomFunction, { getSymbol });
  }
  return randomFunction;
};

generatePassword = async () => {
  let generatedPassword = "";
  const length = document.querySelector("#length").value;
  if (length < 6 || length > 30) {
    alert("Number is not the desired range");
    return;
  }

  randomFunction = await fillRandomFunctionArray();

  for (let i = 0; i < length; i++) {
    generatedPassword +=
      Object.values(randomFunction)[
        Math.floor(Math.random() * findRandomFunctionLength())
      ]();
  }

  input.innerHTML = generatedPassword;
};

generateButton.addEventListener("click", generatePassword);
