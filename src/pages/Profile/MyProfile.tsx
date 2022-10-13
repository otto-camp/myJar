import React, { Suspense, useState } from 'react';
import Navi from '../../layouts/Navi';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './profile.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../services/AuthContext';
import FriendsSection from '../../components/Profile/FriendsSection';
import SocialsSection from '../../components/Profile/SocialsSection';

const ProfilePost = React.lazy(() => import('../../components/Post/ProfilePost'));
const UpdateProfileModal = React.lazy(() => import('../../components/Profile/UpdateProfileModal'));

const MyProfile: React.FC = () => {
  const [profileModalShow, setProfileModalShow] = useState(false);
  const { currentUserProfile, currentUser } = useAuth();
  
  return (
    <>
      <div className="navi-wrapper p-0">
        <Navi />
      </div>
      <Container className="min-h">
        <Row>
          <Col lg={5}>
            <Card className="profile-m m-left ">
              <Card.Body>
                <Button
                  className="float-end rounded-pill"
                  onClick={() => {
                    setProfileModalShow(true);
                  }}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <UpdateProfileModal
                  user={currentUserProfile}
                  show={profileModalShow}
                  onHide={() => {
                    setProfileModalShow(false);
                  }}
                />
                <div className="d-flex align-items-start ">
                  <img
                    src={currentUserProfile ? currentUserProfile.photoURL : ''}
                    alt="hero"
                    className="rounded-circle avatar-lg img-thumbnail"
                  />
                  <div className="w-100 ms-3">
                    <h4>
                      {currentUserProfile
                        ? currentUserProfile.fname + ' ' + currentUserProfile.lname
                        : 'Name'}
                    </h4>
                    <p className="text-secondary mb-1">
                      Friends:{currentUserProfile ? ' ' + currentUserProfile.friends.length : '0'}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="fs-5 text-uppercase">About Me :</h4>
                  <p className="text-muted fs-6 mb-3">
                    {currentUserProfile ? currentUserProfile.about : ''}
                  </p>
                  <p className="text-muted mb-2 fs-6">
                    <strong>Email :</strong>{' '}
                    <span className="ms-2">
                      {currentUserProfile ? currentUserProfile.email : ''}
                    </span>
                  </p>
                  <p className="text-muted mb-2 fs-6">
                    <strong>Birth Date :</strong>{' '}
                    <span className="ms-2">
                      {currentUserProfile ? currentUserProfile.birthDate : ''}
                    </span>
                  </p>
                </div>
              </Card.Body>
            </Card>
            <SocialsSection user={currentUserProfile } />
            <FriendsSection />
          </Col>
          <Suspense fallback={<div>Loading</div>}>
            <Col lg={7}>
              {currentUserProfile && (
                <ProfilePost user={currentUserProfile} uid={currentUser.uid} />
              )}
            </Col>
          </Suspense>
        </Row>
      </Container>
    </>
  );
};

export default MyProfile;
