// client/src/Chat.js
import  { useState, useEffect } from "react";
import PropTypes from 'prop-types';

//import {getMessages} from "../api/messageApi"
import {socket} from "../Socket"
//import Contacts from "./Contacts";
const userID = localStorage.getItem("userID");



function Chat({selectedContact, addSentMessage}) {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");

  const [input, setInput] = useState("");
  //const navigate = useNavigate();

  useEffect(() => {
    setName(selectedContact.username);
    setMessages(selectedContact.messages);

  }, [selectedContact]);
  
  const sendMessage = () => {
    const cleanedInput = input.trim();
    //sendMessage(input);
    if(cleanedInput !== "" )
    {
      socket.emit("sendMessage",cleanedInput , selectedContact.id);
      const newMessage = {message: cleanedInput, sender: userID, receiver: selectedContact.id, time: new Date().toISOString(), id: Math.random().toString()};
      addSentMessage(newMessage);
      setMessages([newMessage, ...messages]);
      
    setInput("");
    }
    
  };


  return (
    <div>
    
      <div className="chat-container">
      <div className="chat-header">{name}</div>
      {messages.length>0 &&
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div className={userID===msg.sender?"message messages-container-right":"message"} key={index}>{msg.message}
          <div className="message-time">{new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          </div>
        ))}
      </div>}
      <div className="chat-input-container">
        <input className="chat-input" value={input}  onChange={(e) => setInput(e.target.value)}  />
        <button className="chat-input-button" onClick={sendMessage}>&#x2794;</button>
      </div>

    </div>
    </div>
  );
}

Chat.propTypes = {
  selectedContact: PropTypes.shape({
    username: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
  ,
  addSentMessage: PropTypes.func.isRequired
};


export default Chat;