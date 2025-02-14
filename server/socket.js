//import * as messageService from "../services/messageService.js"
import * as userService from "./services/userService.js"
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import * as jwt from "@hono/hono/jwt"
import * as messageController from "./controllers/messageController.js"
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
    const senderID = jwtPayload.id;
    await userService.updateSocket(senderID, socket.id);
    console.log(`User connected: ${socket.id}`);
    
    
        // Listen for new messages
    socket.on("sendMessage", async (message, recieverID) => {
          console.log(`User ${senderID} sent message:${message} to ${recieverID} `);
          const response = await messageController.storeMessage(senderID, recieverID, message);
          console.log(response);
          if(response.recieverSocket)
            {
                      io.to(recieverSocket).emit("receiveMessage", senderID, message);}
          //io.emit("receiveMessage", message, socket.id); // Broadcast to all clients
    });
  
 


      // Handle disconnection
      socket.on("disconnect", () => {
        //Delete the socket from the database;
       console.log(`User ${socket.id} disconnected`);
              
    });
})};



  export {io, setupSocket}