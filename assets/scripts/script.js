let startButton = document.querySelector("#start-btn");
let clockPara = document.querySelector("#clock");
let optionList = document.querySelector("#options");
let secondsRemaining = -1;  // initial place-holder value
let timerID = -1;
let questionPauseID = -1;
let currentQuestionNum = 0;
let buttonListener;  // TODO
let questionPara = document.querySelector("#question");
let questionHasBeenAnswered = false;
let resultPara = document.querySelector("#result");

function disableStartButton() {
    startButton.setAttribute("style","visibility:hidden;");  // TODO - is this best?  Should we disable instead?
}

function showTime() {
    clockPara.textContent = (secondsRemaining + " seconds left");
    if (secondsRemaining <= 20) {
        clockPara.style.color = '#ff0000';
    } else {
        clockPara.style.color = '#0040ff';
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

function handleOptionButton(event) {
    clearInterval(questionPauseID);
    if (currentQuestionNum < 0 || currentQuestionNum >= questions.length || 
        secondsRemaining <= 0 || questionHasBeenAnswered) {
        return;
    }
    console.log('event trapped: ' + event);
    let elem = event.target;
    console.log('targe trapped: ' + elem);
    if (elem.matches("button")) {
        console.log('trapped IS button:');
        let dtn = elem.getAttribute("data-index");
        console.log("dtn = " + dtn);
        if (dtn == 1) {  // TODO - subject to revision once options are randomized
            resultPara.textContent = "Correct!";
        } else {
            resultPara.textContent = "Wrong!";
            secondsRemaining -= 5;
            showTime();
        }
        questionHasBeenAnswered = true;
        let buttonArray = document.querySelectorAll("ul>li>button");
        for (let i=0;i<buttonArray.length;i++) {
            buttonArray[i].disabled = true;
            // TODO - will have to reenable when drawn again, does that happen automatically?
        }
        currentQuestionNum++;
        questionPauseID = setInterval(renderQandA, 1250);  // TODO - adjust timing
    } else {
        console.log('trapped was not button!');
    }
}

function renderQandA() {
    questionHasBeenAnswered = false;
    resultPara.textContent = "";
    if (currentQuestionNum < 0 || currentQuestionNum >= questions.length || secondsRemaining <= 0) {
        return;
    }
    questionPara.textContent = questions[currentQuestionNum].question;
    optionList.innerHTML = '';
    console.log("render pre loop : " + currentQuestionNum);
    for (let i=0;i<questions[currentQuestionNum].answers.length;i++) {
        console.log("q " + currentQuestionNum + " : i " + i + " " + questions[currentQuestionNum].answers[i]);
        let liElem = document.createElement("li");
        let btn = document.createElement("button");
        btn.textContent = questions[currentQuestionNum].answers[i];
        btn.setAttribute("data-index",(i+1));
        liElem.appendChild(btn);
        optionList.appendChild(liElem);
    }
    let optdiv = document.getElementById("optdiv");
    if (optdiv === null) {
        console.log ('no optiv id found')
    } else {
        console.log('optdiv found');
        optdiv.addEventListener("click",handleOptionButton);  // TODO - Do this every time or just at beginning of loop?
    }
}

function loopThruQuestions() {
    // TODO
    if (secondsRemaining <= 0) {
        return;
    }
    document.querySelector("main").style.visibility = 'visible';
    currentQuestionNum = 0;
    renderQandA();
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

init();