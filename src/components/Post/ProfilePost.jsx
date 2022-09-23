import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Card } from 'react-bootstrap';
import { db } from '../../services/firebase';
import CreatePostModal from './CreatePostModal';
import moment from 'moment';
import LikePostButton from '../Button/LikePostButton';
import EditPostButton from '../Button/EditPostButton';

export default function ProfilePost(props) {
  const uid = useRef(props.uid);
  const user = useRef(props.user);
  const [posts, setPosts] = useState([]);
  const [createPostModal, setCreatePostModal] = useState(false);

  useEffect(() => {
    async function getUserPosts() {
      const q = query(collection(db, 'posts'), where('createrId', '==', uid.current), limit(25));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        setPosts((prevPosts) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
        console.log();
      });
    }
    getUserPosts();
  }, []);
  return (
    <Card>
      <Card.Body>
        <div className="w-100 ">
          <h4 className="font-13 d-inline-block">Posts</h4>
          <Button
            className="float-end"
            onClick={() => {
              setCreatePostModal(true);
            }}>
            Create Post
          </Button>
          <CreatePostModal
            show={createPostModal}
            onHide={() => {
              setCreatePostModal(false);
            }}
          />
        </div>
        <hr />

        {posts.map((p, index) => (
          <div className="border border-light p-2 mb-3" key={index}>
            <div className="d-flex align-items-start">
              <div className="w-100">
                <h5>
                  {p.postTitle}
                  <small className="text-black-50 float-end fs-6">
                    {moment.utc(p.timestamp.seconds, 'X').fromNow()}
                  </small>
                </h5>
                <div>
                  {p.postText}
                  <br />
                  <LikePostButton post={p} user={user.current ? user.current : null} />
                  <EditPostButton/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}
