// client/src/Chat.js
//import  { useState, useEffect } from "react";
import PropTypes from 'prop-types';

//css imports
import ListGroup from 'react-bootstrap/ListGroup';



function Contacts({contacts, selectContact}) {
  return (
    <ListGroup variant="flush">
      <div>
        {contacts.map((contact, index) => (
          <ListGroup.Item className="d-flex justify-content-between align-items-start" key={index} id={contact.id} onClick={selectContact}>{contact.username}</ListGroup.Item>
        ))}
      </div>
      </ListGroup> 
   
  );
}


Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  selectContact: PropTypes.func.isRequired,
};

export default Contacts;
