import React from 'react';
import category from '../assets/category.png';
import location from '../assets/location.png';


const MarketCard = (props) => {
  return (
    <div id="MarketCard">
      <div className="images-container">

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
          {props.address}
        </h2>
      </div>
    </div>
  );
}

export default MarketCard;