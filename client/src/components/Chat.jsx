// client/src/Chat.js
import  { useState, useEffect } from "react";
import {getMessages} from "../api/messageApi"
import {socket} from "../Socket"
import Contacts from "./Contacts";



function Chat({connectID, connectName}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  //const navigate = useNavigate();

  useEffect(() => {


  }, []);

  const sendMessage = () => {
    //sendMessage(input);
    socket.emit("sendMessage", input, connectID);
    setInput("");
  };


  return (
    <div>
    
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

export default Chat;