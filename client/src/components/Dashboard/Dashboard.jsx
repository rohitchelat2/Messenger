
//import  { useState, useEffect } from "react";
//import {getMessages} from "../api/messageApi"
import {socket} from "../../Socket"
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../Contacts/Contacts";
import Chat from "../Chat/Chat";
import {getContacts} from "../../api/contactApi"
import {logout} from "../../api/userApi"
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
        const senderName = contacts.find(c => c.id === newMessage.messagePack.sender)?.username || "Unknown";
        const notification = new Notification("New Message", {
          body: `${senderName}: ${newMessage.messagePack.message}`
        });
    
        notification.onclick = () => window.focus(); 
      }
    
      setContacts(prevContacts => prevContacts.map(c => 
        c.id === newMessage.messagePack.sender
          ? { ...c, messages: [newMessage.messagePack, ...(c.messages || [])] }
          : c
      ));
    
      setSelectedContact(prevContact => {
        if (prevContact && prevContact.id === newMessage.messagePack.sender) {
          return { 
            ...prevContact, 
            messages: [newMessage.messagePack, ...(prevContact.messages || [])]
          };
        }
        return prevContact;
      });
    };
    
    socket.on("receiveMessage", onRecieve);
    return () => socket.off("receiveMessage", onRecieve);
  
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
  
  const callLogout =async () => {
          await logout();
          localStorage.clear();
          setContacts("")
          setSelectedContact("")
          navigate("/login")
        }

  return (
    <div className="container-dashboard" >
   
        <div className='contact-column'>
         
            <Contacts contacts={contacts} selectContact={selectContact}  callLogout={callLogout}/>
        </div>
        <div className='chat-column'>
            {selectedContact &&  
            <Chat selectedContact={selectedContact} addSentMessage={addSentMessage}/>}
        </div>
      </div>
   
  );
}

export default Dashboard;