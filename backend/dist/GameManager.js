"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const Message_1 = require("./Message");
class GameManager {
    constructor() {
        this.games = [];
        this.users = [];
        this.user = null;
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users.filter((user) => user !== socket);
    }
    addHandler(socket) {
        console.log("within the add handler");
        socket.on("message", (message) => {
            const msg = JSON.parse(message.toString());
            if (msg.type === Message_1.INIT_GAME) {
                if (this.user) {
                    console.log("1st person");
                    const game = new Game_1.Game(this.user, socket);
                    this.games.push(game);
                    this.user = null;
                }
                else {
                    console.log("2nd person");
                    this.user = socket;
                }
            }
            if (msg.type === Message_1.MOVE) {
                const game = this.games.find(game => game.player1 == socket || game.player2 == socket);
                if (game) {
                    game.makeMove(socket, msg);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
