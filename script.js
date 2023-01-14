const parentContainer = document.querySelector("#parent");
const headerBar = document.querySelector("#header");
const homeButton = document.querySelector("#home-button");
const gameBoard = document.querySelector("#game-container");
const resetBtn = document.querySelector("#btn-reset");
const homeBtn = document.querySelector("#btn-home");
const matchMessage = document.querySelector("#match-message");
const winMessage = document.querySelector("#win-message");
const createGameColor = document.querySelector("#new-game-color");
const home = document.querySelector("#home");
const gameButtons = document.querySelector("#btn-container");
const newGame = document.querySelector("#new-game");
const currentScore = document.querySelector("#score");
const createNewGame = document.querySelector("#create-new-game");

let firstCard, secondCard;
let clickedCount = 0;
let totalMatch = 0;

const colors = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

function shuffleArray(array) {
    for (let index = array.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }

    return array;
}
let counter = 1;
function createCards(colorArray) {
    shuffleArray(colors);
    for (let color of colorArray) {
        const backCard = document.createElement("div");
        backCard.setAttribute('id', color);
        backCard.classList.add("card", "back-card", `${counter++}`);
        gameBoard.appendChild(backCard);
    }
}

createCards(colors);
createGameColor.addEventListener("click", function (event) {
    home.style["display"] = "none";
    gameBoard.style["display"] = "flex";
    gameButtons.style["display"] = "flex";
    currentScore.textContent = `Current Score - ${totalMatch}`;


})

homeButton.addEventListener("click", function (event) {
    home.style["display"] = "flex";
    gameBoard.style["display"] = "none";
    gameButtons.style["display"] = "none";

})

gameBoard.addEventListener("click", function (event) {
    const tag = event.target.tagName
    if (event.target.nodeName == "DIV" && clickedCount < 2) {

        if (clickedCount == 0 && !(event.target.classList.contains("blocked"))) {

            event.target.classList.add(event.target.id);
            firstCard = event.target;
            firstCard.classList.add("blocked");
            clickedCount++;

        } else if (clickedCount == 1 && !(event.target.classList.contains("blocked"))) {

            event.target.classList.add(event.target.id);
            secondCard = event.target;
            secondCard.classList.add("blocked");
            clickedCount++;
        }

        if (clickedCount == 2) {
            event.stopPropagation();
            if (firstCard.id != secondCard.id) {

                matchMessage.textContent = "Match failed !!!";

                setTimeout(function () {
                    clickedCount = 0;
                    firstCard.classList.remove("blocked");
                    secondCard.classList.remove("blocked");
                    firstCard.classList.remove(firstCard.id);
                    secondCard.classList.remove(secondCard.id);
                }, 1000);
                setTimeout(function () {
                    matchMessage.textContent = "";
                }, 1000)
            } else if (firstCard.id == secondCard.id) {
                clickedCount = 0;
                totalMatch++;
                matchMessage.textContent = "You got a match!";
                currentScore.textContent = `Current Score - ${totalMatch}`;
                setTimeout(function () {
                    matchMessage.textContent = "";
                }, 1000);
            }

        }

        if (totalMatch == 5) {
            setTimeout(function () {
                winMessage.textContent = "Congratulations! You have successfully matched all the cards and won the memory game!";
            }, 1000);
            setTimeout(function () {
                winMessage.textContent = "";
            }, 1600);

        }

    }
}, false);

newGame.addEventListener("click", function (event) {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    shuffleArray(colors);
    createCards(colors);
    totalMatch = 0;
    clickedCount = 0;
    currentScore.textContent = `Current Score - ${totalMatch}`;
})

homeBtn.addEventListener("click", function (event) {
    home.style["display"] = "flex";
    gameBoard.style["display"] = "none";
    gameButtons.style["display"] = "none";
})

createNewGame.addEventListener("click", function (event) {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    shuffleArray(colors);
    createCards(colors);
    totalMatch = 0;
    clickedCount = 0;
    currentScore.textContent = `Current Score - ${totalMatch}`;
    home.style["display"] = "none";
    gameBoard.style["display"] = "flex";
    gameButtons.style["display"] = "flex";


})