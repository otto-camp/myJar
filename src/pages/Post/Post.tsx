import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Navi from '../../layouts/Navi';
import './post.css';
import HTMLReactParser from 'html-react-parser';
import CategoryButton from '../../components/Buttons/CategoryButton';
import SEO from '../../utils/SEO/SEO';
import useProfile from '../../hooks/useProfile';
import usePost from '../../hooks/usePost';
import loadable from '@loadable/component';

const Moment = loadable.lib(() => import('moment'));

const Post: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { post } = usePost(id);
  const { user } = useProfile(post?.createrId);

  return (
    <>
      <SEO
        title={post?.postTitle}
        description={post?.postSubTitle}
        type="article"
        url={'https://myjar-8ff23.web.app/post/' + post?.pid}
        image={post?.postThumbnail}
      />
      <Navi />
      <Row className="g-0 w-100 min-h">
        {post && (
          <>
            <Col xs={12} lg={8}>
              <div className="post-container">
                <h1 className="post-title">{post.postTitle}</h1>
                <div className="d-flex justify-content-between">
                  <h3 className="post-subtitle">{post.postSubTitle}</h3>
                  <h6 className="fs-sm">
                    <Moment fallback={post.timestamp.seconds as any}>
                      {({ default: moment }) => moment.utc(post.timestamp.seconds, 'X').fromNow()}
                    </Moment>
                  </h6>
                </div>
                <Image
                  src={post.postThumbnail || 'https://picsum.photos/1500/500'}
                  className="post-thumbnail"
                  alt={post.postTitle}
                  width="1024"
                  height="1024"
                />
                <div className="py-2">
                  <div className="post-text">{HTMLReactParser(post.postText)}</div>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={4}>
              <div className="post-creater-card">
                <Image
                  src={post.createrPhotoURL}
                  alt={post.createrName}
                  className="rounded-circle avatar-lg img-thumbnail me-5 ms-3"
                  width="64"
                  height="64"
                />
                <h5 className="d-inline-block ps-auto pe-3">
                  <Link to={'/profile/' + post.createrId}>{post.createrName}</Link>
                </h5>
                <div className="mx-3 mt-3">
                  <p className="fs-5 fw-bold m-0 mb-2">{user?.followers.length} Followers</p>
                  <p className="m-0 mb-2">{user?.about}</p>
                  <CategoryButton text={post.category} />
                </div>
              </div>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default Post;
