import React, { Suspense, useEffect, useState } from 'react';
import Navi from '../../layouts/Navi';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './profile.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../services/AuthContext';
import FriendsSection from '../../components/Profile/FriendsSection';
import SocialsSection from '../../components/Profile/SocialsSection';

const ProfilePost = React.lazy(() => import('../../components/Post/ProfilePost'));
const UpdateProfileModal = React.lazy(() => import('../../components/Profile/UpdateProfileModal'));

export default function MyProfile() {
  const [user, setUser] = useState();
  const [profileModalShow, setProfileModalShow] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getProfile = async () => {
      const docRef = doc(db, 'profile', currentUser.uid);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    };
    getProfile();
  }, [currentUser]);

  return (
    <>
      <Navi />
      <Container>
        <Row>
          <Col lg={5}>
            {/* PROFILE HEADER */}
            <Card>
              <Card.Body>
                <Button
                  className="float-end"
                  onClick={() => {
                    setProfileModalShow(true);
                  }}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <Suspense fallback={<div>Loading</div>}>
                  <UpdateProfileModal
                    user={user}
                    show={profileModalShow}
                    onHide={() => {
                      setProfileModalShow(false);
                    }}
                  />
                </Suspense>
                <div className="d-flex align-items-start ">
                  <img
                    src={user ? user.photoURL : ''}
                    alt="hero"
                    className="rounded-circle avatar-lg img-thumbnail"
                  />
                  <div className="w-100 ms-3">
                    <h4>{user ? user.fname + ' ' + user.lname : 'Name'}</h4>
                    <p className="text-secondary mb-1">Friends Count</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="fs-5 text-uppercase">About Me :</h4>
                  <p className="text-muted fs-6 mb-3">{user ? user.about : ''}</p>
                  <p className="text-muted mb-2 fs-6">
                    <strong>Email :</strong> <span className="ms-2">{user ? user.email : ''}</span>
                  </p>
                  <p className="text-muted mb-2 fs-6">
                    <strong>Birth Date :</strong>{' '}
                    <span className="ms-2">{user ? user.birthDate : ''}</span>
                  </p>
                </div>
              </Card.Body>
            </Card>
            <SocialsSection user={user} />
            <FriendsSection />
          </Col>
          <Suspense fallback={<div>Loading</div>}>
            <Col lg={7}>{user && <ProfilePost user={user} uid={currentUser.uid} />}</Col>
          </Suspense>
        </Row>
      </Container>
    </>
  );
}
