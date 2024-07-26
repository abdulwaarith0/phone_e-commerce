import React from 'react';
import { useLocation } from 'react-router-dom';

const Default: React.FC = () => {
  const location = useLocation();

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
          <div className="display-3">
            <h1>error</h1>
            <h2>page not found</h2>
            <h3>
              the requested URL
              <span className="text-danger">{location.pathname}</span> was not found
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;