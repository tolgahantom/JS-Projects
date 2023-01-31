// const answersInput = document.querySelectorAll(".form-check-input");
// const answersLabel = document.querySelectorAll(".answer-label");
// const questionEL = document.getElementById("question-p");
// const submitButton = document.getElementById("submitBtn");
// let correctCounter = 0;
// let discorrectCounter = 0;

// getQuestionsFromApi = (callback) => {
//   fetch("https://the-trivia-api.com/api/questions")
//     .then((resolve) => resolve.json())
//     .then((data) => loadQuiz(data));
// };

// let currentQuestion = 0;

// loadQuiz = (questions, callback) => {
//   let i;
//   questionEL.innerText = questions[currentQuestion].question;
//   let nums = randomNumGenerator();
//   for (i = 0; i < 3; i++) {
//     answersLabel[nums[i]].innerText =
//       questions[currentQuestion].incorrectAnswers[i];
//   }
//   answersLabel[nums[i]].innerText = questions[currentQuestion].correctAnswer;
//   controlAnswer(questions[currentQuestion].correctAnswer);
// };

// randomNumGenerator = () => {
//   let nums = [];
//   for (let index = 0; nums.length < 4; index++) {
//     let num = Math.floor(Math.random() * 4);
//     if (nums.indexOf(num) == -1) {
//       nums.push(num);
//     } else {
//       continue;
//     }
//   }
//   return nums;
// };

// controlAnswer = (correct) => {
//   let yourAnswer = getSelected();
//   if (correct == yourAnswer) {
//     correctCounter++;
//     document.getElementById("num-of-correct").innerHTML = correctCounter;

//     console.log("correct");
//   } else {
//     document.getElementById("num-of-wrong").innerHTML = discorrectCounter;
//     discorrectCounter++;
//   }
// };

// getSelected = () => {
//   let yourAnswer;
//   answersInput.forEach((answer) => {
//     if (answer.checked) {
//       answersLabel.forEach((label) => {
//         if (label.getAttribute("for") == answer.id) {
//           yourAnswer = label.innerHTML;
//         }
//       });
//     }
//   });

//   return yourAnswer;
// };

// document.onload = getQuestionsFromApi(loadQuiz);

// submitButton.addEventListener("click", () => {
//   currentQuestion++;
//   if (currentQuestion < 10) {
//     getQuestionsFromApi(loadQuiz);
//   } else alert("You have finished the test");
// });
