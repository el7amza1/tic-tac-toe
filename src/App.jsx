import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log"

import { WINNING_COMBINATIONS } from "../src/WINNING_COMBINATIONS ";
import GameOver from "./components/GameOver";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

const PLAYERS = {
  'X':'Player 1',
  'O': 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]
function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState(PLAYERS)
  const activePlayer = deriveActivePlayer(gameTurns)


  function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square

      gameBoard[row][col] = player;
    }
    return gameBoard
  }

  function deriveWinner(gameBoard, players) {
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
      const firstSuareSymbol = gameBoard[combination[0].row][combination[0].column]
      const secondSuareSymbol = gameBoard[combination[1].row][combination[1].column]
      const thirdSuareSymbol = gameBoard[combination[2].row][combination[2].column]
      if (firstSuareSymbol &&
        firstSuareSymbol === secondSuareSymbol &&
        firstSuareSymbol === thirdSuareSymbol) {
        winner = players[firstSuareSymbol]
      }
    }
    return winner
  }
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner
  function handelSelectSuare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns)


      const updatedTurns = [{
        square: {
          row: rowIndex,
          col: colIndex
        },
        player: currentPlayer
      }, ...prevTurns]
      return updatedTurns

    })
  }

  function handelRestart() {
    setGameTurns([])

  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }
  return (
    <main >
      <div id="game-container">
        <ol id="players" className='highlight-player '>
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
        </ol>
        {winner || hasDraw ? <GameOver winner={winner} onRestart={handelRestart} /> : ''}
        <GameBoard board={gameBoard} onSelectSuare={handelSelectSuare} />
      </div>
      <Log turns={gameTurns} />

    </main>
  )
}

export default App
