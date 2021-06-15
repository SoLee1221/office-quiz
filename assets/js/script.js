let correctAnswers = 0;
let incorrectAnswers = 0;
let currentQuestion = 0;

let questions = [
    {
        question: "Who sits opposite Michael Scott's office?",
        answer: "jim halpert"
    },
    {
        question: "Who does Dwight like at the start of the series?",
        answer: "katy moore"
    },
    {
        question: "Who does Pam really have feelings for at the start of the series in office",
        answer: "jim halpert"
    }
];

function displayQuestion(question){
    document.getElementById('question').innerText = question.question;
}

function updateScoreText() {
    document.getElementById('score').innerText = correctAnswers.toString();
    document.getElementById('incorrect').innerText = incorrectAnswers.toString();
}

function submitAnswer() {
    if (currentQuestion == question)
    return;

    let userAnswer = document.getElementById('answer-box').value.toLowerCase();

    handleAnswer(userAnswer == questions[currentQuestion].answer || true);
}

