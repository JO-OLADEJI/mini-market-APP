import React, { useEffect, useState } from 'react';
import close from '../assets/close.png';


const EditForm = (props) => {
  const pageStyle = props.displayEdit ? 'flex' : 'none';
  const [name, setName] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('lagos');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [warning, setWarning] = useState('');
  const API_KEY = 'AIzaSyB9fPxImS5O61BRAAIK5_fjtwBRHPucAWQ';
  const GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
  const REVERSE_GEOCODE_API = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.editDetails.geolocation.lat},${props.editDetails.geolocation.long}&key=${API_KEY}`;


  const formatAddress = async () => {
    const raw = await fetch(REVERSE_GEOCODE_API);
    const response = await raw.json();
    const address = response.results[0].formatted_address;
    setAddress(address);
  }

  useEffect(async () => {
    formatAddress();
    setName(props.editDetails.name);
    setFoodCategory(props.editDetails.foodCategory);
    setDescription(props.editDetails.description);
    setImg1(props.editDetails.images[0]);
    setImg2(props.editDetails.images[1]);
    setImg3(props.editDetails.images[2]);
  }, [props.displayEdit]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setFoodCategory(e.target.value);
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
    setFoodCategory('');
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
    else if (!foodCategory) {
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
        'foodCategory': foodCategory,
        'description': description,
        'images': [img1, img2, img3],
        'geolocation': {
          'lat': lat,
          'long': lng
        }
      }

      resetInputs();
      setWarning('');
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
        <h1>Edit Market</h1>
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
            value={foodCategory}
            onChange={(e) => handleCategoryChange(e)}
          />
        </div>
        <input 
          type="text" 
          placeholder="Address" 
          value={address}
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
          onClick={async (e) => props.handleUpdate(e, props.editDetails._id, prepareBody())}>
          Update
        </button>
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