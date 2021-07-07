let correctAnswers = 0;
let incorrectAnswers = 0;
let currentQuestion = 0;
let resultBox = document.getElementsByClassName("results-box")[0];
let questionArea = document.getElementById('questionArea');

function displayQuestion(question){
    document.getElementById("question").innerText = question.question;
}

function updateScoreText() {
    document.getElementById('score').innerText = correctAnswers.toString();
    document.getElementById('incorrect').innerText = incorrectAnswers.toString();
}

function submitAnswer() {
    if (currentQuestion == question)
    return;

    let userAnswer = document.getElementById('answer-box').value.toLowerCase();

    handleAnswer(userAnswer == questions[currentQuestion].answer.toLowerCase());

    document.getElementById('answer-box').value = "";
}

function answerCorrect() {

}

function handleAnswer(isCorrect) {
    let q = questions[currentQuestion];

    if (isCorrect) {
        correctAnswers++;
        hideAnswer();
    } else
    {
        incorrectAnswers++;
        displayAnswer(q.answer);
    }
    if (q.image)
    document.getElementById('a-image').innerHTML = "<img src=\"" + q.image + "\"/>";
      else
    document.getElementById('a-image').innerHTML = "";
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
        quizOver();
        return;
    }

    // reset timer
    startTimer(15);
    
    // 
    displayQuestion(questions[++currentQuestion]);
    updateLeftQuestionsBar(currentQuestion);
}

function startTimer(seconds) {
    document.getElementById('timer').innerHTML = seconds;
    counter = seconds;
    timers = setInterval(timerFunction, 1000);
}

function updateLeftQuestionsBar(answerQuestionCount) {
    let width = (answerQuestionCount / questions.length) * 100;
    document.getElementById("bar").style.width = width + "%";
}

function randomQuestions(){
    for (var i = questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
}

function displayAnswer(answer){
    document.getElementById('answer').innerText = answer;
}

function hideAnswer(){
    document.getElementById('answer').innerText = "Correct!";
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

function quizOver(){
    questionArea.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    document.getElementsByClassName("total-question")[0].innerHTML = questions.length;
    document.getElementsByClassName("right")[0].innerHTML = correctAnswers;
    document.getElementsByClassName("wrong")[0].innerHTML = incorrectAnswers;
    let percentage = (correctAnswers/questions.length)*100;
    document.getElementsByClassName("percentage")[0].innerHTML = percentage.toFixed(0) + "%";
}

function resetQuiz(){
    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    updateLeftQuestionsBar(0);
    updateScoreText(0);
    startTimer(15);
    hideAnswer();
    randomQuestions();
    displayQuestion(questions[currentQuestion]);
    document.getElementById('a-image').innerHTML = "";
}

function tryAgainQuiz(){
    resultBox.classList.add("hide");
    questionArea.classList.remove("hide");
    resetQuiz();
}

function goToHome(){
    document.location.href="index.html";
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('btn').addEventListener("click", submitAnswer);
    document.getElementById('answer-box').addEventListener("keydown", function(event){
        if(event.key === "Enter")
        submitAnswer();
    })
});

startTimer(15);
randomQuestions();
displayQuestion(questions[currentQuestion]);


