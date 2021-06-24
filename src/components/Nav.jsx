import React from 'react';
import logo from '../assets/logo.svg';


const Nav = (props) => {
  return (
    <div id="Nav">
      <div className="logo">
        <img src={logo} alt="" />
        <h1>Market Bank</h1>
      </div>
      <form action="" className="search-container">
        <div className="top">
          <input type="text" placeholder="Find market " />
          <button type="submit"><i className="fas fa-search"></i></button>
        </div>
        <div className="bottom">
          <div>name</div>
          <div>category</div>
          <div>location</div>
        </div>
      </form>
      <div className="nav-buttons">
        <i 
          className="fas fa-sign-in-alt"
          onClick={() => props.handleShowLogin(true)}
        />
      </div>
    </div>
  );
}

export default Nav;