const cellElements = document.querySelectorAll(".cell");
const whoTurnsElement = document.querySelector(".whoTurns");
const boardElement = document.querySelector("#board");
const winningMessageElement = document.querySelector(".winning-message");
const restartButton = document.querySelector("#restartButton");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const classes = ["x", "circle"];
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let firstTurn, circleTurn, otherTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  let random = Math.floor(Math.random() * classes.length);
  firstTurn = classes[1 - random];
  otherTurn = classes[random];
  circleTurn = firstTurn;
  whoTurnsElement.innerHTML = circleTurn;
  cellElements.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.addEventListener("click", handleClick, { once: true }); // once true means every element can be clicked once
  });
  setBoardHoverEffect();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? firstTurn : otherTurn;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverEffect();
  }
}

function endGame(draw, winnerClass) {
  if (draw) {
    winningMessageText.innerText = "Draw";
  } else {
    winningMessageText.innerText = `${winnerClass}  Wins`;
  }
  winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
  if (whoTurnsElement.innerHTML == "x") {
    whoTurnsElement.innerHTML = "circle";
  } else {
    whoTurnsElement.innerHTML = "x";
  }
}

function setBoardHoverEffect() {
  boardElement.classList.remove("x");
  boardElement.classList.remove("circle");
  if (whoTurnsElement.innerHTML == "x") {
    boardElement.classList.add("x");
  } else {
    boardElement.classList.add("circle");
  }
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
}

function checkWin(currentClass) {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
