import React, { useRef } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CategoryButton from '../../components/Buttons/CategoryButton';
import './post.css';
import { PostType } from '../../global/types';
import loadable from '@loadable/component';

const Moment = loadable.lib(() => import('moment'));

export default function PostItem({ posts }: { posts: PostType }) {
  const postRef = useRef<PostType>(posts);
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
                <div className="ms-lg-3">
                  <CategoryButton text={postRef.current.category} />
                </div>
              </Card.Title>
              <div className="postitem-subheader">
                <Link to={'profile/' + postRef.current.createrId}>
                  <h4 className="postitem-creatername">{postRef.current.createrName}</h4>
                </Link>
                <p className="postitem-date ">
                  <Moment fallback={postRef.current.timestamp.seconds as any}>
                    {({ default: moment }) => moment.utc(postRef.current.timestamp?.seconds, 'X').fromNow()}
                  </Moment>
                </p>
              </div>
            </Card.Header>
          </Col>
        </Row>
      </Card>
    </>
  );
}
