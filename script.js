const board = (() => {

     let isPlayersTurn = true;

     let boardState = (() => {
          let array = [];
          for (let i = 0; i < 3; i++) {
               let tempArray = [];
               for (let j = 0; j < 3; j++) {
                    tempArray.push("");
                    document.querySelector('[data-row="' + j + '"][data-column="' + i + '"').addEventListener("click", function(){
                         if (isPlayersTurn)
                         {
                              player.makeMove(i, j);
                         }
                         else
                         {
                              opponent.makeMove(i, j);
                         }
                         isPlayersTurn = !isPlayersTurn;
                    });
               }
               array.push(tempArray);
          }
          return array;
     })();

     let clearBoard = () => {
          for (let i = 0; i < 3; i++)
          {
               for (let j = 0; j < 3; j++)
               {
                    boardState[i][j] = "";
                    document.querySelector('[data-row="' + j + '"][data-column="' + i + '"').textContent = "";
               }
          }
     }

     let placePiece = (column, row, symbol) =>{
          if (document.querySelector('[data-row="' + row + '"][data-column="' + column + '"').textContent === "")
          {
               document.querySelector('[data-row="' + row + '"][data-column="' + column + '"').textContent = symbol;
               boardState[column][row] = symbol;
          }

     }
     return {placePiece, clearBoard};
})();

const PlayerFunction = (name, symbol) => {
     const sayName = () => {return name;}
     const makeMove= (column, row) => {
          board.placePiece(column, row, symbol);
     };
     return { sayName, makeMove };
   };

const player = PlayerFunction("Bob", "X");
const opponent = PlayerFunction("Steve", "O");
