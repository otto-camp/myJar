import React from 'react';
import './home.css';
import { Container } from 'react-bootstrap';
import loadable from '@loadable/component';
import SEO from '../../utils/SEO/SEO';
import usePosts from '../../hooks/usePosts';
import logo from '../../../public/logo.png';

const FeaturedPost = loadable(() => import('../../layouts/Post/FeaturedPost'));
const PostItem = loadable(() => import('../../layouts/Post/PostItem'));

const Home: React.FC = () => {
  const { posts } = usePosts();

  return (
    <>
      <SEO
        title="myJar"
        description="Blog website users can create stories from various categories. Users can follow and message each other."
        type="website"
        url="https://myjar-8ff23.web.app/"
        image={logo}
      />
      <Container className="p-0 m-0" fluid>
        {/* <Poster /> */}
        <div className="homepage-container">
          {posts.map((p: any, index: React.Key) => (
            <>{index === 0 ? <FeaturedPost key={index} post={p} /> : <PostItem key={index} posts={p} />}</>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
