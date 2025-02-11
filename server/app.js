import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
//import { serve } from "https://deno.land/std/http/server.ts";
import * as messageController from "./controllers/messageController.js"
import * as authController from "./controllers/authController.js"

import { jwt } from "@hono/hono/jwt";
//const messages = [""];
const users = new Map();


let secret;

if (Deno.env.get("JWT_SECRET")) {
    secret = Deno.env.get("JWT_SECRET");
  } else {
    secret = "temp";
  }


const io = new Server();
const app = new Hono();
app.use("/*", cors());
app.use("/*", logger());
//app.use("/message/*", jwt({secret: secret, }));
app.get("/", (c) => c.json({ message: "Hello world!2" }));


// WebSocket Connection
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    const cookieHeader = socket.handshake.headers.cookie || "";
    console.log(cookieHeader)


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
});


app.post("/api/register", authController.registerUser);
app.post("/api/login", authController.loginUser);
app.get("/api/message/get", messageController.getMessages);
app.post("/api/message/send", (c) => {

  const {response , socketId} =  messageController.storeMessage(c);

  if (socketId) {
    // Send message directly if user is online
    io.to(socketId).emit("notification", { message });
    
  }
  return c.json(response);
})

const handler = io.handler(async (req) => {
    return await app.fetch(req) || new Response(null, { status: 404 });
  });

  Deno.serve({
    handler,
    port: 8000,
  });