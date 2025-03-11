//import * as messageService from "../services/messageService.js"
import * as userService from "./services/userService.js"
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import * as jwt from "@hono/hono/jwt"
import * as messageController from "./controllers/conversationController.js"
import {users,conversations} from "./database/database.js"
import { ObjectId } from "mongo";
let secret;
const COOKIE_KEY = "auth";
const origin = Deno.env.get("ORIGIN")

if (Deno.env.get("JWT_SECRET")) {
    secret = Deno.env.get("JWT_SECRET");
  } else {
    secret = "temp";
  }


// CORS
const io = new Server( {
  cors: {
    origin: origin, 
    methods: ["GET", "POST"],
    credentials: true, 
  },
});

const setupSocket = () => {
  io.on("connection", async (socket) =>
{
  console.log(`User ${socket.id} connecting`);
    const cookieHeader = socket.handshake.headers.get("cookie"); 
    console.log(cookieHeader)
    if (!cookieHeader) {
      console.log("cookie not found")
      return;
    }
    console.log("cookie found")
    const cookies = Object.fromEntries( cookieHeader.split("; ").map((c) => c.split("="))   );
    const token = cookies[COOKIE_KEY];
    const jwtPayload = await jwt.verify(token, secret);
    const senderId = jwtPayload.id;
    
    
    //await users.update(senderID, socket.id);
    await users.updateOne(
      { _id: new ObjectId(senderId) },
      { $set: {socketId: socket.id} },
    );
    console.log(`User ${socket.id} connected`);
    
    
    socket.on("sendMessage", async (message, conversationId) => {

      const timestamp = Date.now(); 
      const random = Math.floor(Math.random() * 1e6); 
           message.id =  `${timestamp}${random}`
          const result = await conversations.updateOne({_id: new ObjectId(conversationId)},  { $push: { messages: message } });
          console.log(result)
          const messagePack = response.result;
         /* if(response.recieverSocket)
            {
                      io.to(response.recieverSocket).emit("receiveMessage", {messagePack});}*/

        
    });
  
 


      // Handle disconnection
      socket.on("disconnect", async () => {
        try {
          // Remove the socket ID from the user document
          const result = await users.updateOne(
            { socketId: socket.id }, 
            { $unset: { socketId: "" } } 
          );
    
          if (result.modifiedCount > 0) {
            console.log(`Socket ID ${socket.id} removed from MongoDB`);
          } else {
            console.log(`Socket ID ${socket.id} not found in MongoDB`);
          }
        } catch (error) {
          console.log("Error removing socket ID:", error);
        }
        //Delete the socket from the database;
       console.log(`User ${socket.id} disconnected`);
              
    });
})};



  export {io, setupSocket}