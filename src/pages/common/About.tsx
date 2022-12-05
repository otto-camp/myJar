import React from 'react';
import Navi from '../../layouts/Navi';
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
        typeSection='About'
        typeTag={['About','Blog','Professional Blog','Enjoyment','myJar']}
      />
      <Navi />
      <div className="display-2">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, deleniti nemo consectetur fuga, suscipit
        excepturi vitae quia earum dignissimos rerum eos dicta ab porro ducimus fugiat. Aut quod ducimus itaque
        delectus, saepe voluptatum accusantium aliquid optio, quis ipsum perspiciatis dolores.
      </div>
      Welcome To myJar is a ProfessionalBlog Platform. Here we will provide you only interesting content, which you will
      like very much. Were dedicated to providing you the best of Blog, with a focus on dependability and Easy to use
      blog website Were working to turn our passion for blog into a booming text-online website We hope you enjoy our
      Blog as much as we enjoy offering them to you. I will keep posting more important posts on my Website for all of
      you. Please give your support and love. Thanks For Visiting Our Site Have a nice day!
    </>
  );
}

export default About;
