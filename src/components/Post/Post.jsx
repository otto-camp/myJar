import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import React, { Suspense } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useAuth } from '../../services/AuthContext';
import { db } from '../../services/firebase';
import './post.css';

const LikePostButton = React.lazy(() => import('../Button/LikePostButton'));
const EditPostButton = React.lazy(() => import('../Button/EditPostButton'));

export default function Post() {
  const [posts, setPosts] = useState([]);
  const { currentUserProfile } = useAuth();

  const postRef = collection(db, 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const postSnap = await getDocs(postRef);
      postSnap.forEach((doc) => {
        setPosts((prevPosts) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
      });
    };
    getPosts();
  }, []);

  return (
    <>
      <Suspense>
        {posts.map((p, index) => (
          <Card key={index} className="mb-3 post-card">
            <Card.Header className="border-0">
              <Card.Title className="d-inline-block post-title">{p.postTitle}</Card.Title>
              <div className="d-flex align-items-center">
                <Card.Img
                  src={p.createrPhotoURL}
                  alt="creater photo"
                  className="post-creater-photo"
                />
                <Card.Subtitle className="d-inline-block ms-2 post-creatername">
                  {p.createrName}
                </Card.Subtitle>
              </div>
            </Card.Header>
            <div className="bar"></div>
            <Card.Body>
              <Card.Text className="post-text">{p.postText}</Card.Text>
            </Card.Body>
            <Card.Footer className="border-0 d-flex align-items-center">
              <LikePostButton user={currentUserProfile} post={p} />
              <EditPostButton user={currentUserProfile} post={p} />
              <div className="post-date ms-auto">
                {moment.utc(p.timestamp.seconds, 'X').fromNow()}
              </div>
            </Card.Footer>
          </Card>
        ))}
      </Suspense>
    </>
  );
}
