const board = (() => {

     let isPlayersTurn = true;
     let isGameOver = false;
     let turnsTaken = 0;
     const winnerLine = document.querySelector("h2");

     let boardState = (() => {
          let array = [];
          for (let i = 0; i < 3; i++) {
               let tempArray = [];
               for (let j = 0; j < 3; j++) {
                    tempArray.push("");
                    document.querySelector('[data-row="' + j + '"][data-column="' + i + '"').addEventListener("click", function () {
                         if (isPlayersTurn) {
                              player.makeMove(i, j);
                         }
                         else {
                              opponent.makeMove(i, j);
                         }
                         isPlayersTurn = !isPlayersTurn;
                         if (opponent.isAComputer) {
                              bestMove(opponent.getSymbol());
                              isPlayersTurn = !isPlayersTurn;
                         }
                    });
               }
               array.push(tempArray);
          }
          return array;
     })();

     let clearBoard = () => {
          for (let i = 0; i < 3; i++) {
               for (let j = 0; j < 3; j++) {
                    boardState[i][j] = "";
                    document.querySelector('[data-row="' + j + '"][data-column="' + i + '"').textContent = "";
               }
          }
     }

     let emptySpaces = (board) => {
          let emptyArray = [];
          for (let i = 0; i < 3; i++) {
               for (let j = 0; j < 3; j++) {
                    if (board[i][j] === "") {
                         emptyArray.push({ column: i, row: j });
                    }
               }
          }
          return emptyArray;
     }

     let bestMove = (symbol) => {
          let emptyMoves = emptySpaces(boardState);
          let bestScore = -10000;
          let index = -1;
          if (emptyMoves.length !== 0) {
               for (let i = 0; i < emptyMoves.length; i++) {
                    let newBoard = JSON.parse(JSON.stringify(boardState));
                    newBoard[emptyMoves[i].column][emptyMoves[i].row] = symbol;
                    let newScore = minMax(emptyMoves[i].column, emptyMoves[i].row, newBoard, player.getSymbol());
                    if (bestScore < newScore)
                    {
                         bestScore = newScore;
                         index = i;
                    }
               }
          }
          opponent.makeMove(emptyMoves[index].column, emptyMoves[index].row);
     }

     let minMax = (column, row, board, symbol) => {
          let opponentSymbol = symbol === "X" ? "O" : "X"; 
          let isAWin = checkForWin(column, row, opponentSymbol, board);
          let wasComputersTurn = (opponent.getSymbol() === opponentSymbol);
          let isPlayersTurn = (player.getSymbol() === symbol);
          let bestScore;
          if (isAWin && wasComputersTurn) {
               bestScore = 10;
               return bestScore;
          }
          else if (isAWin) {
               bestScore = -10;
               return bestScore;
               }
          let emptyArray = emptySpaces(board);
          if (emptyArray.length === 0) {
               return 0;
          }
          else {
               let newScore;
               if (isPlayersTurn)
               {
                    bestScore = 10000;
               }
               else
               {
                    bestScore = -10000;
               }
               for (let i = 0; i < emptyArray.length; i++) {
                    let newBoard = JSON.parse(JSON.stringify(board));
                    newBoard[emptyArray[i].column][emptyArray[i].row] = symbol;
                    if (isPlayersTurn) {
                         newScore = minMax(emptyArray[i].column, emptyArray[i].row, newBoard, opponent.getSymbol());
                         if (bestScore > newScore) { //trying to find the min
                              bestScore = newScore;
                         }
                    }
                    else {
                         newScore = minMax(emptyArray[i].column, emptyArray[i].row, newBoard, player.getSymbol());
                         if (bestScore < newScore) // trying to find the max
                         {
                              bestScore = newScore;
                         }
                    }
               }
               return bestScore;
          }
          
     }

     let checkForWin = (column, row, symbol, board) => {
          let match = true;
          for (let i = 0; i < 3; i++) {
               if (board[column][i] !== symbol) {
                    match = false;
               }
          }

          if (!match) {
               match = true;
               for (let i = 0; i < 3; i++) {
                    if (board[i][row] !== symbol) {
                         match = false;
                    }
               }
          }

          if (!match && ((column === 0 && row === 0) || (row === 2 && column === 2))) {
               match = true;
               for (let i = 0; i < 3; i++) {
                    if (board[i][i] !== symbol) {
                         match = false;
                    }
               }
          }

          if (!match && ((column === 2 && row === 0) || (row === 0 && column === 2))) {
               match = true;
               for (let i = 0; i < 3; i++) {
                    if (board[i][2 - i] !== symbol) {
                         match = false;
                    }
               }
          }

          return match;
     }

     let placePiece = (column, row, symbol) => {
          if (!isGameOver) {
               if (document.querySelector('[data-row="' + row + '"][data-column="' + column + '"').textContent === "") {
                    document.querySelector('[data-row="' + row + '"][data-column="' + column + '"').textContent = symbol;
                    boardState[column][row] = symbol;
                    if (checkForWin(column, row, symbol, boardState)) {
                         winnerLine.textContent = symbol + " has won!";
                         winnerLine.classList.remove("hidden");
                         isGameOver = true;
                    }
                    turnsTaken++;
                    if (turnsTaken >= 9) {
                         winnerLine.textContent = "It's a tie...";
                         winnerLine.classList.remove("hidden");
                         isGameOver = true;
                    }
               }
          }
     }
     return { placePiece, clearBoard, isPlayersTurn };
})();

const PlayerFunction = (name, symbol) => {
     const sayName = () => { return name; }
     const makeMove = (column, row) => {
          board.placePiece(column, row, symbol);
     };
     let isAComputer = false;
     const getSymbol = () => { return symbol; }

     return { sayName, makeMove, isAComputer, getSymbol };
};

const player = PlayerFunction("Bob", "X");
const opponent = PlayerFunction("Steve", "O");
opponent.isAComputer = true;