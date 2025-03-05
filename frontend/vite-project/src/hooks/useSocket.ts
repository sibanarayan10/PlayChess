import { useEffect, useState } from "react";

const WS_URL="ws://localhost:8081"
export const useSocket=():WebSocket|null=>{
    
    const [socket, setSocket] = useState<WebSocket|null>(null);
    useEffect(()=>{
     const ws=new WebSocket(WS_URL);
     if(!ws){
        return;
     }
     ws.onopen=()=>{
        setSocket(ws);
     }
     ws.onclose=()=>{
        setSocket(null);
     }
    
        },[])
    return socket;    
}

