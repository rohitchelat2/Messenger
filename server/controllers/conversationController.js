
import * as messageService from "../services/messageService.js"
import * as userService from "../services/userService.js"

import { getCookie } from  "@hono/hono/cookie";
import * as jwt from "@hono/hono/jwt"
import {users, conversations} from "../database/database.js"
import { ObjectId } from "mongo";
let secret;
const COOKIE_KEY = "auth";

if (Deno.env.get("JWT_SECRET")) {
    secret = Deno.env.get("JWT_SECRET");
  } else {
    secret = "temp";
  }

const getAllConversations = async (c)=>{
  const token = getCookie(c, COOKIE_KEY);
   console.log("token"+token)
      if (!token) {
        console.log("cookie not found")
        return c.json({error: "No cookies"});
      }
      console.log("cookie found2")
      const jwtPayload = await jwt.verify(token, secret);
      const userId = jwtPayload.id;
      console.log(userId)
      const userConversations = await conversations.find({participants: userId}).toArray();
      console.log("con: "+ userConversations)
      return c.json(userConversations);   
      
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
 
export {getAllConversations, storeMessage}

