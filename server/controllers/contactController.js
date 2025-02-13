
import * as userService from "../services/userService.js"
/*import { getCookie } from  "@hono/hono/cookie";
import * as jwt from "@hono/hono/jwt"
let secret;
const COOKIE_KEY = "auth";

if (Deno.env.get("JWT_SECRET")) {
    secret = Deno.env.get("JWT_SECRET");
  } else {
    secret = "temp";
  }
*/
const getContacts = async (c) => {
    console.log("controller");
    const contacts = await userService.getAllUsers();
    return c.json(contacts);
}

export {getContacts}

