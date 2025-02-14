import {sql} from "../database/database.js"

const createUser = async (user) => {
    
  await sql`INSERT INTO users
  (id, email, username, password)
    VALUES (${user.id}, ${user.email}, ${user.username},${user.passwordHash})`;
  };
  
  const findUserByEmail = async (email) => {
    return await sql`SELECT * FROM users WHERE email =${email}`
  };

  const findUserById = async (id) => {
    return await sql`SELECT * FROM users WHERE id =${id}`
  };
  

  const getAllUsers = async () => {
    return await sql`SELECT id, email, username FROM users`
  };

  const updateSocket = async (id, socket_id) => {
    await sql`UPDATE users SET socket_id = ${socket_id} WHERE id = ${id}`
  };

  const getSocket = async (id) => {
     const result = await sql`SELECT socket_id FROM users WHERE id =${id}`
     return result[0].socket_id;
  };

   
  export { createUser, findUserByEmail, findUserById,getAllUsers, getSocket, updateSocket   };