
import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import * as messageController from "./controllers/messageController.js"
import * as authController from "./controllers/authController.js"
import * as contactController from "./controllers/contactController.js"
import {io, setupSocket} from "./socket.js"





const app = new Hono();

//middlewares
app.use(
  "/*",
  cors({
    origin: "https://messenger-rc.vercel.app",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowHeaders: ["Content-Type", "Authorization"], 
    credentials: true,
  })
);
app.use("/*", logger());
//app.use("/api/message/*", jwt({secret: secret, }));


//Controllers

app.get("/", (c) => c.json({ message: "Server working" }));
app.post("/api/register", authController.registerUser);
app.post("/api/login", authController.loginUser);
app.get("/api/logout", authController.logoutUser);
//app.get("/api/message/get", messageController.getMessages);
app.get("/api/contact/get", contactController.getContacts);


setupSocket(); //setup socket connection

const handler = io.handler(async (req) => {
    return await app.fetch(req) || new Response(null, { status: 404 });
  });

  Deno.serve({ handler, port: 8000, });