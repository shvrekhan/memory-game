const parentContainer = document.querySelector("#parent-container");
const homeLogo = document.querySelector("#home-logo");

const infoBar = document.querySelector("#info-bar");
const message = document.querySelector("#message");
const currentResult = document.querySelector("#current-result");
const timer = document.querySelector("#timer");

const instructions = document.querySelector("#instruction");

const gameBoardContainer = document.querySelector("#game-board-container");
const gameBoard = document.querySelector("#game-board");

const difficulty = document.querySelector("#difficulty");
const easy = document.querySelector("#easy");
const medium = document.querySelector("#medium");
const hard = document.querySelector("#hard");

const gameControls = document.querySelector("#pause-newgame");
const pause = document.querySelector("#pause-resume");
const newGame = document.querySelector("#new-game");

const globalResult = document.querySelector("#global-result");

let totalCardsToMatch = 0;
let previousCard = null;

const imgArray = [];
for (let index = 1; index <= 36; index++) {
    imgArray.push(`${index}.gif`);
}

homeLogo.addEventListener("click", function () {
    showHome();
});

easy.addEventListener("click", function () {
    const level = 4;
    hideHome();
    createGame(level);
});

medium.addEventListener("click", function () {
    const level = 6;
    hideHome();
    createGame(level);
});

hard.addEventListener("click", function () {
    const level = 8;
    hideHome(level);
    createGame(level);
});

pause.addEventListener("click", function () {
    console.log("pause");
});

newGame.addEventListener("click", function () {
    console.log("new game");
});

gameBoard.addEventListener("click", function (event) {

})



function shuffleArray(array) {

    for (let index = array.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }

    return array;
}


function createGame(level = 4) {
    const shuffledImages = shuffleArray(imgArray);
    const imageNeeded = shuffledImages.slice(0, Math.floor((level * level) / 2));
    totalCardsToMatch = imageNeeded.length;
    const shuffledPaired = shuffleArray([...imageNeeded, ...imageNeeded]);
    console.log(shuffledPaired);

    if (level == 4) {
        createDivsForColors(shuffledPaired);
    } else if (level == 6) {
        createDivsForColors(shuffledPaired);
        document.querySelectorAll('#game-board .card').forEach(function (cardNode) {
            cardNode.style['width'] = `12vw`;
            cardNode.style['height'] = `12vh`;
        });

    } else {
        createDivsForColors(shuffledPaired);
        document.querySelectorAll('#game-board .card').forEach(function (cardNode) {
            cardNode.style["width"] = "9vw";
            cardNode.style["height"] = "9vh";
        })

    }


}

function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.dataset.gif = `${color}`;

        const frontImage = document.createElement("div");
        const image = document.createElement("img");
        image.classList.add("card");
        image.src = "./gifs/question-mark-animation.gif";
        frontImage.appendChild(image);

        const backImage = document.createElement("div");
        backImage.classList.add("card", "none");
        backImage.style.background = `url(gifs/${color})`;

        newDiv.appendChild(frontImage);
        newDiv.appendChild(backImage);

        newDiv.addEventListener("click", handleCardClick, { capture: true });
        gameBoard.append(newDiv);
    }
}

// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    event.stopPropagation();
    console.log("you clicked", event.target.parentNode.parentNode);

    let currentCard = event.target.parentNode.parentNode;

}



function hideHome() {
    infoBar.style["display"] = "flex";
    instructions.style["display"] = "none";
    gameBoardContainer.style["display"] = "flex";
    difficulty.style["display"] = "none";
    gameControls.style["display"] = "flex";
    globalResult.style["display"] = "none";

}

function showHome() {
    infoBar.style["display"] = "none";
    instructions.style["display"] = "flex";
    gameBoardContainer.style["display"] = "none";
    difficulty.style["display"] = "flex";
    gameControls.style["display"] = "none";
    globalResult.style["display"] = "flex";

}

