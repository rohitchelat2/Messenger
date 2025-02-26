
//import  { useState, useEffect } from "react";
//import {getMessages} from "../api/messageApi"
import {socket} from "../../Socket"
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../Contacts/Contacts";
import Chat from "../Chat/Chat";
import {getContacts} from "../../api/contactApi"

//CSS imports
import './Dashboard.css'



function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("userID")===null){
      navigate("/login")
    }

    getContacts().then((data) => {
      setContacts(data);
    });
    socket.connect();
  
  }, []);

  useEffect(() => {if (Notification.permission === "default") {
    Notification.requestPermission().then(permission => {
        console.log("Notification permission:", permission);
    });
} }, []);

  
 
  useEffect(() => {
    const onRecieve = (newMessage) => { 
      const audio = new Audio("/notification.wav");
      audio.play();


      if (Notification.permission === "granted") {
        const senderName = contacts.find(c => c.id === newMessage.messagePack.sender).username;
       const notification = new Notification("New Message", {
            body: `${senderName}: ${newMessage.messagePack.message

            }`
        });
          // Handle notification click event
          notification.onclick = () => {
            
            window.focus(); // Bring the browser tab to focus
          };
    
    }

        
     
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