/* eslint-disable react/prop-types */
function GameCell({ key, value, onClick }) {

    
    
    return (
        <button className="game-cell" onClick={()=>onClick(key)}>
            {value =="' '" ? " " : value}
        </button>
    );
}

export default GameCell;