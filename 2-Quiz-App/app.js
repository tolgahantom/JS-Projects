let answersEl = document.querySelectorAll(".answer");
let checkBtn = document.getElementById("check-btn");
let categoryEl = document.querySelector(".question-category");
let questionEl = document.querySelector(".question");
let tryBtn = document.getElementById("try-again");
let correctCounterEl = document.getElementById("correct-counter");
let wrongCounterEl = document.getElementById("wrong-counter");
let resultPage = document.querySelector(".result-page");
let resultCorrect = document.querySelector(".correct-result");
let resultWrong = document.querySelector(".wrong-result");

let allQuestions = [];
let mainCorrectAnswer = "";

let questionCounter = 0;
let correctCounter = 0;
let wrongCounter = 0;

document.addEventListener("DOMContentLoaded", () => {
  getQuestionFromAPI();
  eventListeners();
  setStartDisplay();
});

//ADDING ACTIVE CLASS
answersEl.forEach((answer) => {
  answer.addEventListener("click", (e) => {
    resetClasses();
    answer.classList.add("active");
    checkBtn.disabled = false;
  });
});

//RESET ACTIVE CLASSES
resetClasses = () => {
  answersEl.forEach((answer) => {
    answer.classList.remove("active");
  });
};

//EVENT LISTENERS
function eventListeners() {
  checkBtn.addEventListener("click", checkAnswer);
  tryBtn.addEventListener("click", restartQuiz);
}

//GET QUESTIONS FROM API
getQuestionFromAPI = (callback) => {
  fetch("https://the-trivia-api.com/api/questions")
    .then((resolve) => resolve.json())
    .then((data) => {
      allQuestions = data;
      showQuestion();
    });
};

//SHOW QUESTION IN UI
showQuestion = () => {
  let questions = allQuestions;
  let category, currentQuestion, correctAnswer;
  let allOptions = [];
  if (questionCounter == questions.length) {
    showResults();
  }
  currentQuestion = questions[questionCounter];
  category = currentQuestion.category;
  mainCorrectAnswer = currentQuestion.correctAnswer;
  correctAnswer = currentQuestion.correctAnswer;
  allOptions = currentQuestion.incorrectAnswers;
  allOptions.splice(
    Math.floor(Math.random() * (currentQuestion.incorrectAnswers.length + 1)),
    0,
    correctAnswer
  );

  categoryEl.innerHTML = category;
  questionEl.innerHTML = currentQuestion.question;
  answersEl.forEach((answer, index) => {
    answer.innerHTML = allOptions[index];
  });
};

//FINISH QUIZ
showResults = () => {
  setFinishDisplay();
  resultWrong.textContent = wrongCounter;
  resultCorrect.textContent = correctCounter;
};

//RESTART QUIZ
restartQuiz = () => {
  location.reload();
};

//CHECK ANSWER
checkAnswer = () => {
  let selectedAnswer;
  answersEl.forEach((answer) => {
    if (answer.classList.contains("active")) {
      selectedAnswer = answer.textContent;
    }
  });
  if (selectedAnswer == mainCorrectAnswer) {
    correctCounter++;
    questionCounter++;
    fixResults();
  } else {
    wrongCounter++;
    questionCounter++;
    fixResults();
  }
  resetClasses();
  showQuestion();
};

//FIXING RESULTS IN UI
fixResults = () => {
  correctCounterEl.textContent = correctCounter;
  wrongCounterEl.textContent = wrongCounter;
};

// DISPLAY SETTINGS
setStartDisplay = () => {
  tryBtn.style.display = "none";
  resultPage.style.display = "none";
  checkBtn.style.display = "block";
};

setFinishDisplay = () => {
  tryBtn.style.display = "block";
  resultPage.style.display = "block";
  checkBtn.style.display = "none";
};
