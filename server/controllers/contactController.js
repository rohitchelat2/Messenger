
import * as userService from "../services/userService.js"
import * as messageService from "../services/messageService.js"
import { getCookie } from  "@hono/hono/cookie";
import * as jwt from "@hono/hono/jwt"
let secret;
const COOKIE_KEY = "auth";

if (Deno.env.get("JWT_SECRET")) {
    secret = Deno.env.get("JWT_SECRET");
  } else {
    secret = "temp";
  }

const getContacts = async (c) => {
    const token = getCookie(c, COOKIE_KEY);
    console.log(token);
    const jwtPayload = await jwt.verify(token, secret);
    
    const userID = jwtPayload.id;

    const result = await userService.getAllUsers();
    const contacts = await Promise.all(
      result.map(async (contact) => {
          contact.messages = await messageService.getMessages(userID, contact.id);
          return contact; // 
      })
  );
   
    return c.json(contacts);
}

export {getContacts}

