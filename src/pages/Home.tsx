import React from 'react';
import loadable from '@loadable/component';
import SEO from '../utils/SEO/SEO';
import usePosts from '../hooks/usePosts';
import logo from '../../public/logo.png';
import { Container, Skeleton } from '@mantine/core';

const Poster = loadable(() => import('../components/Containers/Poster'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const PostItem = loadable(() => import('../layouts/Post/PostItem'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const CategoryContainer = loadable(() => import('../components/Containers/CategoryContainer'), {
  fallback: <Skeleton height="100%" width="100%" />
});

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
      <Poster />
      <CategoryContainer />
      <Container>
        {posts.map((p: any, index: React.Key) => (
          <PostItem key={index} post={p} />
        ))}
      </Container>
    </>
  );
};

export default Home;
