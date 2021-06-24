import React from 'react';
import './skeletons.css';


const SkeletonTemplate = ({ type }) => {
  return (
    <div className="skeleton">
      <div className={type}></div>
    </div>
  );
}
 
export default SkeletonTemplate;