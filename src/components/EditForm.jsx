import React from 'react';
import close from '../assets/close.png';


const EditForm = (props) => {
  const pageStyle = props.displayEdit ? 'flex' : 'none';


  return (
    <div id="MarketForm" style={{display: pageStyle}}>
      <form action="">
        <h1>Edit Market</h1>
        <div className="double">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Category" />
        </div>
        <input type="text" placeholder="Address" />
        <div className="image-fields">
          <input type="text" placeholder="Image URL 1" />
          <input type="text" placeholder="Image URL 2" />
          <input type="text" placeholder="Image URL 3" />
        </div>
        <textarea type="text" placeholder="description" />

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