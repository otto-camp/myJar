import React from 'react';
import './home.css';
import { Container } from 'react-bootstrap';
import Navi from '../../layouts/Navi';
import PostItem from '../../components/Post/PostItem';
import CreatePostButton from '../../components/Button/CreatePostButton';
import { useAuth } from '../../services/AuthContext';

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <Navi />
      <Container className="p-0 m-0">
        <div className="w-100">
          <div className="homepage-container bt bi">
            <p className="welcome-text">
              Welcome to
              <span className="fs-1 fw-bold ms-1">myJar</span>
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <p className="welcome-subtext">Share your thoughts, ideas and more</p>
              {currentUser && (
                <>
                  <CreatePostButton
                    text={'Start writing'}
                    className={'w-100 rounded-pill text-nowrap px-4'}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="homepage-grid">
          <PostItem />
        </div>
      </Container>
    </>
  );
};

export default Home;
