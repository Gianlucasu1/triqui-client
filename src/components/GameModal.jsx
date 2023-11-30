/* eslint-disable react/prop-types */

export default function GameModal({ handleClick }) {
  return (
    <div className="gamemodal">
      <p>
        Escoge
        <button
          onClick={() => {
            handleClick("X");
          }}
        >
          X
        </button>
        ó
        <button
          onClick={() => {
            handleClick("O");
          }}
        >
          O
        </button>
      </p>
    </div>
  );
}
