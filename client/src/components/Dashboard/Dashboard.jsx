
//import  { useState, useEffect } from "react";
//import {getMessages} from "../api/messageApi"
import {socket} from "../../Socket"
import  { useState, useEffect } from "react";

import Contacts from "../Contacts/Contacts";
import Chat from "../Chat/Chat";
import {getContacts} from "../../api/contactApi"

//CSS imports
import './Dashboard.css'



function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  
  useEffect(() => {


    getContacts().then((data) => {
      setContacts(data);
    });
    socket.connect();
  
  }, []);

  //useEffect(() => {console.log(contacts) }, [contacts]);

  
 
  useEffect(() => {
    const onRecieve = (newMessage) => { 
     
      setContacts(contacts.map(c => 
        c.id === newMessage.messagePack.sender
            ? { ...c, messages: [newMessage.messagePack, ...c.messages] } 
            : c));
            if(selectedContact.id === newMessage.messagePack.sender )
              {
                
                setSelectedContact({...selectedContact, messages: [ newMessage.messagePack, ...selectedContact.messages] });
            
              };
    
    };
     socket.on("receiveMessage", onRecieve);
     return () => {
      socket.off("receiveMessage", onRecieve);
   };
  }, [contacts, selectedContact]);

  const selectContact = (e) => {
    const contact = contacts.find((contact) => contact.id === e.target.id);
   
    setSelectedContact(contact)
  }


const addSentMessage = (newMessage) => {
  setContacts(contacts.map(c => 
    c.id === newMessage.receiver
        ? { ...c, messages: [newMessage, ...c.messages] } 
        : c));};


  return (
    <div className="container-dashboard" >
   
        <div className='contact-column'>

            <Contacts contacts={contacts} selectContact={selectContact} />
        </div>
        <div className='chat-column'>
            {selectedContact &&  
            <Chat selectedContact={selectedContact} addSentMessage={addSentMessage}/>}
        </div>
      </div>
   
  );
}

export default Dashboard;