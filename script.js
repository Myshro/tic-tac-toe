
const Board = (() => {
    const board = [``,``,``,``,``,``,``,``,``];
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    return {board, winningConditions};
})();

//Factory function creating players
const Player = (name, symbol) => {
    return {name,symbol};
}

const playerX = Player('Player X', 'x');
const playerO = Player('Player O', 'o')

const GameControl = (() => {
    const {board, winningConditions} = Board;

    let symbol = '';
    const gameStatus = document.querySelector(`.game-status`)

    const markCell = (e) => {
        const target = `${e.target.id}`;
        const targetArrayIndex = board[target];

        //VVV Try finding a way to write this below part with '?' operator
        if (symbol === '') {
            if (targetArrayIndex === '') {
                symbol = playerX.symbol; 
                board.splice(target, 1, symbol)
                gameStatus.textContent = "O's turn"
            }
        } else if (symbol === `x`) {
            if (targetArrayIndex === '') {
                symbol = playerO.symbol; 
                board.splice(target, 1, symbol)
                gameStatus.textContent = "X's turn"
            }
        } else if (symbol === 'o') {
            if (targetArrayIndex === '') {
                symbol = playerX.symbol;
                board.splice(target, 1, symbol)
                gameStatus.textContent = "O's turn"
            }
        }
        console.log(`symbol: ${symbol}`)
        const {renderMoves} = RenderAndReset;
        renderMoves();
        checkWinner();
    }

    function checkWinner() {
        let gameWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === `x` && b === 'x' && c === 'x') {
                gameWon = true;
                gameStatus.textContent = 'X wins!';
                break
            } else if (a === `o` && b === 'o' && c === 'o') {
                gameWon = true;
                gameStatus.textContent = 'O wins!';
            }
            symbol = '';
        }
        if (gameWon) removeClick()
    }
    

    const cells = Array.from(document.querySelectorAll(`.cell`))
    function addClick() {
        cells.forEach(cell => cell.addEventListener('click', markCell))
    }

    function removeClick() {
        cells.forEach(cell => cell.removeEventListener('click', markCell))
    }

    addClick()
    return {addClick, gameStatus}
})();

//Render array to screen and adds reset button functionality
const RenderAndReset = (() => {
    const {board} = Board;
    const {addClick, gameStatus} = GameControl;

    function renderMoves() {
        for(let i=0; i<board.length; i++) {
            const cell = document.getElementById(`${i}`);
            cell.textContent = board[i];
        }
    }

    const resetBtn = document.querySelector('.game-reset')

    resetBtn.addEventListener('click', () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        gameStatus.textContent = "X's turn"
        addClick();
        renderMoves();
    });
 
    return {renderMoves}
})();



