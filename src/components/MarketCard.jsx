import React, { useState } from 'react';
import category from '../assets/category.png';
import location from '../assets/location.png';


const MarketCard = (props) => {
  const buttonStyle = props.loggedIn ? 'block' : 'none';
  const [address, setAddress] = useState('');
  const API_KEY = 'AIzaSyB9fPxImS5O61BRAAIK5_fjtwBRHPucAWQ';
  // const GEOCODE_API = '';
  const REVERSE_GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.geolocation.lat},${props.geolocation.long}&key=${API_KEY}`;


  const formatAddress = async (locationObj) => {
    const raw = await fetch(REVERSE_GEOCODE_API);
    const response = await raw.json();
    const address = response.results[0].formatted_address;
    setAddress(address);
  }
  formatAddress(props.geolocation);


  return (
    <div id="MarketCard">
      <div className="images">
        <div className="images-container">
          <img src="https://weetracker.com/wp-content/uploads/2019/05/Computer-Village-phones.jpg" alt="" />
          <img src="https://www.sunnewsonline.com/wp-content/uploads/2017/10/computer-village.jpg" alt="" />
          <img src="https://techpoint.africa/wp-content/uploads/2017/05/computer-village-relocation-40-of-42.jpg" alt="" />

          {/* <img src={props.images[0]} alt="" />
          <img src={props.images[1]} alt="" />
          <img src={props.images[2]} alt="" /> */}
          <div className="shade"></div>
        </div>
      </div>
      <div className="market-details">
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <h2>
          <img src={category} alt="" /> 
          {props.category}
        </h2>
        <h2>
          <img src={location} alt="" />
          {address}
        </h2>
      </div>
      <div className="admin-btns" style={{display: buttonStyle}}>
      <p>double-click</p>
      <i 
        className="fas fa-pencil-alt"
        onDoubleClick={() => props.handleEdit(props.id)}
      />
      <i 
        className="fas fa-trash" 
        onDoubleClick={async () => props.handleDelete(props.id)}
      />
      </div>
    </div>
  );
}

export default MarketCard;