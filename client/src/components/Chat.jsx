// client/src/Chat.js
import  { useState, useEffect } from "react";
import io from "socket.io-client";
import {getMessages} from "../api/messageApi"

//import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:8000",{

  withCredentials: true,
  transports: ["websocket"],
});

/*function onLogin() {
  socket.auth = "Token will come here" ;// For adding tocken
  
}*/

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  //const navigate = useNavigate();

  useEffect(() => {

   socket.connect();
   function onRecieve(message, senderId) {
      setMessages(previous => [...previous, message+" from "+senderId]);
    }

    socket.on("receiveMessage", onRecieve);
    return () => {
      socket.off("receiveMessage", onRecieve);
    
  };
  }, []);

  const sendMessage = () => {
    //sendMessage(input);
    socket.emit("sendMessage", input, "senderId");
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
      <button onClick={getMessages}>Get Messages</button>
    </div>
  );
}

export default Chat;