var cells = document.getElementsByClassName("cell");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("whichTurn").innerText = "X";
    for (let i=0; i<cells.length; i++) {
        cells[i].value = "";
        cells[i].setAttribute("row", Math.floor(i / 3));
        cells[i].setAttribute("col", i % 3);
    }
});

function addInput(c) {
    var whichTurn = document.getElementById("whichTurn");
    c.value = whichTurn.innerText;
    c.setAttribute("disabled", true);
    checkCondition();
    if (whichTurn.innerText == "X") {
        whichTurn.innerText = "O";
    } else {
        whichTurn.innerText = "X";
    }
}

function checkCondition() {
    var whichTurn = document.getElementById("whichTurn");
    if (checkWin()) {
        // disable all cells
        for (let i=0; i<9; i++) {
            cells[i].setAttribute("disabled", true);
        }
        // congratulate the winner
        document.getElementById("result").innerText = `Congratulations on your win ${whichTurn.innerText}!`;
    }
    else if (allCellsOccupied()) {
        // announce stalemate
        document.getElementById("result").innerText = `There is no winner :(`;
    }
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
    console.log(winningConditions)
    for (let i=0; i<winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let first = cells[winCondition[0]].value;
        let second = cells[winCondition[1]].value;
        let third = cells[winCondition[2]].value;
        if (first == "" || second == "" || third == "") {
            continue;
        }
        if (first == second && second == third) {
            console.log("we have a winner!")
            console.log(winCondition);
            return true;
        }
    }
    return false;
}

function allCellsOccupied() {
    var fullOccupation = 0;
    for (let i=0; i<cells.length; i++) {
        if (cells[i].getAttribute("disabled") == "true") {
            fullOccupation += 1;
        }
    }
    if (fullOccupation == 9) {
        return true;
    } else {
        return false;
    }
}