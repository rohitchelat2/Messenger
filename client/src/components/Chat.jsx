// client/src/Chat.js
import  { useState, useEffect } from "react";
import PropTypes from 'prop-types';
//import {getMessages} from "../api/messageApi"
import {socket} from "../Socket"
//import Contacts from "./Contacts";




function Chat({selectedContact}) {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");

  const [input, setInput] = useState("");
  //const navigate = useNavigate();

  useEffect(() => {
    setName(selectedContact.username);
    setMessages(selectedContact.messages);

  }, [selectedContact]);

  const sendMessage = () => {
    //sendMessage(input);
    socket.emit("sendMessage", input, selectedContact.id);
    setInput("");
  };


  return (
    <div>
    
    {name}
      {messages.length>0 &&
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message} from {msg.sender}</div>
        ))}
      </div>}
      <div className="chat-input-container">
        <input className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="chat-input-button" onClick={sendMessage}>&#x2794;</button>
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
};


export default Chat;