const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Lisbon", correct: false },
    ],
  },
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Mars", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "J.K. Rowling", correct: false },
      { text: "Ernest Hemingway", correct: false },
      { text: "Mark Twain", correct: false },
    ],
  },
  {
    question: "What is the boiling point of water?",
    answers: [
      { text: "90°C", correct: false },
      { text: "100°C", correct: true },
      { text: "110°C", correct: false },
      { text: "120°C", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Claude Monet", correct: false },
    ],
  },
  {
    question: "What is the smallest prime number?",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
    ],
  },
  {
    question: "What is the fastest land animal?",
    answers: [
      { text: "Cheetah", correct: true },
      { text: "Lion", correct: false },
      { text: "Tiger", correct: false },
      { text: "Elephant", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
];
//

const questionElement = document.getElementById("question");
const ansButtonsElement = document.getElementById("ans-btns");
const nextButtonElement = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const questionNumber = document.getElementById("question-number");
const quizOver = document.getElementById("quiz-over");
const timerCount = document.getElementById("timer");

//variable declaration
let currentQuestionIndex = 0;
let score = 0;
let timeleft = 60;
let timer;
function startQuiz() {
  currentQuestionIndex = 0;
  scoreElement.innerHTML = 0;
  nextButtonElement.innerHTML = "Next";
  timerStart();
  loadQuestion();
}
function timerStart() {
  timerCount.innerHTML = timeleft;
  timer = setInterval(() => {
    timeleft--;
    timerCount.innerHTML = timeleft;
    if (timeleft === 0) {
      clearInterval(timer);
      showScoreboard();
    }
  }, 1000);
}
function loadQuestion() {
  // Get the current question from the array
  const currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  // Update the inner HTML of the question element
  questionElement.innerHTML = `${questionNo} :  ${currentQuestion.question}`;
  questionNumber.innerHTML = questionNo;
  // Clear previous answers
  ansButtonsElement.innerHTML = "";
  //  display answers
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    ansButtonsElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", (e) => {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
        score++;
        scoreElement.innerHTML = score;
        selectedBtn.classList.add("correct");
      } else {
        selectedBtn.classList.add("incorrect");
      }
      Array.from(ansButtonsElement.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextButtonElement.style.display = "block";
    });
  });
}
function showScoreboard() {
  clearInterval(timer);
  ansButtonsElement.innerHTML = "";
  questionElement.innerHTML = `Total Score: ${score}/${questions.length}`;
  questionElement.style.display = "flex";
  alert("Quiz Submitted");
  nextButtonElement.innerHTML = "Play Again";
}

nextButtonElement.addEventListener("click", () => {
  if (nextButtonElement.innerHTML == "Play Again") {
    startQuiz();
    return;
  }
  if (currentQuestionIndex < questions.length) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showScoreboard();
  }
});

startQuiz();
