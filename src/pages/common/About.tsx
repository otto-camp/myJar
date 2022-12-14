import React from 'react';
import ArticleSEO from '../../utils/SEO/ArticleSEO';
import './style.css';

function About() {
  return (
    <>
      <ArticleSEO
        title="About Us | myJar"
        type="article"
        description="Here we will provide you only interesting content, which you will
      like very much. We're dedicated to providing you the best of Blog"
        url="https://myjar-8ff23.web.app/about"
        typeSection="About"
        typeTag={['About', 'Blog', 'Professional Blog', 'Enjoyment', 'myJar', 'Learn']}
      />
      <h1 className="text-center display-1 fw-bold py-5">About myJar</h1>
      <p className="mx-3">
        Welcome to our blog! We are a team of writers who are passionate about sharing our thoughts, experiences, and
        expertise on a wide range of topics. Our goal is to provide valuable and informative content that will help our
        readers learn, grow, and enjoy life to the fullest.
      </p>
      <div className="min-h mx-3 d-flex flex-column">
        <h5 className="display-5 curvy-title">Share your story</h5>
        <p className="curvy-p">
          Share with the world how you are living, what you are doing, what you care about. We give you a creative space
          to explore who you are and how the world sees you.
        </p>
        <h5 className="display-5 curvy-title">Explore the blogosphere</h5>
        <p className="curvy-p">
          We have a variety of blog categories for every writer and reader. You will find something for everyone from
          fashion to lifestyle, from travel to technology - even fiction!
        </p>
        <h5 className="display-5 curvy-title">Stories that matter</h5>
        <p className="curvy-p last-curvy-p">
          Find like-minded people who share your passion and interests. Share your stories with them and get inspired by
          theirs. It is an endless conversation between all of us out there in the world - stories that matter.
        </p>
      </div>
    </>
  );
}

export default About;
