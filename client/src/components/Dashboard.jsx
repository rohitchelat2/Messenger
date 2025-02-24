
//import  { useState, useEffect } from "react";
//import {getMessages} from "../api/messageApi"
import {socket} from "../Socket"
import Contacts from "./Contacts";
import  { useState, useEffect } from "react";
import Chat from "./Chat";
import {getContacts} from "../api/contactApi"

//CSS imports
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


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
    <Container fluid>
      <Row>
        <Col sm={4}>

            <Contacts contacts={contacts} selectContact={selectContact} />
        </Col>
        <Col sm={8}>
            {selectedContact &&  
            <Chat selectedContact={selectedContact} addSentMessage={addSentMessage}/>}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;