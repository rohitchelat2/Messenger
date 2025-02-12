import * as userService from "../services/userService.js"
import {hash, verify } from "scrypt"
import * as jwt from "@hono/hono/jwt"
import { setCookie } from '@hono/hono/cookie';
let secret;
const COOKIE_KEY = "auth";

if (Deno.env.get("JWT_SECRET")) {
    secret = Deno.env.get("JWT_SECRET");
  } else {
    secret = "temp";
  }

const registerUser = async (c) => {

    const body = await c.req.json();
    console.log(body.password,body.email)
   

    if (!body.password||!body.email||body.password.length<8) {
      c.status(409)
      return c.json({error: "Minimum requirement not fullfilled"});
    }


    const existingUser = await userService.findUserByEmail(body.email);
    if (existingUser.length>0) {
      c.status(409)
      return c.json({error: "A user with the email ${body.email} already exists."});
    }

    const user = {
        id: crypto.randomUUID(),
        email: body.email,
        passwordHash: hash(body.password),
      };
    
    await userService.createUser(user);

    return c.json({ data: "ok" });
  };


  const loginUser = async (c) => {
    
    const body = await c.req.json();
    const email = body.email;
    const password = body.password;
    const user = await userService.findUserByEmail(email);
    
    if(user.length === 0){
      c.status(401)
      return c.json({error: "Incorrect email ID or Password."});
    }
    const result = verify(password, user[0].password);
 
    //if result is positive create TOKEN
    if(result){
        
      const payload = {
        id: user[0].id,
      };
  

        // create the token by signing the payload
          const token = await jwt.sign(payload, secret);

          // set the token as the cookie value
          setCookie(c, COOKIE_KEY, token, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            sameSite: "lax"
          });
         return c.json({"userName":user[0].id});
        
      }

    else{c.status(401)
      return c.json({error: "Incorrect email ID or Password."});}
  
  }
  


const checkUser = async (c) =>{
     const user = c.get("jwtPayload");
     const updatedUser = await userService.findUserById(user.id);
     if(updatedUser.length===0){return 0}
     delete updatedUser[0].password;
     updatedUser[0].totalAnswered= await userService.getTotalAnseredNumber(updatedUser[0].id);
     updatedUser[0].correctAnswered= await userService.getCorrectAnseredNumber(updatedUser[0].id);

      delete updatedUser[0].id;
   
     return c.json(updatedUser[0])
}

  export {registerUser, loginUser,  checkUser}