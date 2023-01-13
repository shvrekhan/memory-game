const parentContainer = document.querySelector("#parent");
const headerBar = document.querySelector("#header");
const homeButton = document.querySelector("#home-button");
const gameBoard = document.querySelector("#game-container");
const resetBtn = document.querySelector("#btn-reset");
const homeBtn = document.querySelector("#btn-home");
const matchMessage = document.querySelector("#match-message")

let firstCard, secondCard;
let hasFlipped = false;
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

function createCards(colorArray) {
    shuffleArray(colors);
    for (let color of colorArray) {
        const backCard = document.createElement("div");
        backCard.setAttribute('id', color);
        backCard.classList.add("card", "back-card");

        gameBoard.appendChild(backCard);
    }
}

createCards(colors);

parentContainer.addEventListener("click", function (event) {
    const tagName = event.target.tagName;
    console.log(event.target.tagName);
    console.log(clickedCount);
    if (event.target.id == "btn-reset") {
        location.reload();
    }

    if (clickedCount == 0 && !event.target.classList.contains("blocked") && tagName == "DIV") {
        event.target.classList.add(event.target.id);
        firstCard = event.target;
        firstCard.classList.add("blocked");
        clickedCount++;
    } else if (clickedCount == 1 && !event.target.classList.contains("blocked") && tagName == "DIV") {
        event.target.classList.add(event.target.id);
        secondCard = event.target;
        secondCard.classList.add("blocked");
        clickedCount++;
    }

    if (clickedCount == 2) {
        if (firstCard.id != secondCard.id) {
            matchMessage.textContent = "retry";
            firstCard.classList.remove("blocked");
            secondCard.classList.remove("blocked");
            setTimeout(function () {
                firstCard.classList.remove(firstCard.id);
                secondCard.classList.remove(secondCard.id);
                clickedCount = 0;
                setTimeout(function () {
                    matchMessage.textContent = "";
                }, 1000)
            }, 1000);
        } else if (firstCard.id == secondCard.id) {
            matchMessage.textContent = "you got a match";
            clickedCount = 0;
            totalMatch++;
        }

    }




}, false)