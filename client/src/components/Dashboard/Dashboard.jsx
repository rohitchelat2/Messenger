
//import  { useState, useEffect } from "react";
//import {getMessages} from "../api/messageApi"
import {socket} from "../../Socket"
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../Contacts/Contacts";
import Chat from "../Chat/Chat";
//import {getContacts} from "../../api/contactApi"
import {logout} from "../../api/userApi"
//CSS imports
import './Dashboard.css'
import { getAllConversations } from "../../api/conversationApi";



function Dashboard() {
 // const [contacts, setContacts] = useState([]);
  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    if(localStorage.getItem("userID")===null){
      navigate("/login")
    }
/*
    getContacts().then((data) => {
      setContacts(data);
    });*/

    getAllConversations().then((data) => {console.log(data); setConversations(data);});
    
    

  
  }, []);

  useEffect(() => {
    socket.connect();
    // Connection established
    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
      setConnectionError(null);
    });

    // Connection error
    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
      setConnectionError(error.message);
    });

    // Disconnected
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    // Reconnected
    socket.on("reconnect", () => {
      console.log("Reconnected to server");
      setIsConnected(true);
      setConnectionError(null);
    });

    // Cleanup event listeners on unmount
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("reconnect");
    };
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
      console.log(newMessage)

      /* if (Notification.permission === "granted") {
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
            
              };*/
    
    };
     socket.on("receiveMessage", onRecieve);
     return () => {
      socket.off("receiveMessage", onRecieve);
   };
  }, []);
  

  const selectConversations = (e) => {
    const conversation = conversations.find((conversation) => conversation.id === e.target.id);
   
    setSelectedConversation(conversation)
  }


const addSentMessage = (newMessage) => {
  console.log(newMessage)
 /* setContacts(contacts.map(c => 
    c.id === newMessage.receiver
        ? { ...c, messages: [newMessage, ...c.messages] } 
        : c));
  
  setSelectedContact({...selectedContact, messages: [ newMessage, ...selectedContact.messages] })*/
      
      
      };
  
  const callLogout =async () => {
          await logout();
          localStorage.clear();
          setContacts("")
          setSelectedConversation("")
          navigate("/login")
        }

  return (
    <div className="container-dashboard" >
 {/*<div className='contact-column'> 
         
            <Contacts conversations={conversations} selectConversations={selectConversations}  callLogout={callLogout}/>
        </div>
        <div className='chat-column'>
            {selectedConversation &&  
            <Chat selectedConversation={selectedConversation} addSentMessage={addSentMessage}/>}
        </div>*/}
      </div>
   
  );
}

export default Dashboard;