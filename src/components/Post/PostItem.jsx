import moment from 'moment';
import React, { useRef } from 'react';
<<<<<<< HEAD
import { Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CategoryButton from '../Button/CategoryButton';
=======
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
>>>>>>> fae0ef1ccfee9a1dea83072e7c0622b02efb3ec5
import './post.css';

export default function PostItem({ posts }) {
  const postRef = useRef(posts);
  const navigate = useNavigate();

  return (
    <>
      <Card className="postitem-card bg-light">
        <Row className="g-0">
          <Col xs={12} lg={6} className="align-self-center">
            <img
              loading="lazy"
              src={postRef.current.postThumbnail || 'https://picsum.photos/1000/500'}
              alt={postRef.current.postTitle}
              width={1000}
              height={500}
              className="img-fluid postitem-image image-zoom"
              onClick={() => {
                navigate('/post/' + postRef.current.pid);
              }}
            />
          </Col>
          <Col xs={12} lg={6}>
            <Card.Header className="border-0 bg-light px-0">
              <Card.Title>
                <Link to={'/post/' + postRef.current.pid}>
                  <h5 className="postitem-title">{postRef.current.postTitle}</h5>
                </Link>
<<<<<<< HEAD
                <div className="ms-lg-3">
                  <CategoryButton text={postRef.current.category} />
                </div>
=======
                <Button variant="none" className="postitem-category">
                  {postRef.current.category}
                </Button>
>>>>>>> fae0ef1ccfee9a1dea83072e7c0622b02efb3ec5
              </Card.Title>
              <div className="postitem-subheader">
                <Link to={'profile/' + postRef.current.createrId}>
                  <h4 className="postitem-creatername">{postRef.current.createrName}</h4>
                </Link>
                <p className="postitem-date ">
                  {moment.utc(postRef.current.timestamp.seconds, 'X').fromNow()}
                </p>
              </div>
            </Card.Header>
          </Col>
        </Row>
      </Card>
    </>
  );
}
