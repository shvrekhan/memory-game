const parentContainer = document.querySelector("#parent");
const headerBar = document.querySelector("#header");
const homeButton = document.querySelector("#home-button");
const gameBoard = document.querySelector("#game-container");
const resetBtn = document.querySelector("#btn-reset");
const homeBtn = document.querySelector("#btn-home");


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
        const frontCard = document.createElement("div")
        frontCard.classList.add("card", "front-card");

        const backCard = document.createElement("div");
        backCard.classList.add(color, "card", "back-card");

        gameBoard.appendChild(frontCard);
        gameBoard.appendChild(backCard);
    }
}

createCards(colors);

parentContainer.addEventListener("click", function (event) {

    console.log(event.target);
    if (event.target.id == "btn-reset") {
        location.reload();
    }

    


}, false)