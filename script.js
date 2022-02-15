var cells = document.getElementsByClassName("cell");
var currentPlayer;

document.addEventListener("DOMContentLoaded", () => {
    initializeBoard();
    initializeGame();
});

function initializeGame() {
    currentPlayer = "X";
    document.getElementById("reset").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("currentState").style.display = "block";
    document.getElementById("whichTurn").innerText = currentPlayer;
    for (let i=0; i<cells.length; i++) {
        cells[i].value = "";
        cells[i].removeAttribute("disabled");
        cells[i].style.backgroundColor = "#fff";
    }
}

function initializeBoard() {
    let grid = document.getElementById("grid");
    for (let i=0; i<9; i++) {
        grid.innerHTML += `<div><input class="cell" type="text" onclick="addInput(this)"/></div>`;
    }
}

function disableCells() {
    for (let i=0; i<9; i++) {
        cells[i].setAttribute("disabled", true);
    }
}

function addInput(c) {
    c.value = currentPlayer;
    c.setAttribute("disabled", true);
    checkCondition();
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    document.getElementById("whichTurn").innerText = currentPlayer;
}

function checkCondition() {
    if (checkWin()) {
        // disable all cells
        disableCells();
        // congratulate the winner
        setElementDisplay();
        document.getElementById("result").innerText = `Congratulations on your win ${currentPlayer}!`;
    }
    else if (allCellsOccupied()) {
        // announce stalemate
        setElementDisplay();
        document.getElementById("result").innerText = `There is no winner :(`;
    }
}

function setElementDisplay() {
    document.getElementById("result").style.display = "block";
    document.getElementById("currentState").style.display = "none";
    document.getElementById("reset").style.display = "block";
}

function checkWin() {
    const winningConditions = [
        // all three cells in any row are the same
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // all three cells in any column are the same
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // all three cells traversing the board diagonally are the same
        [0, 4, 8], [2, 4, 6]
    ]
    for (let i=0; i<winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let first = cells[winCondition[0]];
        let second = cells[winCondition[1]];
        let third = cells[winCondition[2]];
        if (first.value == "" || second.value == "" || third.value == "") {
            continue;
        }
        if (first.value == second.value && second.value == third.value) {
            first.style.backgroundColor = "#E9DFF4";
            second.style.backgroundColor = "#E9DFF4";
            third.style.backgroundColor = "#E9DFF4";
            return true;
        }
    }
    return false;
}

function allCellsOccupied() {
    for (let i=0; i<cells.length; i++) {
        if (cells[i].getAttribute("disabled") == "false" || cells[i].getAttribute("disabled") == null) {
            return false;
        }
    }
    return true;
}