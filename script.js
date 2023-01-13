const parentContainer = document.querySelector("#parent");
const headerBar = document.querySelector("#header");
const homeButton = document.querySelector("#home-button");
const gameBoard = document.querySelector("#game-container");
const resetBtn = document.querySelector("#btn-reset");
const homeBtn = document.querySelector("#btn-home");

let firstCard, secondCard;
let hasFlipped = false;
let clickedCount = 0;

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

    console.log(event.target.id);
    if (event.target.id == "btn-reset") {
        location.reload();
    }

    if (clickedCount == 0) {
        event.target.classList.add(event.target.id);
        firstCard = event.target;
        clickedCount++;
    } else if (clickedCount == 1) {
        event.target.classList.add(event.target.id);
        secondCard = event.target;
        clickedCount++;
    }

    if (clickedCount == 2) {
        if (firstCard.id != secondCard.id) {
            setTimeout(function () {
                firstCard.classList.remove(firstCard.id);
                secondCard.classList.remove(secondCard.id);
                clickedCount = 0;
            }, 2000);
        } else if (firstCard.id == secondCard.id) {
            firstCard.removeEventListener("onclick", function () {
                console.log("event removed")
            });
            secondCard.removeEventListener("onclick", function () {
                console.log("event removed");
            });
            clickedCount = 0;
        }

    }




}, false)