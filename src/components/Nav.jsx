import React, { useState } from 'react';
import logo from '../assets/logo.svg';


const Nav = (props) => {
  const [searchParam, setSearchParam] = useState('');
  const [searchCategory, setSearchCategory] = useState('name');

  // const handleSearchChange = (e) => {
  //   setSearchParam(e.target.value);
  // }

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   console.log({ searchParam, searchCategory });
  // }

  return (
    <div id="Nav">
      <div className="logo">
        <img src={logo} alt="" />
        <h1>Market Bank</h1>
      </div>

      <form action="" className="search-container">
        <div className="top">
          <input 
            type="text" 
            placeholder="Find market"
            onChange={(e) => props.handleSearchChange(e)}
            value={props.searchParam}
          />
          <button type="submit" onClick={(e) => props.handleSearchSubmit(e)}>
            <i className="fas fa-search" />
          </button>
        </div>
        <div className="bottom">
          <div 
            onClick={() => props.handleSearchCategory('name')}
            style={{
              'backgroundColor': (props.searchCategory === 'name' ? '#008737' : '#808080b0'),
              'boxShadow': (props.searchCategory === 'name' ? '0 0 10px #008736e8' : 'none')
              }}>
            name
          </div>
          <div 
            onClick={() => props.handleSearchCategory('category')}
            style={{
              'backgroundColor': (props.searchCategory === 'category' ? '#008737' : '#808080b0'),
              'boxShadow': (props.searchCategory === 'category' ? '0 0 10px #008736e8' : 'none')
              }}>
            category
          </div>
          <div 
            onClick={() => props.handleSearchCategory('location')}
            style={{
              'backgroundColor': (props.searchCategory === 'location' ? '#008737' : '#808080b0'),
              'boxShadow': (props.searchCategory === 'location' ? '0 0 10px #008736e8' : 'none')
              }}>
            location
          </div>
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