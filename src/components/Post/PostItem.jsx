import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../services/firebase';
import './post.css';

export default function PostItem() {
  const [posts, setPosts] = useState([]);
  const postRef = collection(db, 'posts');
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const q = query(postRef, orderBy('timestamp', 'desc'), limit(10));
      const postSnap = await getDocs(q);
      postSnap.forEach((doc) => {
        setPosts((prevPosts) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
      });
    };
    getPosts();
  }, []);

  return (
    <>
      {posts.map((p, index) => (
        <Card key={index} className="postitem-card bb bi bg-light">
          <Row className="g-0">
            <Col xs={12} className="align-self-center">
              <img
                loading="lazy"
                src={p.postThumbnail || 'https://picsum.photos/1500/500'}
                alt={p.postTitle}
                width={1000}
                height={500}
                className="img-fluid postitem-image"
                onClick={() => {
                  navigate('/post/' + p.pid);
                }}
              />
            </Col>
            <Col xs={12}>
              <Card.Header className="border-0 bg-light">
                <Card.Title
                  onClick={() => {
                    navigate('/post/' + p.pid);
                  }}>
                  {' '}
                  <h5 className="postitem-title">{p.postTitle}</h5>
                </Card.Title>
                <div className="postitem-subheader">
                  <Link
                    to={'profile/' + p.createrId}
                    className="text-decoration-none postitem-username">
                    <Card.Img
                      src={p.createrPhotoURL}
                      alt="creater photo"
                      className="postitem-creater-photo"
                    />
                    <div className="postitem-creatername">{p.createrName}</div>
                  </Link>

                  <div className="postitem-date ">
                    {moment.utc(p.timestamp.seconds, 'X').fromNow()}
                  </div>
                </div>
              </Card.Header>
              <Card.Body
                onClick={() => {
                  navigate('/post/' + p.pid);
                }}>
                <div className="postitem-text">{p.postSubTitle}</div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
}
