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

function handleAnswer(isCorrect) {
    let q = questions[currentQuestion];

    if (isCorrect)
        correctAnswers++;
    else
    {
        incorrectAnswers++;
        displayAnswer(q.answer);
    }

    updateScoreText();

    // stop timer
    if (timers !== null) {
        clearInterval(timers);
        timers = null;
    }

    if (currentQuestion + 1 >= questions.length)
    {
        updateLeftQuestionsBar(currentQuestion + 1);
        currentQuestion++;

        // do something after quiz

        return;
    }

    // reset timer
    startTimer(3);
    
    // 
    displayQuestion(questions[++currentQuestion]);
    updateLeftQuestionsBar(currentQuestion);
}

function startTimer(seconds) {
    document.getElementById("timer").innerHTML = seconds;
    counter = seconds;
    timers = setInterval(timerFunction, 1000);
}

function timerFunction() {
    counter = counter - 1;
    if (counter < 0) { 
        document.getElementById("timer").innerHTML = "TIMES UP!!!";
        clearInterval(timers);
        timers = null;
        handleAnswer(false);
    } else { 
        document.getElementById("timer").innerHTML = counter;
    } 
}

startTimer(3);
displayQuestion(questions[currentQuestion]);