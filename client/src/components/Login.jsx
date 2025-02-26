
import  { useState, useEffect } from "react";
import {login} from "../api/userApi"
import { useNavigate } from "react-router-dom";
//import {socket} from "../Socket"

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("userID")){
      navigate("/chat");
    
    
    }
    },[navigate]);


  const  sendLoginDetails =async (e) => {
    e.preventDefault(); 
    const response = await login(emailInput, passwordInput)
  
    if(response.username){
    localStorage.setItem("userID", response.userID);
    localStorage.setItem("userName", response.username);
    setEmailInput("");
    setPasswordInput("");
    navigate("/chat");
    }
  };

  return (
    <div className="login-container">
      <h3>Login</h3>
      <div className="text-button"> <div>Already have an account </div><button className="small-button" onClick={()=>{navigate("/register");}}>Register</button></div>   
      <div className="input-container">
        <input type="text" value={emailInput} placeholder="Email" onChange={(e) => setEmailInput(e.target.value)}  />
      </div>
      <div className="input-container">
        <input type="password" value={passwordInput} placeholder="Password"  onChange={(e) => setPasswordInput(e.target.value)}  />
        </div>

      <button onClick={sendLoginDetails}>Login</button>
    </div>
  );
}

export default Login;