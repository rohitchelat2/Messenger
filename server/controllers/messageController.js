import * as messageService from "../services/messageService.js"
import * as userService from "../services/userService.js"

import { getCookie } from  "@hono/hono/cookie";
import * as jwt from "@hono/hono/jwt"
let secret;
const COOKIE_KEY = "auth";

if (Deno.env.get("JWT_SECRET")) {
    secret = Deno.env.get("JWT_SECRET");
  } else {
    secret = "temp";
  }



const storeMessage = async (senderID,receiverID, message) => {
   

        const messagePack = {
            id: crypto.randomUUID(),
            sender_id: senderID,
            receiver_id: receiverID,
            message: message,
          };

    const result = await messageService.storeMessage(messagePack);
    const recieverSocket = await userService.getSocket(receiverID);
    return {result, recieverSocket };}
 
export {storeMessage}

