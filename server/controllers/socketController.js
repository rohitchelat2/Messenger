import * as messageService from "../services/messageService.js"
import * as userService from "../services/userService.js"

const socketConnection = (socket) =>
{
    const cookieHeader = socket.handshake.headers.get("cookie"); ; //Get cookies from handshake
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("="))
  );
  const token = cookies["auth"];
  
  
  
      console.log(`User connected: ${socket.id}`);
    //add socket to database
      
     console.log(token);
      // Handle disconnection
      socket.on("disconnect", () => {
          for (const [userID, socketID] of users.entries()) {
              if (socketID === socket.id) {
                  users.delete(userID);
                  console.log(`User ${userID} disconnected`);
                  break;
              }
          }
      });
  }

  export {socketConnection}