
//import  { useState, useEffect } from "react";
//import {getMessages} from "../api/messageApi"
import {socket} from "../Socket"
import Contacts from "./Contacts";
import  { useState, useEffect } from "react";
import Chat from "./Chat";
import {getContacts} from "../api/contactApi"

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  
  useEffect(() => {


    getContacts().then((data) => {
      
      setContacts(data);
    });

    socket.connect();
    
   
    
    //getMessages("userID",connectID).then((data) => {setMessages(data)});
    const onRecieve = (packet) => { console.log(packet); };
    
     socket.on("receiveMessage", onRecieve);
     return () => {
      socket.off("receiveMessage", onRecieve);
     
   };
  
  }, []);


  


  const selectContact = (e) => {
    const contact = contacts.find((contact) => contact.id === e.target.id);
    console.log(contact);
    setSelectedContact(contact)

  }

  return (
    <div>
      <Contacts contacts={contacts} selectContact={selectContact} />
      {selectedContact &&
      <Chat selectedContact={selectedContact}/>}
    </div>
  );
}

export default Dashboard;