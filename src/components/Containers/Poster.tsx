import React from 'react';
import './style.css';
import poster from '../../assets/poster.svg';

function Poster() {
  return (
    <>
      <header className="poster">
        <img src={poster} className="poster-bg" width="100%" height="100%" alt='' />
        <h1 className="poster-title">Lorem ipsum dolor sit amet consectetur.</h1>
      </header>
    </>
  );
}

export default Poster;
