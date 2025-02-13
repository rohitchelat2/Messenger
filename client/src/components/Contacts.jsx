// client/src/Chat.js
import  { useState, useEffect } from "react";
//import PropTypes from 'prop-types';
import {getContacts} from "../api/contactApi"




function Contacts({selectContact}) {
  const [contacts, setContacts] = useState([]);
  //const [input, setInput] = useState("");
  //const navigate = useNavigate();

  useEffect(() => {

    getContacts().then((data) => {
      setContacts(data);
    });
  }, []);



  return (

      <div>
        {contacts.map((contact, index) => (
          <div key={index} id={contact.id} onClick={selectContact(contact.id,contact.email)}> {contact.email}</div>
        ))}
      </div>
      
   
  );
}


export default Contacts;
