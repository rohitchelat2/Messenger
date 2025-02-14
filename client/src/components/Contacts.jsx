// client/src/Chat.js
//import  { useState, useEffect } from "react";
import PropTypes from 'prop-types';





function Contacts({contacts, selectContact}) {
  return (

      <div>
        {contacts.map((contact, index) => (
          <div key={index} id={contact.id} onClick={selectContact}> {contact.username}</div>
        ))}
      </div>
      
   
  );
}


Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  selectContact: PropTypes.func.isRequired,
};

export default Contacts;
