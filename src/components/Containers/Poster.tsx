import React from 'react';
import './style.css';
import poster from '../../assets/poster.svg';
import CreatePostButton from '../Buttons/CreatePostButton';

function Poster() {
  return (
    <>
      <header className="poster">
        <img src={poster} className="poster-bg" width="100%" height="100%" alt="myJar poster background" />
        <div className="poster-wrapper">
          <div>
            <h1 className="poster-title">Create your own story</h1>
            <h3 className="poster-subtitle">
              myJar is a storytelling website that gives you the freedom to explore your creativity and tell your story!
              We are a community where writers of all levels come to express themselves as they find inspiration and
              share their stories.
            </h3>
          </div>
          <div>
            <h5 className="poster-feature-title">Share your story</h5>
            <p>
              Share with the world how you are living, what you are doing, what you care about. We give you a creative
              space to explore who you are and how the world sees you.
            </p>
            <h5 className="poster-feature-title">Explore the blogosphere</h5>
            <p>
              We have a variety of blog categories for every writer and reader. You will find something for everyone
              from fashion to lifestyle, from travel to technology - even fiction!
            </p>
            <h5 className="poster-feature-title">Stories that matter</h5>
            <p>
              Find like-minded people who share your passion and interests. Share your stories with them and get
              inspired by theirs. It is an endless conversation between all of us out there in the world - stories that
              matter.
            </p>
            <CreatePostButton text="Write Stories" variant="none" className="poster-button" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Poster;
