import React from 'react';
import close from '../assets/close.png';


const Login = (props) => {
  const pageStyle = props.loginPage ? 'flex' : 'none';

  return (
    <div id="Login" style={{display: pageStyle}}>
      <form action="">
        <h3>Admin</h3>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button type="submit">Login</button>
        <img 
          className="form-close" 
          src={close} 
          alt="X"
          onClick={() => props.handleShowLogin(false)} 
        />
      </form>
    </div>
  );
}
 
export default Login;