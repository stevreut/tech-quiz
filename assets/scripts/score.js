let bd = document.querySelector("body");
let h2 = document.createElement("h2");
h2.textContent = "Test Score Subtitle";
h2.style.backgroundColor = '#ff0080';
bd.append(h2);
let h3 = document.createElement("h3");
let gameScore = localStorage.getItem("game-score");
if (gameScore === null) {
    gameScore = 'No Score!'
    h3.style.backgroundColor = '#ff0000';
    h3.style.fontWeight = 'bold'
} else {
    h3.style.backgroundColor = '#fff';
}
h3.textContent = gameScore;
bd.append(h3);