let correctAnswers = 0;
let incorrectAnswers = 0;
let currentQuestion = 0;
let resultBox = document.getElementsByClassName("results-box")[0];
let questionArea = document.getElementById('questionArea');

let questions = [
    {
        question: "Who sits opposite Michael Scott's office?",
        answer: "Jim Halpert",
        image: "assets/images/jim.jpg"
    },
    {
        question: "Who does Dwight like at the start of the series?",
        answer: "Katy Moore",
        image: "assets/images/katy.jpg"
    },
    {
        question: "Who does Pam really have feelings for at the start of the series in office?",
        answer: "Jim Halpert",
        image: "assets/images/jim.jpg"
    },
    {
        question: "Who became second acting regional in Dunder Mifflin?",
        answer: "Dwight Schrute",
        image: "assets/images/dwigth.jpg"
    },
    {
        question: "Who does Jim have a good close relationship with throughout the series?",
        answer: "Pam Beesly",
        image: "assets/images/pam.jpg"
    },
    {
        question: "Who becomes the second to last Dunder Mifflin branch manager before the series ends?",
        answer: "Andy Bernard",
        image: "assets/images/andy.jpg"
    },
    {
        question: "Who does Pam end up marrying?",
        answer: "Jim Halpert",
        image: "assets/images/jim.jpg"
    },
    {
        question: "Who accidentally lets off a firearm in the office?",
        answer: "Dwight Schrute",
        image: "assets/images/dwigth.jpg"
    },
    {
        question: "Who becomes minority executive from the training programme that was offered?",
        answer: "Kelly Kapoor",
        image: "assets/images/kelly.jpg"
    },
    {
        question: "Who was the manager of the warehouse?",
        answer: "Darryl Philbin",
        image: "assets/images/dar.jpg"
    },
    {
        question: "Who does Michael Scott dislike the most within the office US first few seasons?",
        answer: "Toby Flenderson",
        image: "assets/images/toby.jpg"
    },
    {
        question: "Who eats the most M&Ms during the office olympics?",
        answer: "Kevin Malone",
        image: "assets/images/kevin.jpg"
    }
];

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
    document.getElementById('answer').innerText = "";
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
    document.location.href="/index.html";
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


