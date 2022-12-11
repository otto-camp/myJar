import React from 'react';
import { PostType } from '../../global/types';
import { useNavigate, Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import loadable from '@loadable/component';

const CategoryButton = loadable(() => import('../../components/Buttons/CategoryButton'));
const SkeletonCard = loadable(() => import('../../components/Cards/SkeletonCard'));
const Image = loadable(() => import('../../components/Images/Image'));

interface IFeaturedPost {
  post: PostType;
}

const FeaturedPost: React.FC<IFeaturedPost> = ({ post }) => {
  const navigate = useNavigate();
  return (
    <article className="featured-post">
      <Row className="m-0 p-0">
        {post ? (
          <>
            <Col xs={12} md={6} className="d-flex justify-content-center mt-5 mb-md-5">
              <Image
                src={post.postThumbnail}
                alt={post.postTitle}
                width="auto"
                height="100%"
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
                <CategoryButton text={post.category} />
                <Link to={'profile/' + post.createrId}>
                  <h4 className="featured-post-creatername">{post.createrName}</h4>
                </Link>
              </div>
            </Col>
          </>
        ) : (
          <SkeletonCard />
        )}
      </Row>
    </article>
  );
};

export default FeaturedPost;
