import { doc, getDoc } from 'firebase/firestore';
import moment from 'moment';
import React, { Suspense, useState } from 'react';
import { useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Navi from '../../layouts/Navi';
import { db } from '../../services/firebase';
import './post.css';
import { PostType } from '../../global/types';
import HTMLReactParser from 'html-react-parser';

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
    <Suspense fallback={<div>Loading</div>}>
      <div className="reponsive-post">
        <div className="navi-wrapper post-navi-wrapper p-0 ">
          <Navi />
        </div>
        <Row className="post-container min-h">
          <Col className="post-column margin-div">
            {post ? (
              <>
                <Image src={post.postThumbnail || 'https://picsum.photos/1500/500'} className="post-thumnail" />
                <h1 className="post-title">{post.postTitle}</h1>
                <h3 className="post-subtitle">{post.postSubTitle}</h3>
                <div className="py-2">
                  <Image src={post.createrPhotoURL} className="post-creater-photo" />
                  <h5 className="d-inline-block post-creater-name ms-1 ">{post.createrName}</h5>
                  <p className="d-inline-block post-date">
                    {moment.utc(post.timestamp!.seconds, 'X').fromNow()}
                  </p>
                </div>
                <div className="py-2">
                  <div className="post-text">{HTMLReactParser(post.postText!)}</div>
                </div>
                <div className="py-2"></div>
              </>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
    </Suspense>
  );
};

export default Post;
