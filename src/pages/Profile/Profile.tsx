import React, { useState, useEffect } from 'react';
import Navi from '../../layouts/Navi';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.js';
import { UserType } from '../../global/types';
import loadable from '@loadable/component';
import SEO from '../../utils/SEO/SEO';

const UpdateProfilePictureModal = loadable(
  () => import('../../components/Profile/UpdateProfilePictureModal')
);
const ProfileActionButton = loadable(() => import('../../components/Button/ProfileActionButton'));
const SocialsSection = loadable(() => import('../../components/Profile/SocialsSection'));
const ProfilePost = loadable(() => import('../../components/Post/ProfilePost'));
const UpdateProfileModal = loadable(() => import('../../components/Profile/UpdateProfileModal'));

const Profile: React.FC = () => {
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [pictureModalShow, setPictureModalShow] = useState(false);
  const [user, setUser] = useState<UserType>();
  const { currentUser, currentUserProfile } = useAuth();
  const { id } = useParams();

  const getProfile = async () => {
    const docSnap = await getDoc(doc(db, 'profile', id as string));
    setUser(docSnap.data() as any);
  };

  useEffect(() => {
    if (currentUser == null || currentUser.uid !== id) {
      getProfile();
    } else {
      setUser(currentUserProfile);
    }
  }, [currentUserProfile]);

  const updateProfilePicture = () => {
    if (currentUser !== null && currentUser.uid === id) {
      setPictureModalShow(true);
    }
  };

  return (
    <>
      <SEO
        title={user ? user.fname + ' ' + user.lname : 'Profile'}
        description={user?.about}
        type="profile"
        url={'https:/myjar-8ff23.web.app/profile/' + user?.id}
        image={user?.photoURL}
      />
      <div className="navi-wrapper p-0">
        <Navi />
      </div>
      <Container className="min-h">
        <Row>
          <Col lg={5}>
            <Card className="profile-m m-left ">
              <Card.Body>
                {currentUser !== null && currentUser.uid === id ? (
                  <>
                    <Button
                      className="float-end rounded-pill"
                      onClick={() => {
                        setProfileModalShow(true);
                      }}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <UpdateProfileModal
                      user={user}
                      show={profileModalShow}
                      onHide={() => {
                        setProfileModalShow(false);
                      }}
                    />
                  </>
                ) : (
                  ''
                )}
                <div className="d-flex align-items-start ">
                  <img
                    src={user ? user.photoURL : ''}
                    alt="hero"
                    onClick={updateProfilePicture}
                    className="rounded-circle avatar-lg img-thumbnail"
                  />
                  <UpdateProfilePictureModal
                    show={pictureModalShow}
                    onHide={() => setPictureModalShow(false)}
                  />
                  <div className="w-100 ms-3">
                    <h4>{user ? user.fname + ' ' + user.lname : 'Name'}</h4>
                    <p className="text-secondary mb-1 d-inline-block">
                      Follows:{user ? ' ' + user.follows?.length : '0'}
                    </p>
                    <p className="text-secondary mb-1 d-inline-block ms-sm-3 ms-1">
                      Followers:{user ? ' ' + user.followers?.length : '0'}
                    </p>
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
                {user !== currentUserProfile ? <ProfileActionButton user={user} /> : ''}
              </Card.Body>
            </Card>
            {user && <SocialsSection user={user} />}
          </Col>

          <Col lg={7}>{user && <ProfilePost user={user} uid={id} />}</Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
