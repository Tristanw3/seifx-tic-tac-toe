let ticTacToe = {
    game: createGame(),
    // true = X, false = O
    turn: false,
    hasWon: false,
    scores: blankScores(),
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

        // Render Scores
        let playerXScore = document.querySelectorAll('#playerX span')[0];
        playerXScore.textContent = this.scores.playerX;

        let playerOScore = document.querySelectorAll('#playerO span')[0];
        playerOScore.textContent = this.scores.playerO;

    },
    addMark: function (loc) {
        if (Math.abs(this.game[loc]) === 1) {
            return;
        }
        if (this.turn === true) {
            this.game[loc] = 1;
        } else if (this.turn === false) {
            this.game[loc] = -1;

        }
        this.checkWin();
        if (this.hasWon === true) {
            this.resetGame();
            return;
        }

        this.changeTurn();
        this.renderCurrentBoard();

    },
    resetGame: function () {
        this.game = createGame();
        this.turn = false;
        this.hasWon = false;
        this.renderCurrentBoard();
    },
    resetScores() {
        this.scores = blankScores();
        this.resetGame();
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

            this.addToScore(this.turn);
            alert('congrats');

        }
    },
    addToScore: function (playerTurn) {
        console.log(playerTurn);
        if (!playerTurn) {
            this.scores.playerX += 1;
        } else if (playerTurn) {
            this.scores.playerO += 1;
        }
    }
};

function createGame() {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0]
}

function blankScores() {
    return {
        playerX: 0,
        playerO: 0
    }
}

ticTacToe.renderCurrentBoard();

// ticTacToe.addMark('o', 0);

let today = new Date();
time = today.getHours();