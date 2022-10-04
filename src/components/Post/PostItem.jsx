import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import React, { Suspense } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from '../../services/firebase';
import './post.css';
import ReactHTMLParser from 'react-html-parser';

export default function PostItem() {
  const [posts, setPosts] = useState([]);
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

  const limitText = (text) => text.substr(0, 100);

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        {posts.map((p, index) => (
          <Card key={index} className="mb-3 post-card">
            <Card.Header className="border-0">
              <Card.Title className="d-inline-block post-title">{p.postTitle}</Card.Title>
              <div className="d-flex align-items-center mt-2">
                <a href="/" className="text-decoration-none post-username">
                  <Card.Img
                    src={p.createrPhotoURL}
                    alt="creater photo"
                    className="post-creater-photo"
                  />
                  <Card.Subtitle className="d-inline-block ms-2 post-creatername">
                    {p.createrName}
                  </Card.Subtitle>
                </a>
                <div className="post-date ms-auto">
                  {moment.utc(p.timestamp.seconds, 'X').fromNow()}
                </div>
              </div>
            </Card.Header>
            <div className="bar"></div>
            <Card.Body>
              <Card.Text className="post-text">
                {ReactHTMLParser(limitText(p.postText))}
                <Link to={'/post/' + p.pid} className="readmore-text">
                  ...read more
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Suspense>
    </>
  );
}
