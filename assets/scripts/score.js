// let bd = document.querySelector("body");
// let h2 = document.createElement("h2");
// h2.textContent = "Test Score Subtitle";
// h2.style.backgroundColor = '#ff0080';
// bd.append(h2);
// let h3 = document.createElement("h3");
// let gameScore = localStorage.getItem("game-score");
// console.log("retrieved game score = " + gameScore);
// if (gameScore === null) {
//     h3.style.backgroundColor = '#ff0000';
//     h3.style.fontWeight = 'bold'
// } else {
//     gameScore = parseInt(gameScore);
//     h3.style.backgroundColor = '#fff';
// }
// h3.textContent = gameScore;
// bd.append(h3);
// let prevHighScore = localStorage.getItem("high-score");
// console.log("retrieved high score = " + prevHighScore);
// if (prevHighScore !== null) {
//     prevHighScore = parseInt(prevHighScore);
// }
// if (gameScore !== null && (prevHighScore === null || gameScore > prevHighScore)) {
//     let h2B = document.createElement("h2");
//     h2.textContent = 'new high score = ' + gameScore + '!!';
//     bd.append(h2B);
//     localStorage.setItem("high-score", gameScore);
//     console.log("set hs as " + gameScore);
// }

let h2MsgElem = document.querySelector("#h2message");
let initTxt = document.querySelector("#initials");
let recButton = document.querySelector("#rec-score-button");
let gameScore = parseInt(localStorage.getItem("game-score"));
console.log ('game-score retrieved = ' + gameScore);
let highScores = JSON.parse(localStorage.getItem("high-scores"));
console.log ('high-scores retrieved = ' + highScores);
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
                // TODO - still have to display
            }
        })
    }
}
