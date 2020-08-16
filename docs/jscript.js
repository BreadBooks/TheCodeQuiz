var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [{
        question: "What are bugs? ",
        choiceA: "Problems In Code",
        choiceB: "A Pokemon type!",
        choiceC: "Gross Crawly Things",
        choiceD: "A bee!",
        correct: "A"
    }, {
        question: "What's a comment?",
        choiceA: "How you get karma",
        choiceB: "Stuff devs write to meme",
        choiceC: "Stuff devs write to explain code to other devs",
        choiceD: "Both B & C",
        correct: "C"
    }, {
        question: "What's PsuedoCode?",
        choiceA: "FAKE CODE",
        choiceB: "a digital container",
        choiceC: "Virtual Reality",
        choiceD: "Descriptive and detailed steps written for a computer program that uses natural language",
        correct: "D"
    }, {
        question: "What are variables?",
        choiceA: "x & y",
        choiceB: "Placeholders for pieces of information that can change",
        choiceC: "pizza toppings",
        choiceD: "master branch",
        correct: "B"
    },
    {
        question: "What are loops?",
        choiceA: "lines of code that repeat the same action over & over",
        choiceB: "fruity cereal",
        choiceC: "Transistors",
        choiceD: "beepity beeps?",
        correct: "A"
    }
];

// more variables

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 25; // 25s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}


function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// Our timer bar
function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// Check Answer/Result Display

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to pink
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
    document.getElementById(checkAnswer).style.alignContent = "center"
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "pink";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

// render score
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the score percent
    const scorePerCent = Math.round(100 * score / questions.length);

    // different gifs for different score percents
    let img = (scorePerCent >= 80) ? "img/5.gif" :
        (scorePerCent >= 60) ? "img/4.gif" :
        (scorePerCent >= 40) ? "img/3.gif" :
        (scorePerCent >= 20) ? "img/2.gif" :
        "img/1.gif";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}