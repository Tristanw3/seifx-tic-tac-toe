let ticTacToe = {
    game: createGame(),
    // turn true = X, false = O
    turn: false,
    hasWon: false,
    playingCompOpponent: false,
    scores: blankScores(),
    congratsMessageVisible: false,
    hoverState: false,

    changeTurn: function() {
        this.turn = !this.turn;
    },
    playComputer: function() {
        this.playingCompOpponent = !this.playingCompOpponent;
    },
    renderCurrentBoard: function() {
        let boardBoxes = document.getElementsByClassName('square');
        this.game.forEach((box, ind) => {
            if (box === -1) {
                boardBoxes[ind].textContent = 'X';
            } else if (box === 1) {
                boardBoxes[ind].textContent = 'O';
            } else {
                boardBoxes[ind].textContent = '';
            }
        });

        // Render Scores
        let playerXScore = document.querySelectorAll('#playerX span')[0];
        playerXScore.textContent = this.scores.playerX;

        let playerOScore = document.querySelectorAll('#playerO span')[0];
        playerOScore.textContent = this.scores.playerO;

        if (this.game.indexOf(-1) === -1 && this.game.indexOf(1) === -1) {
            document.getElementById('compPlay').style.display = 'block';
        } else {
            document.getElementById('compPlay').style.display = 'none';
        }
    },
    addMark: function(loc) {
        if (Math.abs(this.game[loc]) === 1) {
            return;
        }
        if (this.turn === true) {
            this.game[loc] = 1;
        } else if (this.turn === false) {
            this.game[loc] = -1;
        }
        this.hoverState = false;
        this.checkWin();
        if (this.hasWon === true || this.hasWon === 'draw') {
            this.resetGame();
            return;
        }

        this.changeTurn();
        this.renderCurrentBoard();
        if (this.playingCompOpponent === true && this.turn === true) {
            let compMove = ticTacToe.compOpponentMove();

            ticTacToe.addMark(compMove);
        }
    },
    resetGame: function() {
        this.game = createGame();
        this.turn = false;
        this.hasWon = false;
        this.renderCurrentBoard();
    },
    resetScores() {
        this.scores = blankScores();
        this.resetGame();
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
        } else if (this.game.indexOf(0) === -1) {
            this.hasWon = 'draw';
        }

        if (this.hasWon === true) {
            this.renderCurrentBoard();
            this.addToScore(this.turn);
            this.displayCongratsMessage();
        } else if (this.hasWon === 'draw') {
            this.renderCurrentBoard();
            this.displayCongratsMessage();
        }
    },
    addToScore: function(playerTurn) {
        if (!playerTurn) {
            this.scores.playerX += 1;
        } else if (playerTurn) {
            this.scores.playerO += 1;
        }
    },
    displayCongratsMessage: function() {
        let ticTacToeBoard = document.getElementsByClassName('board')[0];
        let bottomButtons = document.getElementsByClassName('lower')[0];
        let message = document.getElementsByClassName('congrats-message')[0];

        this.congratsMessageVisible = !this.congratsMessageVisible;

        if (this.congratsMessageVisible === true) {
            let winText = document.querySelector('.congrats-message h1');
            let scoreText = document.querySelector('.congrats-message p');

            if (this.hasWon === 'draw') {
                winText.textContent = 'Draw';
            } else {
                winText.textContent = ` Player ${getWin(this.turn)} wins`;
            }
            scoreText.textContent = `X : ${this.scores.playerX} | O : ${this.scores.playerO}`;
            ticTacToeBoard.style.display = 'none';
            bottomButtons.style.display = 'none';
            message.style.display = 'flex';
        } else if (this.congratsMessageVisible === false) {
            message.style.display = 'none';
            bottomButtons.style.display = 'flex';
            ticTacToeBoard.style.display = 'block';
        }
    },

    showColorsTheme: function() {
        let currentTheme;
        let today = new Date();
        let time = today.getHours();
        // time = 5;

        if (time > 6 && time < 18) {
            currentTheme = themes.light;
        } else {
            currentTheme = themes.dark;
        }
        $('body').css('background-color', currentTheme.background);
        $('div').css('color', currentTheme.marks);
        $('div').css('border-color', currentTheme.marks);
        $('header').css('background-color', currentTheme.top);
        $('.board').css('background-color', currentTheme.gameBackground);
        $('p').css('color', 'white');
        $('button').css('color', 'white');
        $('button').css('background-color', currentTheme.gameBackground);
        $('button').css('border-color', currentTheme.marks);
        $('.congrats-message').css('background-color', currentTheme.gameBackground);
        document.body.style.display = 'block';
    },

    seePreviewOnHover: function() {
        let sq = $('.square');

        sq.hover(
            function(event) {
                if (event.currentTarget.textContent === '') {
                    ticTacToe.hoverState = true;

                    if (ticTacToe.turn === true) {
                        event.currentTarget.textContent = 'O';
                        event.currentTarget.className = event.currentTarget.className + ' animated fadeIn';
                    } else if (ticTacToe.turn === false) {
                        event.currentTarget.textContent = 'X';
                        event.currentTarget.className = event.currentTarget.className + ' animated fadeIn';
                    }
                }
            },
            function(event) {
                if (ticTacToe.hoverState === true) {
                    event.currentTarget.textContent = '';
                    event.currentTarget.className = 'square';
                }
                ticTacToe.hoverState = false;
            }
        );
    },
    compOpponentMove: function() {
        let randomSpot = Math.floor(Math.random() * 9);
        if (this.game.indexOf(0) === -1) {
            return;
        }
        while (this.game[randomSpot] === 1 || this.game[randomSpot] === -1) {
            randomSpot = Math.floor(Math.random() * 9);
        }
        return randomSpot;
    },
    resetAndRemoveMessage() {
        this.displayCongratsMessage();
        this.resetGame();
    },
    saveGame() {
        window.localStorage.setItem('scores', JSON.stringify(this.scores));
    },
    clearSaveGame: function() {
        window.localStorage.setItem('scores', JSON.stringify(blankScores()));
    },
    getScoresFromStorage: function() {
        return JSON.parse(window.localStorage.getItem('scores'));
    },
    useSavedScores: function() {
        let saved = this.getScoresFromStorage();
        this.scores.playerO = saved.playerO;
        this.scores.playerX = saved.playerX;
        this.renderCurrentBoard();
    }
};

function createGame() {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function blankScores() {
    return {
        playerX: 0,
        playerO: 0
    };
}

function getWin(turn) {
    if (turn === true) {
        return 'O';
    } else if (turn === false) {
        return 'X';
    }
}

const themes = {
    light: {
        background: '#82877A',
        gameBackground: '#B4AA97',
        marks: '#D44917',
        top: '#D44917',
        topText: '#F5F4E1'
    },
    dark: {
        background: '#140126',
        gameBackground: '#270140',
        marks: '#63038C',
        top: '#63038C',
        topText: '#140126'
    }
};

function initiation() {
    ticTacToe.showColorsTheme();
    ticTacToe.renderCurrentBoard();
    ticTacToe.seePreviewOnHover();
}

initiation();