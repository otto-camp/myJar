import React, { useState, Suspense } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UpdateSocialModal from './UpdateSocialModal';
import { useAuth } from '../../services/AuthContext';
import { UserType } from '../../global/types';

interface ISocials {
  user: UserType | undefined;
}

const SocialsSection: React.FC<ISocials> = ({ user }) => {
  const [socialModalShow, setSocialModalShow] = useState(false);
  const { currentUser } = useAuth();

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Card className=" my-3 profile-m m-left ">
        <Card.Body>
          {currentUser !== null && currentUser.uid === user?.id && (
            <>
              <Button className="float-end rounded-pill" onClick={() => setSocialModalShow(true)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <UpdateSocialModal show={socialModalShow} onHide={() => setSocialModalShow(false)} />
            </>
          )}
          <h4 className="header-title mb-3">Social Links</h4>
          <Row className="justify-content-between mt-1">
            <ul className="list-group list-group-flush">
              <ul className="list-group-item">
                <a
                  className="btn link-button w-100"
                  href={user?.website ? 'https://' + user?.website : void 0}
                >
                  <FontAwesomeIcon icon={faGlobe} className="fa-xl float-start" />
                  <span className="ms-4">{user?.website ? user?.website : 'Not available'}</span>
                </a>
              </ul>
              <ul className="list-group-item">
                <a
                  className="btn link-button w-100"
                  href={user?.github ? 'https://' + user?.github : void 0}
                >
                  <FontAwesomeIcon icon={faGithub} className="fa-xl float-start" />
                  <span className="ms-4">{user?.github ? user?.github : 'Not available'}</span>
                </a>
              </ul>
              <ul className="list-group-item">
                <a
                  className="btn link-button w-100"
                  href={user?.twitter ? 'https://' + user?.twitter : void 0}
                >
                  <FontAwesomeIcon icon={faTwitter} className="fa-xl float-start" />
                  <span className="ms-4">{user?.twitter ? user?.twitter : 'Not available'}</span>
                </a>
              </ul>
              <ul className="list-group-item">
                <a
                  className="btn link-button w-100"
                  href={user?.facebook ? 'https://' + user?.facebook : void 0}
                >
                  <FontAwesomeIcon icon={faFacebook} className="fa-xl float-start" />
                  <span className="ms-4">{user?.facebook ? user?.facebook : 'Not available'}</span>
                </a>
              </ul>
              <ul className="list-group-item">
                <a
                  className="btn link-button w-100"
                  href={user?.instagram ? 'https://' + user?.instagram : void 0}
                >
                  <FontAwesomeIcon icon={faInstagram} className="fa-xl float-start" />
                  <span className="ms-4">
                    {user?.instagram ? user?.instagram : 'Not available'}
                  </span>
                </a>
              </ul>
            </ul>
          </Row>
        </Card.Body>
      </Card>
    </Suspense>
  );
};

export default SocialsSection;
