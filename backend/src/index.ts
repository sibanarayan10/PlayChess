import {WebSocketServer} from "ws";
// import remove
import { GameManager } from "./GameManager";
import cors from 'cors'

const corsConfig={
    origin:"*",
    methods:["GET","POST","PUT","PATCH"],
    credentials:true

}
// cors.config(corsConfig);
const wss = new WebSocketServer({ port: 8081 });
const manager=new GameManager();

wss.on("connection",(ws)=>{
    manager.addUser(ws);
    ws.on("disconnect",()=>manager.removeUser(ws));
})