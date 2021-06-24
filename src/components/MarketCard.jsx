import React from 'react';
import category from '../assets/category.png';
import location from '../assets/location.png';


const MarketCard = (props) => {
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
          {props.address}
        </h2>
      </div>
    </div>
  );
}

export default MarketCard;