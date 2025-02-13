
//import  { useState, useEffect } from "react";
import {getMessages} from "../api/messageApi"
import {socket} from "../Socket"
import Contacts from "./Contacts";
import  { useState, useEffect } from "react";
import Chat from "./Chat";
import {getContacts} from "../api/contactApi"

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {

    socket.connect();
    getContacts().then((data) => {
      setContacts(data);
    });
   
    
    //getMessages("userID",connectID).then((data) => {setMessages(data)});
   
    
     socket.on("receiveMessage", onRecieve);
     return () => {
       socket.off("receiveMessage", onRecieve);
     
   };
  
  }, []);

  //const navigate = useNavigate();

  const [connectID, setConnectID] = useState("");
  const [connectName, setConnectName] = useState("");



  const selectContact = (id, name) => {
    setConnectID(id);
    setConnectName(name);
  }

  return (
    <div>
      <Contacts selectContact={selectContact} />
      <Chat connectID={connectID} connectName={connectName}/>
    </div>
  );
}

export default Dashboard;