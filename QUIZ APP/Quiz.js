const quizzes = [
    {
        name: "Math Quiz",
        questions:
            [
                {
                    question: "What is 2 + 2?",
                    options: ["3", "4", "5", "6"],
                    correctAnswer: "4"
                },
                {
                    question: "What is 5 * 3?",
                    options: ["10", "15", "20", "25"],
                    correctAnswer: "15"
                },
                {
                    question: "What is  8 * 5?",
                    options: ["30", "35", "40", "45"],
                    correctAnswer: "40"
                },
                {
                    question: "What is 9 * 3?",
                    options: ["24", "27", "30", "21"],
                    correctAnswer: "27"
                },
            ]
    },
    // Add more quizzes as needed
];

let currentQuizIndex;
let score = 0;
let selectedAnswers = [];

function startNewQuiz() {
    currentQuizIndex = Math.floor(Math.random() * quizzes.length);
    renderQuizScreen();
}

function renderQuizScreen() {
    const homeScreen = document.querySelector('.home-screen');
    const quizScreen = document.querySelector('.quiz-screen');
    homeScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');

    const currentQuiz = quizzes[currentQuizIndex];
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');

    questionContainer.innerHTML = '';
    optionsContainer.innerHTML = '';

    const currentQuestion = currentQuiz.questions[selectedAnswers.length];
    questionContainer.textContent = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option;
        optionElement.classList.add('option');
        optionElement.setAttribute('data-index', index);
        optionElement.addEventListener('click', selectAnswer);
        optionsContainer.appendChild(optionElement);
    });

    document.getElementById('submit-btn').disabled = true;
}

function selectAnswer(event) {
    const selectedOption = event.target;
    const selectedOptionIndex = selectedOption.getAttribute('data-index');
    const currentQuestion = quizzes[currentQuizIndex].questions[selectedAnswers.length];

    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    selectedOption.classList.add('selected');

    selectedAnswers.push(currentQuestion.options[selectedOptionIndex]);

    document.getElementById('submit-btn').disabled = false;
}

function submitAnswer() {
    const currentQuestion = quizzes[currentQuizIndex].questions[selectedAnswers.length - 1];
    const selectedAnswer = selectedAnswers[selectedAnswers.length - 1];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    }

    if (selectedAnswers.length === quizzes[currentQuizIndex].questions.length) {
        showResultScreen();
    } else {
        renderQuizScreen();
    }
}

function showResultScreen() {
    const quizScreen = document.querySelector('.quiz-screen');
    const resultScreen = document.querySelector('.result-screen');
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const totalQuestions = quizzes[currentQuizIndex].questions.length;
    const correctAnswers = selectedAnswers.filter((answer, index) => answer === quizzes[currentQuizIndex].questions[index].correctAnswer).length;
    const incorrectAnswers = totalQuestions - correctAnswers;

    document.getElementById('score').textContent = `Score: ${score}/${totalQuestions}`;
    document.getElementById('correct-answers').textContent = `Correct Answers: ${correctAnswers}`;
    document.getElementById('incorrect-answers').textContent = `Incorrect Answers: ${incorrectAnswers}`;
}

function restartQuiz() {
    score = 0;
    selectedAnswers = [];
    document.querySelector('.result-screen').classList.add('hidden');
    document.querySelector('.home-screen').classList.remove('hidden');
}

window.onload = function () {
    const quizListContainer = document.getElementById('quiz-list');
    quizzes.forEach((quiz, index) => {
        const quizButton = document.createElement('button');
        quizButton.textContent = quiz.name;
        quizButton.addEventListener('click', () => {
            currentQuizIndex = index;
            renderQuizScreen();
        });
        quizListContainer.appendChild(quizButton);
    });
};
