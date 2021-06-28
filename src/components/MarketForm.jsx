import React, { useState } from 'react';
import close from '../assets/close.png';


const MarketForm = (props) => {
  const pageStyle = props.displayForm ? 'flex' : 'none';
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [warning, setWarning] = useState('');
  const API_KEY = 'AIzaSyB9fPxImS5O61BRAAIK5_fjtwBRHPucAWQ';
  const GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
  // const REVERSE_GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.editDetails.geolocation.lat},${props.editDetails.geolocation.long}&key=${API_KEY}`;


  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  }

  const handleDescChange = (e) => {
    setDescription(e.target.value);
  }

  const handleImg1 = (e) => {
    setImg1(e.target.value);
  }
  
  const handleImg2 = (e) => {
    setImg2(e.target.value);
  }

  const handleImg3 = (e) => {
    setImg3(e.target.value);
  }

  const resetInputs = () => {
    setName('');
    setCategory('');
    setAddress('');
    setDescription('');
    setImg1('');
    setImg2('');
    setImg3('');
  }

  const prepareBody = async () => {
    setWarning('Loading . . . . .');

    // little validation
    if (!name) {
      setWarning('*Enter a valid Name');
      return { 'valid': false }
    }
    else if (!category) {
      setWarning('*Enter a valid Category');
      return { 'valid': false }
    }
    else if (!(address.length > 5)) {
      setWarning('*Enter a valid Address');
      return { 'valid': false }
    }
    else if (!description) {
      setWarning('*Enter a valid Description');
      return { 'valid': false }
    }


    try {
      const raw = await fetch(GEOCODE_API);
      const response = await raw.json();
      const { lat, lng } = response.results[0].geometry.location;

      const body = {
        'name': name,
        'foodCategory': category,
        'description': description,
        'images': [img1, img2, img3],
        'geolocation': {
          'lat': lat,
          'long': lng
        }
      }

      resetInputs();
      return { 'valid': true, 'body': body };
    }
    catch(error) {
      alert('An error occured !');
      return { 'valid': false };
    }
  }



  return (
    <div id="MarketForm" style={{display: pageStyle}}>
      <form action="">
        <h1>Create Market</h1>
        <div className="double">
          <input 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e) => handleNameChange(e)}
          />
          <input 
            type="text" 
            placeholder="Category" 
            value={category}
            onChange={(e) => handleCategoryChange(e)}
          />
        </div>
        <input 
          type="text" 
          placeholder="Address" 
          value={address}
          onChange={(e) => handleAddressChange(e)}
        />
        <div className="image-fields">
          <input 
            type="text" 
            placeholder="Image URL 1"
            value={img1}
            onChange={(e) => handleImg1(e)} 
          />
          <input 
            type="text" 
            placeholder="Image URL 2"
            value={img2}
            onChange={(e) => handleImg2(e)} 
          />
          <input 
            type="text" 
            placeholder="Image URL 3"
            value={img3}
            onChange={(e) => handleImg3(e)} 
          />
        </div>
        <textarea 
          type="text" 
          placeholder="description" 
          value={description}
          onChange={(e) => handleDescChange(e)}
        />
        <p>{warning}</p>

        <button 
          type="submit"
          onClick={async (e) => props.handleCreate(e, prepareBody())}
          // onClick={async (e) => prepareBody(e)}
          >
          Save
        </button>
        <img 
          className="form-close" 
          src={close}
          alt="X"
          onClick={() => props.handleShowForm(false)} 
        />
      </form>
    </div>
  );
}
 
export default MarketForm;