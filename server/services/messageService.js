import {sql} from "../database/database.js"

const getMessages = async (senderId, receiverId) => {
  const messages = await  sql`SELECT * FROM messages WHERE (sender_id = ${senderId} AND receiver_id = ${receiverId}) OR (sender_id = ${receiverId} AND receiver_id = ${senderId}) ORDER BY timestamp`
  return messages;
}

  


   
  export { getMessages  };