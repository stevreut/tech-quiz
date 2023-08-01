let bd = document.querySelector("body");
let h2 = document.createElement("h2");
h2.textContent = "Test Score Subtitle";
h2.style.backgroundColor = '#ff0080';
bd.append(h2);
let h3 = document.createElement("h3");
let gameScore = localStorage.getItem("game-score");
console.log("retrieved game score = " + gameScore);
if (gameScore === null) {
    h3.style.backgroundColor = '#ff0000';
    h3.style.fontWeight = 'bold'
} else {
    gameScore = parseInt(gameScore);
    h3.style.backgroundColor = '#fff';
}
h3.textContent = gameScore;
bd.append(h3);
let prevHighScore = localStorage.getItem("high-score");
console.log("retrieved high score = " + prevHighScore);
if (prevHighScore !== null) {
    prevHighScore = parseInt(prevHighScore);
}
if (gameScore !== null && (prevHighScore === null || gameScore > prevHighScore)) {
    let h2B = document.createElement("h2");
    h2.textContent = 'new high score = ' + gameScore + '!!';
    bd.append(h2B);
    localStorage.setItem("high-score", gameScore);
    console.log("set hs as " + gameScore);
}
