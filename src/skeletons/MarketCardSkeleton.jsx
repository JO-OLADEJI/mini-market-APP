import React from 'react';
import Schimmer from './Schimmer.jsx';
import SkeletonTemplate from './SkeletonTemplate.jsx';


const MarketCardSkeleton = (props) => {
  return (
    <div id="MarketCardSkeleton">
      <div className="skeleton-wrapper">
        <div className="left">
          <SkeletonTemplate type="image" />
        </div>
        <div className="right">
          <SkeletonTemplate type="title" />
          <SkeletonTemplate type="text" />
          <SkeletonTemplate type="text" />
          <SkeletonTemplate type="text" />
          <SkeletonTemplate type="title" />
          <SkeletonTemplate type="title" />
        </div>
      </div>

      <Schimmer />
    </div>
  );
}
 
export default MarketCardSkeleton;