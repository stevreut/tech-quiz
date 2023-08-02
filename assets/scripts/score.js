let h2MsgElem = document.querySelector("#h2message");
let initTxt = document.querySelector("#initials");
let recButton = document.querySelector("#rec-score-button");
let gameScore = parseInt(localStorage.getItem("game-score"));
console.log ('game-score retrieved = ' + gameScore);
let highScores = JSON.parse(localStorage.getItem("high-scores"));
console.log ('high-scores retrieved = ' + highScores);

function renderScoreHistory() {
    if (highScores === null || highScores.length === 0) {
        return;
    }
    let listElem = document.querySelector("#score-list");
    for (let i=0;i<highScores.length;i++) {
        let liElem = document.createElement("li");
        liElem.textContent = highScores[i].inits + " : " + highScores[i].score;
        listElem.appendChild(liElem);
    }
    listElem.style.visibility = 'visible';
}

if (highScores === null) {
    console.log('setting empty highscores array');
    highScores = [];
}
if (gameScore !== null) {
    console.log ('game-scores is not null so ...');
    if (highScores.length === 0 || (highScores.length > 0 && gameScore > highScores[0].score)) {
        console.log ('criteria met ...');
        h2MsgElem.textContent = "You have the highest score of " + gameScore + " points. " +
            "Please enter your initials and press 'Record'.";
        console.log ('h2 content = "' + h2MsgElem.textContent + '"');
        h2MsgElem.style.visibility = 'visible';
        initials.style.visibility = 'visible';
        recButton.style.visibility = 'visible';
        recButton.addEventListener("click", function(event) {
            let inits = initTxt.value;
            inits = inits.trim();
            console.log('initials = "' + inits + '"');
            if (inits.length > 0) {
                recButton.disabled = true;
                highScores.splice(0,0,{inits:inits,score:gameScore});
                localStorage.setItem("high-scores",JSON.stringify(highScores));
                renderScoreHistory();
            }
        })
    } else {
        h2MsgElem.textContent = "Your score was " + gameScore + " points.";
        h2MsgElem.style.visibility = 'visible';
        renderScoreHistory();
    }
}
