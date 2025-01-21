import { useEffect, useState } from 'react';
import ChessBoard from '../Components/ChessBoard';
import { useSocket } from '../hooks/useSocket';
import { Chess } from 'chess.js';

const INIT_GAME = "init_game";
export const MOVE = "move";
const GAME_OVER = "game_over";

function Game() {
 interface TimeFormat{
  minute:Number,
  second:Number
 };
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [move, setMove] = useState({ from:"", to:"" });
  const [whiteTimer,setWhiteTimer]=useState<Number>(540)
  const [blackTimer,setBlackTimer]=useState<Number>(540)
  const [whiteTurn,setWhiteTurn]=useState<boolean>(true);
  const [started,setStarted]=useState(false)
  const[content,setContent]=useState<string>("Play")
  

  const [time,setTime]=useState<TimeFormat>({minute:9,second:0});

  useEffect(() => {
    const timer = setInterval(() => {
      if(started){
        if (whiteTurn) {
          setWhiteTimer((prev) => prev-1);
        } else {
          setBlackTimer((prev) => Math.max(prev - 1, 0));
        }}
    }, 1000); 
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          console.log("within init_game");
          setBoard(chess.board());
          setStarted(true);
          document.getElementsByClassName("playbutton")[0].classList.add("hidden");
          document.getElementsByClassName("movesInfo")[0].classList.remove("hidden");
          
          
          break;
        case MOVE:
          console.log("within move");
          const payload = message.payload;
          try{
          chess.move(payload.move);
          setMove(payload.move);
          setBoard(chess.board());}
          catch(e){
            alert("Invalid moves ");
          }
          setWhiteTurn(!whiteTurn);
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
      }
    };
    return () => clearInterval(timer); 

  }, [socket,whiteTurn,started]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="landingPage flex flex-col lg:flex-row h-screen w-screen bg-gray-900  bg-cover bg-center m-0 bg-[url('chessbackground.jpeg')]  ">
      {/* Left Side - Chess Board */}
      <div className="leftside w-full lg:w-4/6 h-2/3 lg:h-full overflow-hidden pb-10 flex justify-center items-center flex-col" >
      <div className="timee relative flex justify-center h-10 w-4/6 items-center  border-black ">
          <p className='absolute w-2/12 right-0 bottom-0  border-black bg-black text-white shadow-inner shadow-gray-500 hover:scale-105 rounded-lg text-center'>{`${Math.floor(blackTimer/60)}:${blackTimer%60}`}</p></div>
        <div className='border-8 border-black'><ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} setWhiteTurn={setWhiteTurn} whiteTurn={whiteTurn} /></div>
        <div className="timee relative flex justify-center h-10 w-4/6 items-center  border-black ">
          <p className='absolute w-2/12 right-0 top-0  border-black bg-black text-white shadow-inner shadow-gray-500 hover:scale-105 rounded-lg text-center'>{`${Math.floor(whiteTimer/60)}:${whiteTimer%60}`}</p></div>
      </div>

      {/* Right Side - Game Info */}
      <div className="rightside flex  justify-center items-center w-full lg:w-2/6 h-1/3 lg:h-full   p-4">
        <div className="movesInfo  border-gray-700 bg-slate-500 border-2 shadow-inner hidden  shadow-white h-3/4 w-full lg:w-4/6 text-white text-lg rounded-lg overflow-y-auto p-4 bg-transparent">
          {/* Display moves here */}
          
          
          
          <p>-red light in the box if king get checked</p>
          <p>-successful moves tracking</p>
          
          
          <p>--after all that adding more effect to the game.tsx page</p>
          <p>--you can't move opponent pieces</p>

          <p>--flip the black side for the opponent</p>

        </div>
        <button
          onClick={() => {
            if (!socket) return;
            socket.send(
              JSON.stringify({
                type: INIT_GAME,
              })
            );
            if(!started){
setContent("Connecting...");
            }
          }}
          className="playbutton bg-green-500 h-12 w-full lg:w-3/4 mt-4  overflow-visible text-white font-bold text-2xl shadow-inner shadow-gray-100 transition-all duration-200"
        >
         {content}
        </button>
      </div>
    </div>
  );
}

export default Game;
