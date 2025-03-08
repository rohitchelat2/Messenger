import * as userService from "../services/userService.js"
import {hash, verify } from "scrypt"
import { z } from "https://deno.land/x/zod/mod.ts";
import * as jwt from "@hono/hono/jwt"
import { deleteCookie, setCookie } from '@hono/hono/cookie';
import {users} from "../database/database.js"


let secret;
const COOKIE_KEY = "auth";

if (Deno.env.get("JWT_SECRET")) {
    secret = Deno.env.get("JWT_SECRET");
  } else {
    secret = "temp";
  }


  const userSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

const registerUser = async (c) => {
 
    const body = await c.req.json();
    
    //console.log(body.email, body.username, body.password)
   /* if (!body.password||!body.email||!body.username||body.password.length<8) {
      c.status(409)
      return c.json({error: "Minimum requirement not fullfilled"});
    }*/
    try {
      userSchema.parse(body);

            
            if (await users.findOne({email: body.email})) {
              console.log("user exists")
              c.status(409)
              return c.json({error:[{message: `A user with the email ${body.email} already exists.`}]});
            }
              
     }
    catch (e) {
      console.log(e)
      c.status(400)
      return c.json({ error: e.errors });
    }
const user = {
  //id: crypto.randomUUID(),
  email: body.email,
  username: body.username,
  password: hash(body.password),
};
try{
await users.insertOne(user);
return c.json({ data: "ok" });
}
catch (e) {
  console.log(e)
  c.status(400)
  return c.json({ error: e.errors });} 
};


  const loginUser = async (c) => {
    
    const body = await c.req.json();
    const email = body.email;
    const password = body.password;
    const user = await users.findOne({email: email})
    
    if(!user){
      c.status(401)
      return c.json({error: "1Incorrect email ID or Password."});
    }
 
    const result = verify(password, user.password);
 
    //if result is positive create TOKEN
    if(result){
      console.log(user)
      console.log()


      const payload = {   id: user._id.toString()  };
  

        // create the token by signing the payload
          const token = await jwt.sign(payload, secret);
          

          // set the token as the cookie value
          setCookie(c, COOKIE_KEY, token, {
            httpOnly: true, 
            secure: false, 
            sameSite: "None", 
            domain: new URL(c.req.url).hostname,
          });
         return c.json({"username":user.username, "userID":user._id.toString(), "data" : "ok"});
        
      }

    else{c.status(401)
      return c.json({error:[{message: "Incorrect login details"}]});}
  
  }
  


const checkUser = async (c) =>{
     const user = c.get("jwtPayload");

   
     return c.json("updatedUser[0]")
}

const logoutUser =  (c) => {
  deleteCookie(c, COOKIE_KEY);
  c.status(200);
  return c.json({ data: "Logged out" });
}

  export {registerUser, loginUser,  checkUser, logoutUser}