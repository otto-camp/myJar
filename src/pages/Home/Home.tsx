import React, { useState, useEffect } from 'react';
import './home.css';
import { Container } from 'react-bootstrap';
import Navi from '../../layouts/Navi';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { UserType } from '../../global/types';
import loadable from '@loadable/component';

const FeaturedPost = loadable(() => import('../../components/Post/FeaturedPost'));
const SearchContainer = loadable(() => import('../../components/Search/SearchContainer'));
const PostItem = loadable(() => import('../../components/Post/PostItem'));

const Home: React.FC = () => {
  const [posts, setPosts] = useState<UserType | any>([]);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(10));
      const postSnap = await getDocs(q);
      postSnap.forEach((doc) => {
        setPosts((prevPosts: any) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
      });
    };
    getPosts();
  }, []);

  return (
    <>
      <Navi />
      <Container className="p-0 m-0">
        <SearchContainer />
        <div className="homepage-container">
          {posts.map((p: any, index: React.Key) => (
            <>
              {index === 0 ? (
                <FeaturedPost key={index} post={p} />
              ) : (
                <PostItem key={index} posts={p} />
              )}
            </>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
