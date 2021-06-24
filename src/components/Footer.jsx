import React from 'react';
import logo from '../assets/logo.svg';


const Footer = (props) => {
  return (
    <div id="Footer">
      <div className="footer-logo">
        <img src={logo} alt="market bank logo" />
        <h1>Market Bank</h1>
      </div>
      <div className="copyright">
        <p>Copyright &#xA9; 2021 Market bank. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;