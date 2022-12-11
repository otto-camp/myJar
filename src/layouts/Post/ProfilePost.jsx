import { collection, getDocs, limit, query, where } from 'firebase/firestore/lite';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { db } from '../../services/firebase.js';
import { Link } from 'react-router-dom';
import CreatePostButton from '../../components/Buttons/CreatePostButton';
import EmptyPostDialog from '../../components/Dialogs/EmptyPostDialog';
import loadable from '@loadable/component';

const Moment = loadable.lib(() => import('moment'));

export default function ProfilePost(props) {
  const uid = useRef(props.uid);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getUserPosts() {
      const q = query(collection(db, 'posts'), where('createrId', '==', uid.current), limit(25));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        setPosts((prevPosts) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
      });
    }
    getUserPosts();
  }, []);

  return (
    <Card className="profile-m m-right">
      <Card.Body>
        <div className="w-100 ">
          <h4 className="font-13 d-inline-block">Posts</h4>
          <div className="float-end">
            <CreatePostButton text={'Write a story'} className={'rounded-pill'} />
          </div>
        </div>
        <hr />
        {posts.length === 0 ? (
          <EmptyPostDialog />
        ) : (
          posts.map((p, index) => (
            <div className="border border-light p-2 mb-3" key={index}>
              <div className="d-flex align-items-start">
                <div className="w-100">
                  <h5>
                    {p.postTitle}
                    <small className="text-black-50 float-end fs-6">
                      <Moment fallback={p.timestamp.seconds}>
                        {({ default: moment }) => moment.utc(p.timestamp.seconds, 'X').fromNow()}
                      </Moment>
                    </small>
                  </h5>
                  <div>
                    {p.postSubTitle}
                    <Link to={'/post/' + p.pid} className="readmore-text">
                      ...read more
                    </Link>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
}
