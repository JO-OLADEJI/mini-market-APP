import React from 'react';
import logo from '../assets/logo.svg';
import lock from '../assets/lock.svg';


const Nav = (props) => {
  return (
    <div id="Nav">
      <div className="logo">
        <img src={logo} alt="" />
        <h1>Market Bank</h1>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Find market " />
        <button>name</button>
        <button>category</button>
        <button>location</button>
      </div>
      <div className="nav-buttons">
        <img src={lock} alt="login" />
      </div>
    </div>
  );
}

export default Nav;