// client/src/Chat.js
import  { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './Chat.css'
//import {getMessages} from "../api/messageApi"
import {socket} from "../../Socket"
//import Contacts from "./Contacts";
const userID = localStorage.getItem("userID");


function Chat({selectedContact, addSentMessage}) {
  const [messages, setMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState([]);
  const [name, setName] = useState("");

  const [input, setInput] = useState("");
  //const navigate = useNavigate();

  useEffect(() => {
    setName(selectedContact.username);
    setMessages(selectedContact.messages);
  }, [selectedContact]);
  
  useEffect(() => {
    const groupByDate= messages.reduce((acc, obj) => {
     
      const date = new Date(obj.time).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(obj);
      return acc; }, {});
      setGroupedMessages(groupByDate);

  }, [messages]);


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
      <div className="messages-container">
      {messages.length>0 &&
      <div className="messages">
        {Object.keys(groupedMessages).map((date) => (
          <div key={date} className="date-container"> 
          {groupedMessages[date].map((msg, index) => (
          <div className={userID===msg.sender?"message messages-right":"message"} key={index}>
          {msg.message}
          <div className="message-time">{new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          </div>
        ))}<div className="date-bubble">{date}</div>
      </div>))}</div>}</div>
      <div className="chat-input-container">
      <div className="chat-input-box">

        <input className="chat-input" value={input}  onChange={(e) => setInput(e.target.value)}  />
        <button className="chat-input-button" onClick={sendMessage}>&#x2794;</button>
      </div>

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