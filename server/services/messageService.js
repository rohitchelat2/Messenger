import {sql} from "../database/database.js"

const getMessages = async (userID, ContactID) => {
  const messages = await  sql`SELECT * FROM messages WHERE (sender_id = ${userID} AND receiver_id = ${ContactID}) OR (sender_id = ${ContactID} AND receiver_id = ${userID}) ORDER BY timestamp`
  return messages;
}

  


   
  export { getMessages  };