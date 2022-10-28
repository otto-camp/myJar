import React from 'react';
import { PostType } from '../../global/types';
import { useNavigate, Link } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';

interface IFeaturedPost {
  post: PostType;
}

const FeaturedPost: React.FC<IFeaturedPost> = ({ post }) => {
  const navigate = useNavigate();
  return (
    <article className="featured-post">
      <Row>
        <Col xs={12} md={6} className="d-flex justify-content-center mt-5 mb-md-5">
          <img
            loading="lazy"
            src={post.postThumbnail || 'https://picsum.photos/500/500'}
            alt={post.postTitle}
            width={500}
            height={500}
            className="featured-post-image image-zoom"
            onClick={() => {
              navigate('/post/' + post.pid);
            }}
          />
        </Col>
        <Col xs={12} md={6} className="my-5 my-md-auto">
          <Link to={'/post/' + post.pid}>
            <h3 className="featured-post-title">{post.postTitle}</h3>
          </Link>
          <div className="d-flex align-content-center justify-content-between w-75 mx-auto">
            <Button variant="none" className="featured-post-category">
              {post.category}
            </Button>
            <Link to={'profile/' + post.createrId}>
              <h4 className="featured-post-creatername">{post.createrName}</h4>
            </Link>
          </div>
        </Col>
      </Row>
    </article>
  );
};

export default FeaturedPost;
