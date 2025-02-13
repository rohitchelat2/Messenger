
import  { useState } from "react";
import {login} from "../api/userApi"
import { useNavigate } from "react-router-dom";
import {socket} from "./Socket"

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();


  const  sendLoginDetails =async (e) => {
    e.preventDefault(); 
    const response = await login(emailInput, passwordInput)
  
    if(response.userName){
    socket.connect();
    setEmailInput("");
    setPasswordInput("");
    navigate("/chat");
    }
  };

  return (
    <div>
      <input type="text" value={emailInput}  onChange={(e) => setEmailInput(e.target.value)}  />
      <input type="password" value={passwordInput}  onChange={(e) => setPasswordInput(e.target.value)}  />

      <button onClick={sendLoginDetails}>Login</button>
    </div>
  );
}

export default Login;