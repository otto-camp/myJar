import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import React, { Suspense } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../services/AuthContext';
import { db } from '../../services/firebase';
import './post.css';

const LikePostButton = React.lazy(() => import('../Button/LikePostButton'));

export default function Post() {
  const [posts, setPosts] = useState([]);
  const { currentUserProfile } = useAuth();

  useEffect(() => {
    const getPosts = async () => {
      const postSnap = await getDocs(collection(db, 'posts'));
      postSnap.forEach((doc) => {
        setPosts((prevPosts) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
      });
    };
    console.log(1);
    getPosts();
  }, []);

  return (
    <>
      <Suspense>
        {posts.map((p, index) => (
          <div className="postcard dark" key={index}>
            <img
              className="postcard__img"
              src="https://picsum.photos/1000/1000"
              alt="Image Title"
            />

            <div className="postcard__container">
              <h1 className="postcard__title d-inline">{p.postTitle}</h1>
              <div className="postcard__bar" />
              <div className="postcard__text">{p.postText}</div>
              <div className="post__footer d-inline-block">
                <LikePostButton post={p} user={currentUserProfile ? currentUserProfile : null} />
                <p className="float-end">{moment.utc(p.timestamp.seconds, 'X').fromNow()}</p>
              </div>
            </div>
          </div>
        ))}
      </Suspense>
    </>
  );
}
