import { WebSocket, WebSocketServer } from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./Message";
import {Pool} from 'pg'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const pool=new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'mpgadmin001',
    database: 'chess',
    port:5432


})
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

        socket.on("message",async(message) => {
        const msg = JSON.parse(message.toString());
           
            if(msg.type ==="register"){
                console.log(msg);
                const{username,email,password}=msg.payload;
                const query=  "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *";
                const saltRound=10;
                const hashedPw=await bcrypt.hash(password,saltRound);
                try{
                    const newuser=await pool.query(query,[username, email, hashedPw])
                    console.log(newuser.rows[0]);
                    socket.send(JSON.stringify({
                        type:"register",
                        payload:{
                            msg:"success"
                        }
                    }))

                }catch(error){
                    socket.send(JSON.stringify({
                        type:"register",
                        payload:{
                            msg:error
                        }
                    }))
                }
            } 
            if (msg.type === "login") {
                const { email, password } = msg.payload;
            
                const query = "SELECT email, password FROM users WHERE email = $1";
                const JWT_SECRET="a3f9b9e4c1b8d2f7e4a8c9b5e3d6a7c1f8e2d3b6c9f7a4e5b2d6f3c8a9e1b7d2";
            
                try {
                    const userResult = await pool.query(query, [email]);
            
                    if (userResult.rows.length === 0) {
                        throw new Error("User not found!");
                    }
            
                    const user = userResult.rows[0];
                    const hashedPw = user.password;
            
                    const match = await bcrypt.compare(password, hashedPw);
                    if (!match) {
                        throw new Error("Incorrect password!");
                    }
            
                    const token = jwt.sign(
                        { email: user.email }, 
                        JWT_SECRET, 
                        { expiresIn: "1h" } 
                    );
            
                    socket.send(JSON.stringify({
                        type: "login",
                        payload: {
                            msg:"Login Successful",
                            user: user.email,
                            token: token
                        }
                    }));
                } catch (error:any) {
                    console.error("Error while retrieving data from the DB:", error.message);
            
                    socket.send(JSON.stringify({
                        type: "login",
                        payload: {
                            msg: error.message
                        }
                    }));
                }
            }
            if(!msg.user){
                socket.send(JSON.stringify({
                    type: "Authentication",
                    payload: {
                        msg: "Please login first",
                        
                        }
                }))
                return;
            }
            if (msg.type === INIT_GAME) {

                if (this.user){
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