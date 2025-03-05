import React, { useContext, useEffect, useState } from 'react';
import ChessBoard from '../Components/ChessBoard';
import { Chess } from 'chess.js';
import { SocketContext } from '../Context/SocketContext.tsx';
import SignUp from '../Components/SignUp.tsx';
import { useNavigate } from 'react-router-dom';

const INIT_GAME = "init_game";
export const MOVE = "move";
const GAME_OVER = "game_over";
function Game() {

  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [move, setMove] = useState({ from:"", to:"" });
  const [whiteTimer,setWhiteTimer]=useState(540)
  const [blackTimer,setBlackTimer]=useState(540)
  const [whiteTurn,setWhiteTurn]=useState<boolean>(true);
  const [started,setStarted]=useState<boolean>(false)
  const[content,setContent]=useState<string>("Play")
  const[side,setSide]=useState("");
  const [activeTab, setActiveTab] = useState("game");
  const[moveDetail,setmoveDetail]=useState<any>([]);
  const {socket,user}=useContext(SocketContext);
  const componentArray:React.ReactNode[]=[<Game/>,<SignUp/>];
  console.log(user,socket);
  const navigate=useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      if(started){
        if (whiteTurn) {
          setWhiteTimer((prev) =>prev-1);
        } else {
          setBlackTimer((prev) =>prev-1);
        }}
    }, 1000); 
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "Authentication":
          console.log(message.payload);
          navigate('/login');
          break;
        case INIT_GAME:
          console.log("Within init_game");
          setBoard(chess.board());
          setSide(message.payload.color);
          setStarted(true);
          document.getElementsByClassName("playbutton")[0].classList.add("hidden");
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
    <div className="flex flex-col lg:flex-row h-screen w-full items-center bg-transparent bg-cover bg-center m-0 ">
      <div className="leftside w-full lg:w-4/6 h-2/3 lg:h-full  pb-10 flex justify-center items-center flex  " >
     
       
        <div className={`py-6 relative`}>
          
        <p className='absolute w-2/12 right-0 bottom-0  border-black bg-black text-white shadow-inner shadow-gray-500 hover:scale-105 rounded-lg text-center'>{`${Math.floor(blackTimer/60)}:${blackTimer%60}`}</p>
        
        <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} setWhiteTurn={setWhiteTurn} whiteTurn={whiteTurn} start={started} side={side}/>

        <p className='absolute w-2/12 right-0 top-0  border-black bg-black text-white shadow-inner shadow-gray-500 hover:scale-105 rounded-lg text-center'>{`${Math.floor(whiteTimer/60)}:${whiteTimer%60}`}</p>
          
        </div>
      
        
      </div>

      <div className="rightside flex  justify-center items-center w-full lg:w-2/6 h-1/3 lg:h-full   p-4">
        {started&&
      <div className="flex  border-gray-700 bg-slate-500 border-2 shadow-inner shadow-white h-3/4 w-full lg:w-4/6 text-white text-lg rounded-lg overflow-y-auto p-4 bg-transparent">
  <div className="border border-gray-700 shadow-inner shadow-white rounded-lg p-4">
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("game")}
          className={`flex-1 py-2 text-lg text-white ${
            activeTab === "game" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Game
        </button>
        <button
          onClick={() => setActiveTab("player")}
          className={`flex-1 py-2 text-lg text-white ${
            activeTab === "player" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Player
        </button>
        <button
          onClick={() => setActiveTab("moves")}
          className={`flex-1 py-2 text-lg text-white ${
            activeTab === "moves" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          Moves
        </button>
      </div>

      <div className="w-full p-4 text-white">
        {activeTab === "game" && (
          <div>
            <h1 className="text-2xl">This is Game Content</h1>
            <p>Your game details here.</p>
          </div>
        )}
        {activeTab === "player" && (
          <div>
            <h1 className="text-2xl">This is Player Content</h1>
            <p>Your player details here.</p>
          </div>
        )}
        {activeTab === "moves" && (
          <div>
            <h1 className="text-2xl">This is Moves Content</h1>
            <p>{`${moveDetail[0],moveDetail[1]}`}</p>
          </div>
        )}
      </div>
    </div>

    
    </div>
    
        }
        <button
          onClick={() => {
            if (!socket) return;
            if(content!=="Play"){
              return;
            }
          
            socket.send(
              JSON.stringify({
                type: INIT_GAME,
                user :user
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
