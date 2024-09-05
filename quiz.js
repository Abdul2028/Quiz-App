const questions = [
    {
        question: "Which of the following methods is used to convert a string to a number in JavaScript?",
        answer: [
            { Text: "parseInt()", correct: true },
            { Text: "toNumber()", correct: false },
            { Text: "convertToNumber()", correct: false },
            { Text: "Number.parse()", correct: false },
        ]
    },

    {
        question: "What is the result of `typeof 'Hello'` in JavaScript?",
        answer: [
            { Text: "string", correct: true },
            { Text: "number", correct: false },
            { Text: "object", correct: false },
            { Text: "undefined", correct: false },
        ]
    },

    {
        question: "Which of the following is a valid way to define a function in JavaScript?",
        answer: [
            { Text: "function myFunction() {}", correct: true },
            { Text: "def myFunction() {}", correct: false },
            { Text: "func myFunction() {}", correct: false },
            { Text: "function:myFunction() {}", correct: false },
        ]
    },

    {
        question: "What will be the output of `console.log(2 + 2)` in JavaScript?",
        answer: [
            { Text: "4", correct: true },
            { Text: "22", correct: false },
            { Text: "undefined", correct: false },
            { Text: "error", correct: false },
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("button");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
