import React from 'react';
import './home.css';
import { Container } from 'react-bootstrap';
import Navi from '../../layouts/Navi';
import PostItem from '../../components/Post/PostItem';
import CreatePostButton from '../../components/Post/CreatePostButton';

const Home: React.FC = () => {
  return (
    <>
      <Navi />
      <Container className="p-0 m-0" fluid>
        <div className="homepage-container">
          <CreatePostButton />
        </div>
        <div className="homepage-grid">
          <PostItem />
        </div>
      </Container>
    </>
  );
};

export default Home;
