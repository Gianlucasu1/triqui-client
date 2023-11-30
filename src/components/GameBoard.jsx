/* eslint-disable react/prop-types */
import GameCell from './GameCell';

function GameBoard({ board, onCellClick }) {
    return (
        <div className="game-board">
            {board.map((cell, index) => (
                <GameCell key={index} value={cell} onClick={() => onCellClick(index)} />
            ))}
        </div>
    );
}

export default GameBoard;