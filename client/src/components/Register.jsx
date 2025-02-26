
import  { useState, useEffect } from "react";
import {register} from "../api/userApi"
import { useNavigate } from "react-router-dom";

function Register() {
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [rePasswordInput, setRePasswordInput] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem("userID")){
        navigate("/chat");
      }
      },[navigate]);

  const sendLoginDetails = async (e) => {
    e.preventDefault(); 
    if(passwordInput===rePasswordInput){
    
    const response = await register(emailInput, usernameInput, passwordInput)
      console.log(response.data)
    if(response.data==="ok"){
    setEmailInput("");
    setPasswordInput("");
    setRePasswordInput("");
    navigate("/login");}
  }
    else{console.log("Password dosen't match")}

  };
  const checkEmail = () => {
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)&&emailInput.length>0){
      setErrorEmail("Invalid email");
    } else {
      setErrorEmail("");
    }};

  const checkPassword = () => {
    if(passwordInput.length<6&&passwordInput.length>0){
      setErrorPassword("Minimum 8 characters long");
    } else if (passwordInput!==rePasswordInput && rePasswordInput.length>0) {
      setErrorPassword("Passwords don't match");
    }
    else {
      setErrorPassword("");
  }};

  const formValidate = () => {
    if(errorEmail.length>0||errorPassword.length>0||emailInput.length===0||passwordInput.length===0||rePasswordInput.length===0||usernameInput.length===0){
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="register-container">
      <h3>Register</h3>
      <p>if you already have a account then <button className="small-button" onClick={()=>{navigate("/login");}}>login</button></p>      
      <div className="input-container">   
        <input type="email" value={emailInput} placeholder="Email" onBlur={checkEmail} onChange={(e) => setEmailInput(e.target.value)}  /> 
        <div style={{color: "red"}}>{errorEmail}</div>
      </div>
      
      <div className="input-container">  
        <input type="text" value={usernameInput} placeholder="Display Name" onChange={(e) => setUsernameInput(e.target.value)}  />
      </div>

      <div className="input-container">
      <input type="password" value={passwordInput} placeholder="Password" onBlur={checkPassword} onChange={(e) => setPasswordInput(e.target.value)}  />
      <div style={{color: "red"}}>{errorPassword}</div>
      </div>
      <div className="input-container">
      <input type="password" value={rePasswordInput} placeholder="Re-enter password" onBlur={checkPassword} onChange={(e) => setRePasswordInput(e.target.value)}  />
      
      </div>
      <button onClick={sendLoginDetails} disabled={formValidate()}>Register</button>
    </div>
  );
}

export default Register;