

// Tic Tac Toe

// Finding elements

gameOne = document.querySelector('.game-one');
gameTwo = document.querySelector('.game-two');
gameThree = document.querySelector('.game-three');
gameFour = document.querySelector('.game-four');
gameFive = document.querySelector('.game-five');
gameSix = document.querySelector('.game-six');
gameSeven = document.querySelector('.game-seven');
gameEight = document.querySelector('.game-eight');
gameNine = document.querySelector('.game-nine');
gameElements = document.querySelectorAll('.game>div');
gameElement = document.querySelector('.game');
startBtn = document.querySelector('.start');
resetBtn = document.querySelector('.reset');
infoBanner = document.querySelector('.info');
computerBtn = document.querySelector('.computer');

// Game variables

var playerOne = [];
var playerTwo = [];
var computerChoice = [];
var choicesAvailable = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var turn = 0;

var winningStates = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

// Functions

// Check win uses an array generated by user input for each players gueses. It then compares this array against the winning states array. If it succesfully finds all the players choices in one of the winningStates arrays it will return True. If it does not find a winning combination it will return False.

function checkWin(array) {
    var counter = 0;
    for(var i = 0; i < winningStates.length; i++) {
        if (counter != 3) {
            counter = 0;
            for(var y = 0; y < array.length; y++) {
                if (winningStates[i].includes(array[y])) {
                    counter += 1;
                }
            }
        } else if (counter === 3) {
            return true
        }
    } if (counter === 3) {
        return true
    }
    return false
}

// Check turn checks who's turn it is and changes the state of the turn from player one to player two. Returns 1 for player one and returns 2 for player 2. 

function checkTurn() {
    if (turn === 0 || turn === 2) {
        turn = 1
        return 1
    } else if (turn === 1) {
        turn = 2
        return 2
    }
}

// Changes banner text to the winner of the game and removes event listeners from game squares

function gameOver(player) {
    infoBanner.textContent = `Game Over! ${player} won the game! Hit Reset to play again!`
    for (var i = 0; i < gameElements.length; i++) {
        gameElements[i].removeEventListener('click', handleClick);
    }
}

// Assigns a move to one of three array's (playerone, playertwo, computerchoice) and removes choice from available choices array to track gameboard and remaining options. Updates gameboard depending on which players turn it is.

function assignMove(event, player) {
    if (event.currentTarget.classList[1] == undefined) {
        if (player == playerOne) {
            event.currentTarget.classList.toggle("playerone");
        } else if (player == playerTwo) {
            event.currentTarget.classList.toggle("playertwo");
        }
        
        for (var i = 1; i <= 9; i++) {
            if(Number(event.currentTarget.dataset.position) === i) {

                player.push(i);

                const index = choicesAvailable.indexOf(i);
                if (index > -1) {
                    choicesAvailable.splice(index, 1);
                }
    
                if (player === playerOne) {
                    event.currentTarget.querySelector('.flip-card-back').textContent = "O";
                    event.currentTarget.querySelector('.flip-card-inner').style.transform = "rotateY(180deg)";
                } else if (player === playerTwo) {
                    event.currentTarget.querySelector('.flip-card-back').textContent = "X";
                    event.currentTarget.querySelector('.flip-card-inner').style.transform = "rotateY(180deg)";
                }
            }
        }
    } else {
        return infoBanner.textContent = "That squares taken try another one!"
    }
}

// Checks to see if there is a draw condition on the board and updates banner. Removes event listeners from game squares

function checkDraw() {

    var counter = 0;
    if (choicesAvailable[0] == undefined) {
        infoBanner.textContent = "It's a draw! Hit Reset to play again!"

        for (var i = 0; i < gameElements.length; i++) {
            gameElements[i].removeEventListener('click', handleClick);
        }
        return true
    }

    for (var i = 0; i < gameElements.length; i++) {
        if (gameElements[i].classList[1] == "playerone" || gameElements[i].classList[1] == "playertwo") {
            counter += 1;
        }
        if (counter == 9) {
            infoBanner.textContent = "It's a draw! Hit Reset to play again!"

            for (var i = 0; i < gameElements.length; i++) {
            gameElements[i].removeEventListener('click', handleClick);
            }
        }
    }
}

// Runs assign move function. Changes banner text to player two's turn. Checks to see if there is a winning combination on the gameboard. Checks to see if there is a draw condition. If computer mode is active it runs the randomized computer function.

function playerOneMove(event) {
    assignMove(event, playerOne);

    infoBanner.textContent = "It's Player two's turn select a square to mark an X!"

    if (checkWin(playerOne)) {
        gameOver("Player One")
        return
    } else {
        if (checkDraw()) {
            return
        };
        if (document.querySelector('.computer').classList[1] == 'active') {
            computer()
        }
    }
}

// Runs assign move function. Changes banner text to player ones's turn. Checks to see if there is a winning combination on the gameboard. Checks to see if there is a draw condition.

function playerTwoMove(event) {
    assignMove(event, playerTwo);

    infoBanner.textContent = "It's Player one's turn select a square to mark an O!"

    if (checkWin(playerTwo)) {
        gameOver("Player Two")
        return
    } else {
        if (checkDraw()) {
            return
        };
    }
}

// Uses the choices available array to pick a randomized choice for the computer. When a move has been chosen updates gameboard and changes banner to player one's turn.

function computer() {
    var randomChoice = choicesAvailable[Math.floor(Math.random()*choicesAvailable.length)];

    choicesAvailable.indexOf(randomChoice);

    for (var i = 1; i <= 9; i++) {
        if(Number(randomChoice) === i) {
            computerChoice.push(i);
            const index = choicesAvailable.indexOf(i);
            if (index > -1) {
                choicesAvailable.splice(index, 1);
            }
            var counter = i - 1;
            gameElements[counter].querySelector('.flip-card-back').textContent = "X";
            gameElements[counter].querySelector('.flip-card-inner').style.transform = "rotateY(180deg)";
        }
    }

    if (checkWin(computerChoice)) {
        gameOver("Computer")
        return
    } else {
        if (checkDraw()) {
            return
        };
    }
    checkTurn();
    infoBanner.textContent = "It's Player one's turn select a square to mark an O!"
}

// checks who's current turn it is using checkTurn function. Depending on what is returned triggers player one move or player two move function

function handleClick(event) {
    checkTurn();
    if (turn == 1) {
        playerOneMove(event);
    } else if (turn == 2) {
        playerTwoMove(event);
    }
}

// function to start the game. Adds event listeners for all the game squares and changes banner text to player one's turn

function startClick(event) {
    for (var i = 0; i < gameElements.length; i++) {
        gameElements[i].addEventListener('click', handleClick);
    }
    infoBanner.textContent = "It's Player one's turn select a square!"
}

function resetClick(event) {
    playerOne = [];
    playerTwo = [];
    computerChoice = [];
    choicesAvailable = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for(var i = 0; i < gameElements.length; i++) {
        turn = 0;
        gameElement.classList.remove("playerone");
        gameElement.classList.remove("playertwo");
        gameElements[i].classList.remove('playerone');
        gameElements[i].classList.remove('playertwo');
        gameElements[i].querySelector('.flip-card-inner').style.transform = ""
        gameElements[i].querySelector('.flip-card-back').textContent = "";
    }
    startClick();
}

// addEventListeners for start and reset and computer

startBtn.addEventListener('click', startClick);
resetBtn.addEventListener('click', resetClick);
computerBtn.addEventListener('click', function() {
    computerBtn.classList.toggle('active');
})
