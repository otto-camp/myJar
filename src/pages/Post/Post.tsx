import { doc, getDoc } from 'firebase/firestore';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Navi from '../../layouts/Navi';
import { db } from '../../services/firebase';
import './post.css';
import { PostType } from '../../global/types';
import HTMLReactParser from 'html-react-parser';
import CategoryButton from '../../components/Button/CategoryButton';

const Post: React.FC = () => {
  const [post, setPost] = useState<PostType>();
  const id = useParams();

  useEffect(() => {
    const getPost = async () => {
      const postId: any = id.id;
      const postSnap = await getDoc(doc(db, 'posts', postId));
      if (postSnap.exists()) {
        const d: PostType = postSnap.data();
        setPost(d);
      }
    };
    getPost();
  }, [id]);

  return (
    <>
      <Navi />
      <Row className="post-container min-h">
        <Col className="h-100 m-0 p-0">
          {post && (
            <>
              <div className="mx-3 mt-lg-5">
                <h1 className="post-title">{post.postTitle}</h1>
                <h3 className="post-subtitle">{post.postSubTitle}</h3>
                <div className="py-2 d-flex justify-content-between">
                  <CategoryButton text={post.category} />
                  <div className="d-flex flex-row align-items-center">
                    <h5 className="fs-1em me-2">
                      <span className="fs-6 fw-normal me-1">by</span>
                      {post.createrName}
                    </h5>
                    <h6 className="fs-1em ms-2">
                      {moment.utc(post.timestamp?.seconds, 'X').fromNow()}
                    </h6>
                  </div>
                </div>
                <Image
                  src={post.postThumbnail || 'https://picsum.photos/1500/500'}
                  className="post-thumbnail"
                />
                <div className="py-2">
                  <div className="post-text">{HTMLReactParser(post.postText!)}</div>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Post;
