import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './post.css';
import { PostType } from '../../global/types';
import loadable from '@loadable/component';

const CategoryButton = loadable(() => import('../../components/Buttons/CategoryButton'));
const Image = loadable(() => import('../../components/Images/Image'));

const Moment = loadable.lib(() => import('moment'));

export default function PostItem({ posts }: { posts: PostType }) {
  const navigate = useNavigate();

  return (
    <>
      <Card className="postitem-card bg-light">
        <Row className="g-0">
          <Col xs={12} lg={6} className="align-self-center">
            <Image
              src={posts.postThumbnail || 'https://picsum.photos/1000/500'}
              alt={posts.postTitle}
              loading="lazy"
              className="img-fluid postitem-image image-zoom"
              onClick={() => {
                navigate('/post/' + posts.pid);
              }}
              width="auto"
              height="100%"
            />
          </Col>
          <Col xs={12} lg={6}>
            <Card.Header className="border-0 bg-light px-0">
              <Card.Title>
                <Link to={'/post/' + posts.pid}>
                  <h5 className="postitem-title">{posts.postTitle}</h5>
                </Link>
                <div className="ms-lg-3">
                  <CategoryButton text={posts.category} />
                </div>
              </Card.Title>
              <div className="postitem-subheader">
                <Link to={'profile/' + posts.createrId}>
                  <h4 className="postitem-creatername">{posts.createrName}</h4>
                </Link>
                <p className="postitem-date ">
                  <Moment fallback={posts.timestamp.seconds as any}>
                    {({ default: moment }) => moment.utc(posts.timestamp?.seconds, 'X').fromNow()}
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
