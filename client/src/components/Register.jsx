
import  { useState } from "react";
import {register} from "../api/userApi"
import { useNavigate } from "react-router-dom";

function Register() {
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [rePasswordInput, setRePasswordInput] = useState("");
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

  return (
    <div>
      <input type="text" value={emailInput}  onChange={(e) => setEmailInput(e.target.value)}  />
      <input type="text" value={usernameInput}  onChange={(e) => setUsernameInput(e.target.value)}  />
      <input type="password" value={passwordInput}  onChange={(e) => setPasswordInput(e.target.value)}  />
      <input type="password" value={rePasswordInput}  onChange={(e) => setRePasswordInput(e.target.value)}  />

      <button onClick={sendLoginDetails}>Register</button>
    </div>
  );
}

export default Register;