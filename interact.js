let ticTacToe = {
    game: createGame(),
    // true = X, false = O
    turn: true,
    hasWon: false,
    scores: {
        playerX: 0,
        playerO: 0
    },
    changeTurn: function () {
        this.turn = !this.turn;
    },
    renderCurrentBoard: function () {
        let boardBoxes = document.getElementsByClassName('square');
        this.game.forEach((box, ind) => {
            if (box === -1) {
                boardBoxes[ind].textContent = "X";
            } else if (box === 1) {
                boardBoxes[ind].textContent = "O";
            } else {
                boardBoxes[ind].textContent = "";
            }

        });
    },
    addMark: function (loc) {
        if (Math.abs(this.game[loc - 1]) === 1) {
            console.log('exit func');
            return;
        }
        if (this.turn === true) {
            this.game[loc - 1] = 1;
        } else if (this.turn === false) {
            this.game[loc - 1] = -1;

        }
        this.checkWin();
        this.changeTurn();
        this.renderCurrentBoard();

    },
    resetGame: function () {
        this.game = createGame();
        this.renderCurrentBoard();
        this.turn = true;
        this.hasWon = false;
    },

    checkWin: function () {
        // 3 horizontal rows
        if (Math.abs(this.game[0] + this.game[1] + this.game[2]) === 3) {
            this.hasWon = true;
        } else if (Math.abs(this.game[3] + this.game[4] + this.game[5]) === 3) {
            this.hasWon = true;
        } else if (Math.abs(this.game[6] + this.game[7] + this.game[8]) === 3) {
            this.hasWon = true;
            // 3 vertical rows
        } else if (Math.abs(this.game[0] + this.game[3] + this.game[6]) === 3) {
            this.hasWon = true;
        } else if (Math.abs(this.game[1] + this.game[4] + this.game[7]) === 3) {
            this.hasWon = true;
        } else if (Math.abs(this.game[2] + this.game[5] + this.game[8]) === 3) {
            this.hasWon = true;
            //  2 diagonals
        } else if (Math.abs(this.game[0] + this.game[4] + this.game[8]) === 3) {
            this.hasWon = true;
        } else if (Math.abs(this.game[2] + this.game[4] + this.game[6]) === 3) {
            this.hasWon = true;
        }
        if (this.hasWon === true) {
            this.renderCurrentBoard();
            alert('congrats');
            this.resetGame();
        }
    },
    addToScore: function (player) {
        this.scores[player] += 1;
    }
};

function createGame() {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0]
}

ticTacToe.renderCurrentBoard();

// ticTacToe.addMark('o', 0);

let today = new Date();
time = today.getHours();

console.log(time);