let ticTacToe = {
    game: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    // true = X, false = O
    turn: true,
    hasWon: false,
    changeTurn: function() {
        this.turn = !this.turn;
    },
    renderCurrentBoard: function() {
        let boardBoxes = document.getElementsByClassName('square');
        this.game.forEach((box, ind) => {
            boardBoxes[ind].textContent = box;
        });
    },
    addMark: function(loc) {
        if (this.turn === true && this.game[loc - 1] === 0) {
            this.game[loc - 1] = 1;
            this.changeTurn();
        } else if (this.turn === false && this.game[loc - 1] === 0) {
            this.game[loc - 1] = -1;
            this.changeTurn();
        }

        this.renderCurrentBoard();
        this.checkWin();
    },
    resetGame: function() {
        this.game = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.renderCurrentBoard();
        this.turn = true;
        this.hasWon = false;
    },

    checkWin: function() {
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
            alert('congrats');
            this.resetGame();
        }
    }
};

ticTacToe.renderCurrentBoard();

// ticTacToe.addMark('o', 0);

let today = new Date();
time = today.getHours();

console.log(time);