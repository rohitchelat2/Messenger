
import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import {getAllConversations} from "./controllers/conversationController.js"
import {registerUser, loginUser, logoutUser} from "./controllers/authController.js"
import * as contactController from "./controllers/contactController.js"
import {io, setupSocket} from "./socket.js"

const ORIGIN = Deno.env.get("ORIGIN")



const app = new Hono();

//middlewares
app.use(
  "/*",
  cors({
    origin: ORIGIN,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowHeaders: ["Content-Type", "Authorization"], 
    credentials: true,
  })
);
app.use("/*", logger());
//app.use("/api/message/*", jwt({secret: secret, }));


//Controllers

app.get("/", (c) => c.json({ message: "Server working" }));
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);
app.get("/api/logout", logoutUser);
//app.get("/api/message/get", messageController.getMessages);
app.get("/api/conversation/get", getAllConversations);


setupSocket(); //setup socket connection

const handler = io.handler(async (req) => {
    return await app.fetch(req) || new Response(null, { status: 404 });
  });

  Deno.serve({ handler, port: 8000, });