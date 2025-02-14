
//import  { useState, useEffect } from "react";
//import {getMessages} from "../api/messageApi"
import {socket} from "../Socket"
import Contacts from "./Contacts";
import  { useState, useEffect } from "react";
import Chat from "./Chat";
import {getContacts} from "../api/contactApi"

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState([]);
  
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


  const onRecieve = (packet) => { console.log(packet); };


  const selectContact = (id) => {
    const contact = contacts.find((contact) => contact.id === id);
    setSelectedContact(contact)

  }

  return (
    <div>
      <Contacts contacts={contacts} selectContact={selectContact} />
      <Chat selectedContact={selectedContact}/>
    </div>
  );
}

export default Dashboard;