let startButton = document.querySelector("#start-btn");
let clockPara = document.querySelector("#clock");
let optionList = document.querySelector("#options");
let secondsRemaining = -1;  // initial place-holder value
let timerID = -1;
let questionPauseID = -1;
let resultsID = -1;
let currentQuestionNum = 0;
let questionPara = document.querySelector("#question");
let questionHasBeenAnswered = false;
let resultPara = document.querySelector("#result");
let correctCount = 0;
let wrongCount = 0;
let gameOver = false;

function disableStartButton() {
    startButton.setAttribute("style","visibility:hidden;");
}

function showTime() {
    if (secondsRemaining < 0) {
        secondsRemaining = 0;
    }
    clockPara.textContent = (secondsRemaining + " seconds left");
    if (secondsRemaining <= 20) {
        clockPara.style.color = '#ff0000';
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
            gameOver = true;
            resultsID = setInterval(showResults(),3000);
        } else {
            showTime();
        }
    }, 1000);
}

function handleOptionButton(event) {
    clearInterval(questionPauseID);
    if (currentQuestionNum < 0 || currentQuestionNum >= questions.length || 
        secondsRemaining <= 0 || questionHasBeenAnswered) {
            clearInterval(questionPauseID);
            gameOver = true;
            return;
    }
    console.log('event trapped: ' + event);
    let elem = event.target;
    console.log('targe trapped: ' + elem);
    if (elem.matches("button")) {
        console.log('trapped IS button:');
        let dtn = elem.getAttribute("data-index");
        console.log("dtn = " + dtn);
        if (dtn == 0) {
            resultPara.textContent = "Correct!";
            correctCount++;
        } else {
            resultPara.textContent = "Wrong!";
            secondsRemaining -= 5;
            if (secondsRemaining < 0) {
                secondsRemaining = 0;
            }
            wrongCount++;
            showTime();
        }
        questionHasBeenAnswered = true;
        let buttonArray = document.querySelectorAll("ul>li>button");
        for (let i=0;i<buttonArray.length;i++) {
            buttonArray[i].disabled = true;
        }
        currentQuestionNum++;
        if (currentQuestionNum >= questions.length) {
            secondsRemaining = 0;
        }
        questionPauseID = setInterval(renderQandA, 800);
    } else {
        console.log('trapped was not button!');
    }
}

function getPermutations(n) {
    console.log('getperm called with  ' + n);
    if (n < 1) {
        return [];
    } else if (n === 1) {
        return [0];
    } else {
        let arr = [];
        // build array [0, 1, 2, ...(n-1)]
        for (let i=0;i<n;i++) {
            arr[i] = i;
        }
        console.log('gp initial = ' + arr);
        let outArr = [];
        while (arr.length > 0) {
            let r = Math.floor(Math.random()*arr.length);
            console.log('gp randeom idx = ' + r);
            outArr.push(arr[r]);
            console.log('gp output inter = ' + outArr);
            arr.splice(r, 1);
            console.log('gp revised in arr = ' + arr);
        }
        return outArr;
    }
}

function renderQandA() {
    clearInterval(questionPauseID);
    questionHasBeenAnswered = false;
    resultPara.textContent = "";
    if (currentQuestionNum < 0 || currentQuestionNum >= questions.length || secondsRemaining <= 0) {
        return;
    }
    questionPara.textContent = questions[currentQuestionNum].question;
    optionList.innerHTML = '';
    console.log("render pre loop : " + currentQuestionNum);
    let perm = getPermutations(questions[currentQuestionNum].answers.length);
    for (let i=0;i<questions[currentQuestionNum].answers.length;i++) {
        console.log("q " + currentQuestionNum + " : i " + i + " " + questions[currentQuestionNum].answers[i]);
        let liElem = document.createElement("li");
        let btn = document.createElement("button");
        let origIdx = perm[i];
        btn.textContent = (i+1) + ". " + questions[currentQuestionNum].answers[origIdx];
        btn.setAttribute("data-index",origIdx);
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

function startQuiz() {
    disableStartButton();
    startTimer();
    localStorage.removeItem("game-score");
    document.querySelector("main").style.visibility = 'visible';
    currentQuestionNum = 0;
    renderQandA();
    console.log('do we ever get here?');
}

function spawnResultsPage() {
    // TODO
    console.log('jumped to score.html');
    window.location.assign("./score.html");
    console.log('does this still execute? can I still affect content in score.html?');
    console.log('Is score.html my new document at this point?');
    localStorage.setItem("game-score", correctCount);
}

function showResults() {
    clearInterval(resultsID);
    spawnResultsPage();
}

function init() {
    startButton.addEventListener("click",startQuiz);    
}

init();