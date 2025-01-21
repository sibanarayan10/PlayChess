import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./Message";
import { Move } from "chess.js";

export class Game {

    public board: Chess;
    public player1: WebSocket;
    public player2: WebSocket;
    private  moveMade:Move|null;
    private startTime: Date;
    private moves:number;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.moveMade=null;
        this.moves=0;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "black"
            }
        }));

    }
    makeMove(socket: WebSocket,move: {
        from: string,
        to: string
    }) {
        try {
         
         
            if (this.moves%2 === 0 && socket !== this.player1) {
                console.log("early returns 1")

                return;
            }
            if (this.moves%2 === 1 && socket !== this.player2) {
                console.log("early returns 2")
                return;
            }
          this.board.move(move);
          this.moves++;
          
    } catch (e) {
            console.log("INVALID MOVE:",e);
        }

        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "black" : "white",
                }
            }))
            return;
        }
        if (this.moves % 2 === 0) {
            console.log("player1 is sending");
            
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: {move}

            }))
        } else {
            console.log("player2 is sending");
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: {move}
            }))
        }
    }


}