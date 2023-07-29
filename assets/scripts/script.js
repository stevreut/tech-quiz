function consoleLogQandA () {
    let len = questions.length;
    if (len === null) {
        console.log('There were no questions');
    } else {
        for (let i=0;i<len;i++) {
            console.log('\n\nitem ' + i + ':');
            console.log('question = "' + questions[i].question + '"');
            console.log('correct answer = "' + questions[i].answers[0] + '"');
            for (let j=1;j<questions[i].answers.length;j++) {
                console.log('wrong answer = "' + questions[i].answers[j] + '"');
            }
        }
    }
}

let startButton = document.querySelector("#start-btn");
let clockPara = document.querySelector("#clock");
let secondsRemaining = -1;  // initial place-holder value
let timerID = -1;

function disableStartButton() {
    startButton.setAttribute("style","visibility:hidden;");  // TODO - is this best?  Should we disable instead?
}

function showTime() {
    clockPara.textContent = (secondsRemaining + " seconds left");
    if (secondsRemaining <= 20) {
        clockPara.style.color = '#ff0000';
    } else {
        clockPara.style.color = '#0080ff';
    }
}

function startTimer() {
    clockPara.setAttribute("style","visibility:visible;");
    secondsRemaining = 30;  // TODO
    showTime();
    timerID = setInterval(function() {
        secondsRemaining--;
        if (secondsRemaining <= 0) {
            clearInterval(timerID);
            clockPara.textContent = "TIME IS UP!";
            clockPara.style.color = '#ff0000';
            clockPara.style.fontWeight = 'bold';
            // TODO - other?
        } else {
            showTime();
        }
    }, 1000);
}

function loopThruQuestions() {
    // TODO
}

function showResult() {
    // TODO
}

function startQuiz() {
    disableStartButton();
    startTimer();
    loopThruQuestions();
    showResult();
}

function init() {
    startButton.addEventListener("click",startQuiz);    
}

consoleLogQandA();  // TODO - comment out eventually

init();