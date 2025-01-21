import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { ReactNode, useState } from "react";
import { MOVE } from '../Pages/Game';

const ChessBoard = ({ chess, board, socket, setBoard, setWhiteTurn, whiteTurn }: {
    chess: Chess;
    setBoard: React.Dispatch<React.SetStateAction<({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]>>;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
    setWhiteTurn: React.Dispatch<React.SetStateAction<boolean>>;
    whiteTurn: boolean;
}) => {
    const [from, setFrom] = useState<null | Square>(null);
    const [clickedPiece, setClickedPiece] = useState({ color: "", type: "" });

    // Helper function to reset highlights
    const resetHighlights = () => {
        document.querySelectorAll('.highlight').forEach(el => {
            const element = el as HTMLElement;
            console.log(element.dataset);

            element.style.background = ""; // Reset gradient
            element.style.boxShadow = ""; // Remove shadow
            element.style.backgroundColor = (parseInt(element.dataset.row!) + parseInt(element.dataset.col!)) % 2 === 0 ? "#92400D" : "#FEF2C7";
            element.classList.remove('highlight');
        });
    };


    // Click handler
    const handleSquareClick = (squareRepresentation: Square, i: number, j: number) => {


        if (!from || chess.get(squareRepresentation).color === clickedPiece.color) {
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

                    // Apply 3D effect styles
                    if (chess.get(targetSquare)) {
                        // Prey (Red background with 3D effect)
                        element.style.background = "linear-gradient(145deg, #ff4d4d, #cc0000)";
                        element.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.5), inset 0px -2px 6px rgba(255, 255, 255, 0.3)";

                    } else {
                        // Valid move (Green background with 3D effect)
                        element.style.background = "linear-gradient(145deg, #4caf50, #2e7d32)";
                        element.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.5), inset 0px -2px 6px rgba(255, 255, 255, 0.3)";


                    }
                }
            });
        } else {
            const moveDetail = chess.get(squareRepresentation);
            console.log("movedetails are :", moveDetail)
            resetHighlights();


            socket.send(JSON.stringify({
                type: MOVE,
                payload: {
                    move: { from, to: squareRepresentation }
                },

            }));
            setWhiteTurn(!whiteTurn);
            try {
                chess.move({ from, to: squareRepresentation });
                setBoard(chess.board());
            } catch (e) {
                alert("invalid moves!")
            }
            setFrom(null);
        }
    };


    return (
        <div className="text-white">
            <div className=" overflow-hidden">
                {board.map((row, i) => (
                    <div key={i} className="flex">
                        {row.map((square, j) => {
                            const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
                            return (
                                <div
                                    onClick={() => handleSquareClick(squareRepresentation, i, j)}
                                    key={j}
                                    className="w-20 h-20 border border-gray-400 "
                                    id={squareRepresentation}
                                    data-row={i}
                                    data-col={j}
                                    style={{ backgroundColor: `${(i + j) % 2 === 0 ? "#92400D" : "#FEF2C7"}` }}
                                >
                                    <div className="w-full justify-center flex h-full">
                                        <div className="h-full justify-center flex flex-col">
                                            {square ? (
                                                <img
                                                    className="w-10 hover:scale-125 transform-translate duration-300"
                                                    src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png`}
                                                />
                                            ) : null}
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
