import React from 'react';
import './style.css';
import CreatePostButton from '../Buttons/CreatePostButton';

function Poster() {
  return (
    <>
      <header className="poster">
        
        <div className="poster-wrapper">
          <h1 className="poster-title">
            Create your own <CreatePostButton text="story" variant="none" className="poster-story-button" />
          </h1>
          <h3 className="poster-subtitle">
            myJar is a storytelling website that gives you the freedom to explore your creativity and tell your story!
            We are a community where writers of all levels come to express themselves as they find inspiration and share
            their stories.
          </h3>
        </div>
      </header>
    </>
  );
}

export default Poster;
