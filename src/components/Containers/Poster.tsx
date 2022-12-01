import React from 'react';
import './style.css';
import CreatePostButton from '../Buttons/CreatePostButton';

//TODO:Add background to the poster.
function Poster() {
  return (
    <>
      <header className="poster">
        <h1 className="poster-title">
          Discover, learn, and share your{' '}
          <span className="text-danger fw-bolder border-bottom border-danger">stories</span>
        </h1>
        <CreatePostButton text="Start Writing &#8680;" variant="none" className="poster-btn" />
      </header>
    </>
  );
}

export default Poster;
