import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "../src/WINNING_COMBINATIONS ";
import GameOver from "./components/GameOver";

// Function to determine the active player based on the game turns
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  // If the first move was made by 'X', it's 'O's turn next
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

// Define player symbols and their corresponding names
const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};

// Initial state of the game board, a 3x3 grid filled with null
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  // State to track game turns
  const [gameTurns, setGameTurns] = useState([]);
  // State to track player names
  const [players, setPlayers] = useState(PLAYERS);
  // Determine the active player based on the game turns
  const activePlayer = deriveActivePlayer(gameTurns);

  // Function to derive the current state of the game board based on the game turns
  function deriveGameBoard(gameTurns) {
    // Create a deep copy of the initial game board
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

    // Update the game board with the moves made so far
    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
    }
    return gameBoard;
  }

  // Function to determine the winner based on the current state of the game board
  function deriveWinner(gameBoard, players) {
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
      if (firstSquareSymbol &&
          firstSquareSymbol === secondSquareSymbol &&
          firstSquareSymbol === thirdSquareSymbol) {
        winner = players[firstSquareSymbol];
      }
    }
    return winner;
  }

  // Get the current state of the game board
  const gameBoard = deriveGameBoard(gameTurns);
  // Determine if there's a winner
  const winner = deriveWinner(gameBoard, players);
  // Determine if the game is a draw
  const hasDraw = gameTurns.length === 9 && !winner;

  // Function to handle a square selection by the player
  function handelSelectSquare(rowIndex, colIndex) {
    // Update the game turns with the new move
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{
        square: {
          row: rowIndex,
          col: colIndex
        },
        player: currentPlayer
      }, ...prevTurns];
      return updatedTurns;
    });
  }

  // Function to handle game restart
  function handelRestart() {
    setGameTurns([]);
  }

  // Function to handle player name change
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
        </ol>
        {winner || hasDraw ? <GameOver winner={winner} onRestart={handelRestart} /> : ''}
        <GameBoard board={gameBoard} onSelectSquare={handelSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
