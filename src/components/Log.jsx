import React from 'react';

// Log component for displaying the history of turns taken in the game
export default function Log({ turns }) {
  return (
    <ol id='log'>
      {/* Loop through each turn and display the player's move */}
      {turns.map((turn) => (
        // Use a unique key based on the row and column of the square selected
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
