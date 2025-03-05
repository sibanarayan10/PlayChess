import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState, useMemo, useContext } from "react";
import { MOVE } from '../Pages/Game';
import { socketContext } from "../Context/Context";
import { SocketContext } from "../Context/SocketContext";

interface ChessBoardProps {
  chess: Chess;
  board: Square[][];
  setBoard: (board: Square[][]) => void;
  setWhiteTurn: (turn: boolean) => void;
  whiteTurn: boolean;
  start: boolean;
  side: Color;
}
const ChessBoard: React.FC<ChessBoardProps>  = ({ chess, board, setBoard, setWhiteTurn, whiteTurn, start, side }) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [clickedPiece, setClickedPiece] = useState({ color: "", type: "" });

  const resetHighlights = () => {
    document.querySelectorAll('.highlight').forEach(el => {
      const element = el as HTMLElement;
      element.style.background = ""; 
      element.style.boxShadow = "";
      element.style.backgroundColor = (parseInt(element.dataset.row!) + parseInt(element.dataset.col!)) % 2 === 0 ? "#92400D" : "#FEF2C7";
      element.classList.remove('highlight');
    });
  };
const {socket,user}=useContext(SocketContext);
const handleSquareClick = (squareRepresentation: Square, i: number, j: number) => {
    if (!start) return;
    console.log(side);
  
if(chess.turn() === side && chess.get(squareRepresentation).color === side) {
      resetHighlights();
      setFrom(squareRepresentation);
      setClickedPiece(chess.get(squareRepresentation));
      const possibleMoves = chess.moves({ square: squareRepresentation, verbose: true });
      console.log(possibleMoves);

      possibleMoves.forEach(move => {
        const targetSquare = move.to;
        const element = document.getElementById(targetSquare) as HTMLElement;
        if (element) {
          element.classList.add('highlight');
          if (chess.get(targetSquare)) {
            element.style.background = "linear-gradient(145deg, #ff4d4d, #cc0000)";
            element.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.5), inset 0px -2px 6px rgba(255, 255, 255, 0.3)";
          } else {
            element.style.background = "linear-gradient(145deg, #4caf50, #2e7d32)";
            element.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.5), inset 0px -2px 6px rgba(255, 255, 255, 0.3)";
          }
        }
      });
    } 
else {
      if (!from){
        console.log("from is not defined!");
        return;}
      const moveDetail = chess.get(squareRepresentation);
      console.log(from,squareRepresentation);
      console.log("movedetails are :", moveDetail);
      resetHighlights();

      socket.send(JSON.stringify({
        type: MOVE,
        payload: { move: { from, to: squareRepresentation } },
        user:user
      }));
      setWhiteTurn(!whiteTurn);
      try {
        chess.move({ from, to: squareRepresentation });
        setBoard(chess.board());
      } catch (e) {
        alert("invalid moves!");
      }
      setFrom(null);
    }
  };

  const getReversedRows = (matrix:Square[][]) => matrix.slice().reverse();

  const displayedBoard = useMemo(() => {
    return side === "b" ? getReversedRows(board) : board;
  }, [board, side]);
  return (
    <div className="text-white shadow-inner drop-shadow-lg shadow-gray-200">
      <div className="overflow-hidden">
        {displayedBoard.map((row, i:number) => (
          <div key={i} className="flex">
            {row.map((square, j:number) => {
              const squareRepresentation =side=="b"?
              String.fromCharCode(97 + j) + (i + 1) as Square:

               String.fromCharCode(97 + j) + (8 - i) as Square;
            
              return (
                <div
                  onClick={() => handleSquareClick(squareRepresentation,i,j)}
                  key={j}
                  className="w-16 h-16 border border-gray-400"
                  id={squareRepresentation}
                  data-row={i}
                  data-col={j}
                  style={{ backgroundColor: side=="b"?(i + j) % 2 === 0? "#92400D" : "#FEF2C7":(i + j) % 2 === 0?  "#FEF2C7" : "#92400D" }}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square && (
                        <img
                          className="w-10 hover:scale-125 transform duration-300"
                          src={`/${square.color === "b" ? square.type : `${square.type.toUpperCase()} copy`}.png`}
                          alt={`${square.type}`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;
