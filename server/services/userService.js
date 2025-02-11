import {sql} from "../database/database.js"

const createUser = async (user) => {
    
  await sql`INSERT INTO users
  (id, email, password)
    VALUES (${user.id}, ${user.email}, ${user.passwordHash})`;
  };
  
  const findUserByEmail = async (email) => {
    return await sql`SELECT * FROM users WHERE email =${email}`
  };

  const findUserById = async (id) => {
    return await sql`SELECT * FROM users WHERE id =${id}`
  };
  


   
  export { createUser, findUserByEmail, findUserById   };