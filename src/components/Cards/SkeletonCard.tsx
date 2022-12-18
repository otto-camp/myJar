import React from 'react';
import Skeleton from 'react-loading-skeleton';

function SkeletonCard() {
  return (
    <div className="d-flex flex-md-column flex-1">
      <Skeleton borderRadius={'0.375rem'} />
      <Skeleton count={5} />
    </div>
  );
}

export default SkeletonCard;
