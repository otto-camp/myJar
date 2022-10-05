import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import React, { Suspense } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/firebase';
import './post.css';
import ReactHTMLParser from 'react-html-parser';

export default function PostItem() {
  const [posts, setPosts] = useState([]);
  const postRef = collection(db, 'posts');
  const navigate = useNavigate();

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
          <Card
            key={index}
            className="mb-3 post-card bg-light"
            onClick={() => {
              navigate('/post/' + p.pid);
            }}>
            <Row className="g-0">
              <Col xs={6} md={12} className="align-self-center">
                <img
                  loading="lazy"
                  src="https://picsum.photos/500/500"
                  alt={p.postTitle}
                  className="img-fluid post-image"
                />
              </Col>
              <Col xs={6} md={12}>
                <Card.Header className="border-0 bg-light">
                  <Card.Title>
                    {' '}
                    <h5 className=" d-inline position-relative post-title">{p.postTitle}</h5>
                  </Card.Title>

                  <a href="/" className="text-decoration-none post-username">
                    <Card.Img
                      src={p.createrPhotoURL}
                      alt="creater photo"
                      className="post-creater-photo"
                    />
                    <Card.Subtitle className="d-inline-block post-creatername">
                      {p.createrName}
                    </Card.Subtitle>
                  </a>
                  <div className="post-date">{moment.utc(p.timestamp.seconds, 'X').fromNow()}</div>
                </Card.Header>
                {/*<div className="bar"></div>*/}
                <Card.Body>
                  <Card.Text className="post-text">
                    {ReactHTMLParser(limitText(p.postText))}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </Suspense>
    </>
  );
}
