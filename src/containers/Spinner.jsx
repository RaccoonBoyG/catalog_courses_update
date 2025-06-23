import React from 'react';

const Spinner = ({ height = '350px' }) => {
  return (
    <div
      className="d-flex flex-row justify-content-center align-items-center "
      style={{ width: '100%', height }}
    >
      <div className="u-preloader-mini">
        <svg
          className="u-preloader-mini-container"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="23" stroke="#1E4391" strokeWidth="2" />
          <circle
            className="u-preloader-mini-dot"
            cx="6.5"
            cy="6.5"
            r="6.5"
            fill="#1E4391"
          />
        </svg>
      </div>
    </div>
  );
};

export default Spinner;
