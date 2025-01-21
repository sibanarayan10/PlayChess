import { WebSocket, WebSocketServer } from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./Message";

export class GameManager {
    private games: Game[];
    private user: WebSocket | null;
    private users: WebSocket[];
    constructor() {
        this.games = [];
        this.users = [];
        this.user = null;
    }
    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket: WebSocket) {
        this.users.filter((user) => user !== socket);
    }
    addHandler(socket: WebSocket) {

        socket.on("message", (message) => {
            const msg = JSON.parse(message.toString());


            if (msg.type === INIT_GAME) {
                if (this.user) {
                    const game = new Game(this.user, socket);
                    this.games.push(game);
                    this.user = null;
                }


                else {
                    this.user = socket;
                }
            }
            if (msg.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, msg.payload.move);
                }
            }
        })
    }
}