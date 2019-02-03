import React from 'react';

function LoadingSpinner({ isLoading }:ILoadingSpinner) {
  if (!isLoading) { return null; }
  return (
    <div className="loading-spinner">
      <i className="fa fa-spinner fa-spin"/>
    </div>
  );
}

interface ILoadingSpinner{
  isLoading: boolean;
};

export default LoadingSpinner;