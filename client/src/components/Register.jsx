
import  { useState } from "react";
import {register} from "../api/userApi"
import { useNavigate } from "react-router-dom";

function Register() {
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [rePasswordInput, setRePasswordInput] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const navigate = useNavigate();


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
  const checkEmail = (e) => {
    const email = e.target.value;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)&&email.length>0){
      setErrorEmail("Invalid email");
    } else {
      setErrorEmail("");
    }};

  return (
    <div className="register-container">
      <h3>Register</h3>
      
      <div className="input-container">   
        <input type="email" value={emailInput} placeholder="Email" onBlur={checkEmail} onChange={(e) => setEmailInput(e.target.value)}  /> 
        <div style={{color: "red"}}>{errorEmail}</div>
      </div>
      
      <input type="text" value={usernameInput} placeholder="Display Name" onChange={(e) => setUsernameInput(e.target.value)}  />
      
      <input type="password" value={passwordInput} placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)}  />
      
      <input type="password" value={rePasswordInput} placeholder="Re-enter password" onChange={(e) => setRePasswordInput(e.target.value)}  />

      <button onClick={sendLoginDetails}>Register</button>
    </div>
  );
}

export default Register;