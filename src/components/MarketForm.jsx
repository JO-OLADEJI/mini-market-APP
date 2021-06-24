import React from 'react';
import close from '../assets/close.png';


const MarketForm = (props) => {
  const pageStyle = props.displayForm ? 'flex' : 'none';

  return (
    <div id="MarketForm" style={{display: pageStyle}}>
      <form action="">
        <h1>Market</h1>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Category" />
        <input type="text" placeholder="Address" />
        <fieldset>
          <legend>Images</legend>
          <input type="text" placeholder="Image 1" />
          <input type="text" placeholder="Image 2" />
          <input type="text" placeholder="Image 3" />
        </fieldset>
        <textarea type="text" placeholder="description" />

        <button type="submit">Save</button>
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