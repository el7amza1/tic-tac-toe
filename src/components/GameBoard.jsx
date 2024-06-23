import React from 'react';

// GameBoard component for displaying the tic-tac-toe board and handling square selections
export default function GameBoard({ onSelectSuare, board }) {
    return (
        <ol id='game-board'>
            {/* Loop through each row in the board */}
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {/* Loop through each cell in the row */}
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                {/* Button for each cell in the game board */}
                                <button
                                    onClick={() => onSelectSuare(rowIndex, colIndex)}
                                    disabled={!!playerSymbol} // Disable the button if the cell is already occupied
                                >
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
