const parentContainer = document.querySelector("#parent-container");
const homeLogo = document.querySelector("#home-logo");

const infoBar = document.querySelector("#info-bar");
const message = document.querySelector("#message");
const currentCounts = document.querySelector("#guess-taken");
const currentResult = document.querySelector("#current-result");
const timer = document.querySelector("#timer");

const winMessage = document.querySelector("#winner");

const instructions = document.querySelector("#instruction");

const gameBoardContainer = document.querySelector("#game-board-container");
const gameBoard = document.querySelector("#game-board");

const difficulty = document.querySelector("#difficulty");
const easy = document.querySelector("#easy");
const medium = document.querySelector("#medium");
const hard = document.querySelector("#hard");

const resetGame = document.querySelector("#reset-game");
const resetMsg = document.querySelector("#reset");

const globalResult = document.querySelector("#global-result");
const bestTime = document.querySelector("#best-time");
const bestCount = document.querySelector("#best-count");

const yesReset = document.querySelector("#yes-reset");
const noReset = document.querySelector("#no-reset");

const newGameWin = document.querySelector("#new-game-win");
let totalCardsToMatch = 0;
let clickedCount = 0;
let totalCount = 0;
let totalMatch = 0;
let firstCard, secondCard, timeStamp;


const best = localStorage.getItem("Best");
if (best == null) {
    bestCount.textContent = `Min Guess Taken - 0`;
} else {
    bestCount.textContent = `Min Guess Taken -${best}`;
}


let colorArray = [];
for (let index = 0; index <= 36; index++) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    colorArray.push("rgb(" + red + ", " + green + ", " + blue + ")");
}


homeLogo.addEventListener("click", function () {
    createNewGame();

});

easy.addEventListener("click", function () {
    const level = 4;
    console.log("60")
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


resetGame.addEventListener("click", function (event) {
    resetMsg.style["display"] = "flex";
});

yesReset.addEventListener("click", function (event) {
    location.reload();

});
noReset.addEventListener("click", function () {
    resetMsg.style["display"] = "none";
});

newGameWin.querySelector("click", function () {
    location.reload();
})




function shuffleArray(array) {

    for (let index = array.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }

    return array;
}


function createGame(level = 4) {
    const shuffledImages = shuffleArray(colorArray);
    const imageNeeded = shuffledImages.slice(0, Math.floor((level * level) / 2));
    totalCardsToMatch = imageNeeded.length;
    const shuffledPaired = shuffleArray([...imageNeeded, ...imageNeeded]);
    console.log(shuffledPaired);

    if (level == 4) {
        createDivsForColors(shuffledPaired);
    } else if (level == 6) {
        createDivsForColors(shuffledPaired);
        document.querySelectorAll('#game-board .card').forEach(function (cardNode) {
            cardNode.style['width'] = `11vw`;
            cardNode.style['height'] = `11vh`;
        });

    } else {
        createDivsForColors(shuffledPaired);
        document.querySelectorAll('#game-board .card').forEach(function (cardNode) {
            cardNode.style["width"] = "8vw";
            cardNode.style["height"] = "8vh";
        })

    }


}

function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.dataset.color = `${color}`;
        newDiv.classList.add("card");
        newDiv.style["background-color"] = `rgb(227,201,161)`
        newDiv.addEventListener("click", handelClick);

        gameBoard.append(newDiv);
    }
}

function handelClick(event) {
    if (clickedCount < 2) {
        if (clickedCount == 0 && !(event.target.classList.contains("blocked"))) {
            event.target.style["background-color"] = `${event.target.dataset.color}`;
            firstCard = event.target;
            firstCard.classList.add("blocked");
            clickedCount++;
            totalCount++;
            currentCounts.textContent = `Total guess - ${totalCount}`;
            if (totalCount === 1) {
                gameTimer();
            }

        } else if (clickedCount == 1 && !(event.target.classList.contains("blocked"))) {

            event.target.style["background-color"] = `${event.target.dataset.color}`;
            secondCard = event.target;
            secondCard.classList.add("blocked");
            clickedCount++;
            totalCount++;
            currentCounts.textContent = `Total guess - ${totalCount}`;
        }

        if (clickedCount == 2) {
            if (firstCard.dataset.color != secondCard.dataset.color) {
                firstCard.style["border"] = " 0.4rem solid red";
                secondCard.style["border"] = " 0.4rem solid red";
                message.textContent = "Match failed !!!";

                setTimeout(function () {
                    clickedCount = 0;
                    firstCard.classList.remove("blocked");
                    secondCard.classList.remove("blocked");
                    firstCard.style["background-color"] = "rgb(227,201,161)";
                    secondCard.style["background-color"] = "rgb(227,201,161)";
                    firstCard.style.border = null;
                    secondCard.style.border = null;

                }, 1000);
                setTimeout(function () {
                    message.textContent = "";
                }, 1000);
            } else if (firstCard.dataset.color == secondCard.dataset.color) {
                clickedCount = 0;
                totalMatch++;
                firstCard.style["border"] = " 0.4rem solid green";
                secondCard.style["border"] = " 0.4rem solid green";
                message.textContent = "You got a match!";
                currentResult.textContent = `Current Score - ${totalMatch}`;
                setTimeout(function () {
                    message.textContent = "";
                }, 1000);
            }

            if (totalMatch == totalCardsToMatch) {
                clearInterval(timeStamp);
                if (Number(best) > totalCount) {
                    console.log("win");
                    localStorage.setItem("Best", JSON.stringify(totalCount));
                } else {
                    localStorage.setItem("Best", JSON.stringify(totalCount));
                }
                gameBoard.style["display"] = "none";
                winMessage.style["display"] = "flex";
                resetGame.style["display"] = "none";

            }

        }

    }
}



function hideHome() {
    infoBar.style["display"] = "flex";
    instructions.style["display"] = "none";
    gameBoardContainer.style["display"] = "flex";
    difficulty.style["display"] = "none";
    resetGame.style["display"] = "flex";
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


function gameTimer() {
    let startTime = new Date().getTime();

    timeStamp = setInterval(() => {

        let now = new Date().getTime();
        let elapsed = now - startTime;
        let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        let currentTime = minutes + ':' + seconds;
        timer.textContent = `${currentTime}`;
    }, 900);
}

function deleteGame() {
    for (let index = gameBoard.childNodes.length - 1; index >= 0; index--) {
        gameBoard.removeChild(gameBoard.childNodes[index]);
    }
}

function createNewGame() {
    location.reload();

}