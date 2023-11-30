import { useState, useEffect, useRef } from 'react';
import GameBoard from './components/GameBoard';
import GameModal from './components/GameModal';

const ENDPOINT = "ws://127.0.0.1:12346";

function App() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(null);
    const [mensajeOk, setMensajeOk] = useState(null);
    const [counterPlayer1, setCounterPlayer1] = useState(null);
    const [counterPlayer2, setCounterPlayer2] = useState(null);
    const [gameCont, setGameCont] = useState(null);
    const [mensajeFunc, setMensajeFunc] = useState(null);
    const [isPlayer1, setIsPlayer1] = useState(null);
    const socket = useRef(null);

    console.log(isPlayer1);

    useEffect(() => {

        

        socket.current = new WebSocket(ENDPOINT);

        socket.current.onopen = () => {
            console.log("Conexión WebSocket abierta");
        };

        socket.current.onmessage = (event) => {
            console.log("Mensaje del servidor:", event.data);
            const messageParts = event.data.split("#");        
              
            if (messageParts.length >= 6) {
                const mensajeOk = messageParts[1];
                const mensajeFunc = messageParts[2];
                const newBoard = messageParts[4].split(',').map(cell => cell.trim() === 'None' ? null : cell.trim());
                const newGameCont = messageParts[5];
                const counterPlayer1 = messageParts[6][0];
                const counterPlayer2 = messageParts[6][1];
                const newIsPlayer1 = messageParts[messageParts.length - 1] == "player1" ? "player1" : "player2";
                newBoard[0] = newBoard[0].replace("[","");
                newBoard[8] = newBoard[8].replace("]","");
                const newPlayerTurn = messageParts[3];

                
                setCounterPlayer1(counterPlayer1);
                setCounterPlayer2(counterPlayer2);
                setGameCont(newGameCont);
                setMensajeOk(mensajeOk);
                setMensajeFunc(mensajeFunc);                
                setBoard(newBoard);
                setPlayerTurn(newPlayerTurn);
                setIsPlayer1(newIsPlayer1);

                if(mensajeFunc?.includes("ganó la partida")){
                    window.alert(mensajeFunc);

                }

            } else {
                console.log("Mensaje recibido no sigue el formato esperado:", event.data);
            }
        };

        socket.current.onerror = (error) => {
            console.error("Error en WebSocket:", error);
        };

        socket.current.onclose = () => {
            console.log("Conexión WebSocket cerrada");
        };
        

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, []);

    const handleClickModal = async (value) => {
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            await socket.current.send(`#JUGADA#${value}#`);
        } else {
            console.error("WebSocket no está conectado.");
        }
    };
    
    const handleClick = async(move) => {
        console.log("Celda clickeada:", move);

        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            await socket.current.send(`#JUGADA#${move}#`);
        } else {
            console.error("WebSocket no está conectado.");
        }
        
        // Aquí puedes manejar la lógica cuando se hace clic en una celda del tablero
    };

    return (
        <div className="app maincontainer">
            <p>Turno: {playerTurn}</p>
            <p>Juegos hechos:{gameCont}</p>  
            <p>{isPlayer1}</p>          
            <GameBoard board={board} onCellClick={handleClick} />
            { mensajeFunc?.includes("Tu eres el jugador 1. Elige X o O") ? <GameModal handleClick={handleClickModal} /> : <></>}
            {/* Aquí puedes añadir otros componentes o elementos de tu interfaz */}
        </div>
    );
}

export default App;
