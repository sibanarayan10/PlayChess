import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface SocketProviderProps {
  children: React.ReactNode;
  }
interface socketContext{
  socket:WebSocket|null,
  setUrl:Dispatch<SetStateAction<string>>,
  user:boolean,
  setUser:Dispatch<SetStateAction<boolean>>
}  
export const SocketContext = createContext<socketContext>({ socket: null,setUrl:()=>{},setUser:()=>{},user:false });

export const SocketProvider:React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [url,setUrl]=useState("ws://localhost:8081");
  const [user,setUser]=useState(false)


  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket Connected");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      setSocket(null);
    };

    return () => {
      ws.close(); 
    };
  }, [url]);
  const contextValue = { socket, setUrl, setUser, user };
  console.log(socket,user);
  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};


