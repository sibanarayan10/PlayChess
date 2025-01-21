"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
// import remove
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8081 });
const manager = new GameManager_1.GameManager();
wss.on("connection", (ws) => {
    console.log("Client connected!");
    manager.addUser(ws);
    ws.on("disconnect", () => manager.removeUser(ws));
});
