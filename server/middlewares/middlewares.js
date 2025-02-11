import * as userService from "../services/userService.js"
const adminCheck = async (c, next) => {
 
const user = c.get("jwtPayload");

const updatedUser = await userService.findUserById(user.id);

    if(updatedUser[0].admin===true){
        await next();
       
    }
    else{ console.log("Not an admin")
        c.status(401)
        return c.json({error: "You are not authenticated!"});}
    
    
};

export{adminCheck};
