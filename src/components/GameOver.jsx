import React from 'react';

// GameOver component for displaying the end-of-game message and a rematch button
export default function GameOver({ winner, onRestart }) {
  return (
    <div id='game-over'>
      <h2>Game Over!</h2>
      {/* Display the winner message if there is a winner */}
      {winner && <p>{winner} won!</p>}
      {/* Display a draw message if there is no winner */}
      {!winner && <p>It&apos;s a draw</p>}
      {/* Button to restart the game */}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
