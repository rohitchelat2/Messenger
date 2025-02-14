
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
  
  }, []);

  useEffect(() => {console.log(contacts) }, [contacts]);

  
 
  useEffect(() => {


    const onRecieve = (newMessage) => { 
      console.log(contacts);
  
      setContacts(contacts.map(c => 
        c.id === newMessage.messagePack.sender_id 
            ? { ...c, messages: [...c.messages, newMessage.messagePack] } 
            : c));
            if(selectedContact.id === newMessage.messagePack.sender_id)
              {
                setSelectedContact({...selectedContact, messages: [...selectedContact.messages, newMessage.messagePack] });
            
              };
          
  
    };



     socket.on("receiveMessage", onRecieve);
     return () => {
      socket.off("receiveMessage", onRecieve);
     
   };
  
  }, [contacts, selectedContact]);


  


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