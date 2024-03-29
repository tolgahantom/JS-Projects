var board;
var score = 0;
var columns = 4;
var rows = 4;
var startX;
var startY;
var moved;

window.onload = () => {
  setGame();
};

const handleTouchStart = (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  moved = false;
  e.preventDefault();
};

const handleTouchEnd = (e) => {
  endX = e.changedTouches[0].clientX;
  endY = e.changedTouches[0].clientY;

  if (endX - startX > 0 || endY - startY > 0) {
    if (Math.abs(endY - startY) > Math.abs(endX - startX)) {
      if (endY - startY < 50) {
        slideUp();
      } else if (endY - startY > 50) {
        slideDown();
      }
    } else {
      if (endX - startX < 50) {
        slideLeft();
      } else if (endX - startX > 50) {
        slideRight();
      }
    }
  }

  e.preventDefault();
};

// const handleTouchMove = (e) => {
//   e.preventDefault();

//   if (!startX || !startY || moved) {
//     return;
//   }

//   let currentX = e.touches[0].clientX;
//   let currentY = e.touches[0].clientY;

//   let deltaX = currentX - startX;
//   let deltaY = currentY - startY;

//   if (deltaX < 100) {
//     slideLeft();
//   } else if (deltaX > 100) {
//     slideRight();
//   } else if (deltaY < 100) {
//     slideUp();
//   } else if (deltaY > 100) {
//     slideDown();
//   }

//   moved = true;
// };

document.addEventListener("touchstart", handleTouchStart, { passive: false });
document.addEventListener("touchend", handleTouchEnd, { passive: false });
document.getElementById("restartButton").addEventListener("touchend", () => {
  document.querySelector(".endGameContainer").style.display = "none";
  setGame();
});
document.getElementById("restartButton").addEventListener("click", () => {
  document.querySelector(".endGameContainer").style.display = "none";
  setGame();
});

const setGame = () => {
  score = 0;
  document.getElementById("score").innerText = "0";
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      updateBoard(board);
    }
  }

  makeNewBox();
  makeNewBox();
};

const updateBox = (box, number) => {
  box.innerText = "";
  box.classList = "";
  box.classList.add("box");
  if (number > 0) {
    box.classList.add("x" + number.toString());
    box.innerText = number.toString();
  }
};

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
  } else if (e.code == "ArrowRight") {
    slideRight();
  } else if (e.code == "ArrowUp") {
    slideUp();
  } else if (e.code == "ArrowDown") {
    slideDown();
  }
});

const clearZeros = (row) => {
  return row.filter((i) => i != 0);
};

const slide = (row) => {
  //clear zeros
  row = clearZeros(row);

  // multiply the same number
  for (i = 0; i < row.length; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
      document.getElementById("score").innerText = score;
    }
  }

  row = clearZeros(row);

  //adding zeros
  while (row.length < columns) {
    row.push(0);
  }

  return row;
};

const slideLeft = () => {
  for (let i = 0; i < rows; i++) {
    let row = board[i];
    row = slide(row);
    board[i] = row;
  }
  updateBoard(board);
  makeNewBox();
};

const slideRight = () => {
  for (let i = 0; i < rows; i++) {
    let row = board[i];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[i] = row;
  }
  updateBoard(board);
  makeNewBox();
};

const slideUp = () => {
  for (let i = 0; i < columns; i++) {
    row = [board[0][i], board[1][i], board[2][i], board[3][i]];
    row = slide(row);
    board[0][i] = row[0];
    board[1][i] = row[1];
    board[2][i] = row[2];
    board[3][i] = row[3];
  }

  updateBoard(board);
  makeNewBox();
};

const slideDown = () => {
  for (let i = 0; i < columns; i++) {
    row = [board[0][i], board[1][i], board[2][i], board[3][i]];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[0][i] = row[0];
    board[1][i] = row[1];
    board[2][i] = row[2];
    board[3][i] = row[3];
  }

  updateBoard(board);
  makeNewBox();
};

const updateBoard = (board) => {
  document.querySelector(".game-container").innerHTML = "";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let box = document.createElement("div");
      box.id = i.toString() + "-" + j.toString();
      let number = board[i][j];
      updateBox(box, number);
      document.querySelector(".game-container").append(box);
    }
  }

  if (youWon(board)) {
    document.querySelector(".endGameContainer").style.display = "flex";
    document.getElementById("endGameScore").innerText = score;
    document.querySelector(".lost-container-message").innerText = "You Won";
    document.querySelector(".lost-container-message").style.color = "green";
    return;
  }

  if (isGameOver(board)) {
    document.querySelector(".endGameContainer").style.display = "flex";
    document.getElementById("endGameScore").innerText = score;
    document.querySelector(".lost-container-message").innerText = "You Lost";
    document.querySelector(".lost-container-message").style.color = "red";
    return;
  }
};

const isGameOver = (board) => {
  function canMerge() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (j + 1 < 4 && board[i][j] === board[i][j + 1]) {
          return true; // You can merge at row
        }
        if (i + 1 < 4 && board[i][j] === board[i + 1][j]) {
          return true; // You can merge at column
        }
      }
    }

    return false;
  }

  return !canMerge() && !hasEmptyBox();
};

const youWon = (board) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board[i][j] == 2048) {
        return true;
      }
    }
  }
  return false;
};

const makeNewBox = () => {
  if (!hasEmptyBox()) {
    return;
  }
  let found = false;
  while (!found) {
    let i = Math.floor(Math.random() * rows);
    let j = Math.floor(Math.random() * columns);

    if (board[i][j] == 0) {
      board[i][j] = 2;
      let box = document.getElementById(i.toString() + "-" + j.toString());
      box.innerText = "2";
      box.classList.add("box");
      box.classList.add("x2");
      found = true;
    }
  }
};

const hasEmptyBox = () => {
  let count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board[i][j] == 0) {
        return true;
      }
    }
  }
  return false;
};
