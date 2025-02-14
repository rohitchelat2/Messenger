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

  }, []);

  const sendMessage = () => {
    //sendMessage(input);
    socket.emit("sendMessage", input, selectedContact.id);
    setInput("");
  };


  return (
    <div>
    {name}
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

    </div>
  );
}

Chat.propTypes = {
  selectedContact: PropTypes.shape({
    username: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};


export default Chat;