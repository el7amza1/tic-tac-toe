import { useState } from "react";

// Player component for displaying and editing player details
export default function Player({ initialName, symbol, isActive, onChangeName }) {
    // State to manage if the player name is being edited
    const [isEditing, setIsEditing] = useState(false);
    // State to manage the player's name
    const [playerName, setPlayerName] = useState(initialName);

    // Function to handle the edit/save button click
    function handleClick() {
        // Toggle the editing state
        setIsEditing(editing => !editing);
        // Update the player's name
        onChangeName(symbol, playerName);
    }

    // Function to handle changes in the input field
    function handleChange(event) {
        // Update the player's name as the input value changes
        setPlayerName(event.target.value);
    }

    // Conditionally render the player name as either a span or an input field
    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editablePlayerName = <input type="text" onChange={handleChange} required value={playerName} />;
    }

    // Return the JSX for the Player component
    return (
        <li className={isActive ? 'active' : ""}>
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
            <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}

// {isEditing ? <input className="player-name" placeholder={name}/>: <span className="player-name">{name}</span>}
