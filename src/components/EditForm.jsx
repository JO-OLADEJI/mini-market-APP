import React, { useState } from 'react';
import close from '../assets/close.png';


const EditForm = (props) => {
  const pageStyle = props.displayEdit ? 'flex' : 'none';
  const [name, setName] = useState(props.editDetails.name);
  const [foodCategory, setFoodCategory] = useState(props.editDetails.foodCategory);
  const [description, setDescription] = useState(props.editDetails.description);
  const [address, setAddress] = useState(`${props.editDetails.geolocation.lat}, ${props.editDetails.geolocation.long}`);
  // const [img1, setImg1] = useState(props.images[0]);
  // const [img2, setImg2] = useState(props.images[1]);
  // const [img3, setImg3] = useState(props.images[2]);
  const API_KEY = 'AIzaSyB9fPxImS5O61BRAAIK5_fjtwBRHPucAWQ';
  const GEOCODE_API = '';
  const REVERSE_GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.editDetails.geolocation.lat},${props.editDetails.geolocation.long}&key=${API_KEY}`;


  return (
    <div id="MarketForm" style={{display: pageStyle}}>
      <form action="">
        <h1>Edit Market</h1>
        <div className="double">
          <input 
            type="text" 
            placeholder="Name" 
            // value={props.editDetails.name}
          />
          <input 
            type="text" 
            placeholder="Category" 
            // value={props.editDetails.foodCategory}
          />
        </div>
        <input 
          type="text" 
          placeholder="Address" 
          // value={address}
        />
        <div className="image-fields">
          <input 
            type="text" 
            placeholder="Image URL 1" 
            // value={img1}
          />
          <input 
            type="text" 
            placeholder="Image URL 2" 
            // value={img2}
          />
          <input 
            type="text" 
            placeholder="Image URL 3" 
            // value={img3}
          />
        </div>
        <textarea 
          type="text" 
          placeholder="description" 
          // value={props.editDetails.description}
        />

        <button type="submit">Save</button>
        <img 
          className="form-close" 
          src={close}
          alt="X"
          onClick={() => props.handleShowEdit(false)} 
        />
      </form>
    </div>
  );
}
 
export default EditForm;