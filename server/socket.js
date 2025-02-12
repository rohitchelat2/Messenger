//import * as messageService from "../services/messageService.js"
//import * as userService from "../services/userService.js"
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import * as jwt from "@hono/hono/jwt"
let secret;
const COOKIE_KEY = "auth";

if (Deno.env.get("JWT_SECRET")) {
    secret = Deno.env.get("JWT_SECRET");
  } else {
    secret = "temp";
  }



const io = new Server( {
  cors: {
    origin: "http://localhost:5173", // Allow WebSocket connections from this origin
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials (e.g., cookies)
  },
});

const setupSocket = () => {
  io.on("connection", async (socket) =>
{
    const cookieHeader = socket.handshake.headers.get("cookie"); ; //Get cookies from handshake
    if (!cookieHeader) {
      console.log("No cookies found");
      return;
    }
    const cookies = Object.fromEntries( cookieHeader.split("; ").map((c) => c.split("="))   );
    const token = cookies[COOKIE_KEY];
    const jwtPayload = await jwt.verify(token, secret);
    console.log(jwtPayload.id);
   
    console.log(`User connected: ${socket.id}`);
    //add socket to database
    
        // Listen for new messages
    socket.on("sendMessage", (msg) => {
          console.log(`User ${socket.id} sent message: ${msg}`);
          io.emit("receiveMessage", msg, socket.id); // Broadcast to all clients
    });
  
 


      // Handle disconnection
      socket.on("disconnect", () => {
        //Delete the socket from the database;
       console.log(`User ${userID} disconnected`);
              
    });
})};



  export {io, setupSocket}