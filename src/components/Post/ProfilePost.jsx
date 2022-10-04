import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Card } from 'react-bootstrap';
import { db } from '../../services/firebase';
import moment from 'moment';
import { Link } from 'react-router-dom';
import CreatePostButton from './CreatePostButton';

const LikePostButton = React.lazy(() => import('../Button/LikePostButton'));
const EditPostButton = React.lazy(() => import('../Button/EditPostButton'));

export default function ProfilePost(props) {
  const uid = useRef(props.uid);
  const user = useRef(props.user);
  const [posts, setPosts] = useState([]);

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

  const limitText = (text) => text.substr(0, 100);

  return (
    <Card>
      <Card.Body>
        <div className="w-100 ">
          <h4 className="font-13 d-inline-block">Posts</h4>
          <div className='float-end'>
          <CreatePostButton />
          </div>
        </div>
        <hr />
        <Suspense fallback={<div>Loading</div>}>
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
                    {limitText(p.postText)}
                    <Link to={'/post/' + p.pid} className="readmore-text">
                      ...read more
                    </Link>
                    <br />
                    <LikePostButton post={p} user={user.current ? user.current : null} />
                    <EditPostButton user={user} post={p} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Suspense>
      </Card.Body>
    </Card>
  );
}
