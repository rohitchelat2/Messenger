import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import * as messageController from "./controllers/messageController.js"
import * as authController from "./controllers/authController.js"
import * as socketController from "./controllers/socketController.js"

import { jwt } from "@hono/hono/jwt";
import { socketConnection } from "./controllers/socketController.js";
//const messages = [""];
const users = new Map();


let secret;

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


const app = new Hono();

//middlewares
app.use("/*", cors({origin: 'http://localhost:5173', credentials: true,}));
app.use("/*", logger());



//Controllers
//app.use("/message/*", jwt({secret: secret, }));
app.get("/", (c) => c.json({ message: "Hello world!2" }));
io.on("connection", socketController.socketConnection); // WebSocket Connection


app.post("/api/register", authController.registerUser);
app.post("/api/login", authController.loginUser);
app.get("/api/message/get", messageController.getMessages);
app.post("/api/message/send", (c) => {

  const {response , socketId, message } =  messageController.storeMessage(c);

  // Send message directly if user is online
  if (socketId) {  
    io.to(socketId).emit("notification", { message });  
  }
  return c.json(response);
})

const handler = io.handler(async (req) => {
    return await app.fetch(req) || new Response(null, { status: 404 });
  });

  Deno.serve({ handler, port: 8000, });