import {WebSocketServer} from "ws";
import { GameManager } from "./GameManager";
import jwt from "jsonwebtoken";
const wss = new WebSocketServer({ port: 8081 });
const manager=new GameManager();

wss.on("connection",(ws,req)=>{
    manager.addUser(ws);
    const params = new URLSearchParams(req.url?.split("?")[1]);
    const token = params.get("token");
    if(token){
    const user =jwt.verify(token,"a3f9b9e4c1b8d2f7e4a8c9b5e3d6a7c1f8e2d3b6c9f7a4e5b2d6f3c8a9e1b7d2");
    }

    (ws as any).user=false;
     ws.on("close",()=>manager.removeUser(ws));
})