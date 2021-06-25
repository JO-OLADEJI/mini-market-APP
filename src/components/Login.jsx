import React, { useState } from 'react';
import close from '../assets/close.png';


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const pageStyle = props.loginPage ? 'flex' : 'none';


  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }


  return (
    <div id="Login" style={{display: pageStyle}}>
      <form action="">
        <h3>Admin</h3>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => handleEmail(e)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => handlePassword(e)}
        />

        <button 
          type="submit" 
          onClick={async (e) => props.handleLogin(e, email, password)}>
          Login
        </button>
        <img 
          className="login-close" 
          src={close} 
          alt="X"
          onClick={() => props.handleShowLogin(false)} 
        />
      </form>
    </div>
  );
}
 
export default Login;