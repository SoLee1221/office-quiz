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