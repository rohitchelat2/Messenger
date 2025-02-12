//import * as messageService from "../services/messageService.js"
//import * as userService from "../services/userService.js"
import * as jwt from "@hono/hono/jwt"
let secret;
const COOKIE_KEY = "auth";

if (Deno.env.get("JWT_SECRET")) {
    secret = Deno.env.get("JWT_SECRET");
  } else {
    secret = "temp";
  }

const socketConnection = async (socket) =>
{
    const cookieHeader = socket.handshake.headers.get("cookie"); ; //Get cookies from handshake
    const cookies = Object.fromEntries( cookieHeader.split("; ").map((c) => c.split("="))   );
    const token = cookies[COOKIE_KEY];
    const jwtPayload = await jwt.verify(token, secret);
    console.log(jwtPayload.id);
   
    console.log(`User connected: ${socket.id}`);
    //add socket to database
      
 


      // Handle disconnection
    socket.on("disconnect", () => {
        //Delete the socket from the database;
        console.log(`User ${userID} disconnected`);
              
    });
}

  export {socketConnection}