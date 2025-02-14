import {sql} from "../database/database.js"

const getMessages = async (userID, ContactID) => {
  const messages = await  sql`SELECT * FROM messages WHERE (sender_id = ${userID} AND receiver_id = ${ContactID}) OR (sender_id = ${ContactID} AND receiver_id = ${userID}) ORDER BY created_at`
  return messages;
}

const storeMessage = async (messagePack) => {
  await sql`INSERT INTO messages (id, sender_id, receiver_id, message) VALUES (${messagePack.id}, ${messagePack.sender_id}, ${messagePack.receiver_id}, ${messagePack.message})`
}

  


   
  export { getMessages, storeMessage  };