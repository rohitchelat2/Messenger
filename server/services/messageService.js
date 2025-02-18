import {sql} from "../database/database.js"

const getMessages = async (userID, ContactID) => {
  const messages = await  sql`SELECT id, sender_id AS sender , receiver_id as receiver, message, time FROM messages WHERE (sender_id = ${userID} AND receiver_id = ${ContactID}) OR (sender_id = ${ContactID} AND receiver_id = ${userID}) ORDER BY time`
  return messages;
}

const storeMessage = async (messagePack) => {
  await sql`INSERT INTO messages (id, sender_id, receiver_id, message) VALUES (${messagePack.id}, ${messagePack.sender_id}, ${messagePack.receiver_id}, ${messagePack.message})`
  const result = await sql`SELECT id, sender_id AS sender , receiver_id as receiver, message, time FROM messages WHERE id = ${messagePack.id}`
  return result[0];
}

  


   
  export { getMessages, storeMessage  };