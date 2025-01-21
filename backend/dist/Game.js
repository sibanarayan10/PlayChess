"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Message_1 = require("./Message");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
    }
    makeMove(socket, move) {
        try {
            if (this.board.moves.length === 0 && socket !== this.player1) {
                return;
            }
            if (this.board.moves.length === 1 && socket !== this.player2) {
                return;
            }
            this.board.move(move);
        }
        catch (e) {
            console.log("an error occurred");
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: Message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "black" : "white",
                }
            }));
            return;
        }
        if (this.board.moves.length % 2 === 0) {
            this.player1.send(JSON.stringify({
                type: move,
                payload: move
            }));
        }
        else {
            this.player2.send(JSON.stringify({
                type: move,
                payload: move
            }));
        }
    }
}
exports.Game = Game;
