// client/src/Chat.js
//import  { useState, useEffect } from "react";
import PropTypes from 'prop-types';


//css imports
import './Contacts.css'


function Contacts({contacts, selectContact, callLogout}) {

  return (
    <div className='contacts-container'>
        <div className="user-card">{localStorage.getItem("userName")} <button onClick={callLogout} className='logout-button'>Logout</button></div>
        {contacts.map((contact, index) => (
          <div className="contact-card" style={{cursor:"pointer"}}key={index} id={contact.id} onClick={selectContact}>
              
              {contact.username}
              {contact.messages.length>0 && 
              <div className='d-flex justify-content-between w-100' style={{pointerEvents: "none"}}>
                <div className='w-50 text-truncate  fw-light ' style={{ fontSize: ".8rem", textAlign: "left"}}>  {contact.messages[0].message}</div>
                <div className='small fw-light' style={{ fontSize: ".8rem" }}>       
                  {new Date(contact.messages[0].time).toLocaleTimeString([], {  day: "2-digit", 
                            month: "2-digit",  
                            hour: "2-digit", 
                            minute: "2-digit"  })}    </div>
              </div>}
          </div>
        ))}
      </div>
     
   
  );
}


Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  selectContact: PropTypes.func.isRequired,
  callLogout: PropTypes.func.isRequired,
};

export default Contacts;
