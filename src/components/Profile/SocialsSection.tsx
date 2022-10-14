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
  console.log(user);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Card className=" mt-3 profile-m m-left ">
        <Card.Body>
          {currentUser && (
            <>
              <Button className="float-end rounded-pill" onClick={() => setSocialModalShow(true)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <UpdateSocialModal show={socialModalShow} onHide={() => setSocialModalShow(false)} />
            </>
          )}
          <h4 className="header-title mb-3">Social Links</h4>
          <Row className="justify-content-between mt-1">
            <a className="btn link-button" href={'https://' + user!.website}>
              <FontAwesomeIcon icon={faGlobe} className="fa-xl" />
            </a>
            <a className="btn link-button" href={'https://' + user!.github}>
              <FontAwesomeIcon icon={faGithub} className="fa-xl" />
            </a>
            <a className="btn link-button" href={'https://' + user!.twitter}>
              <FontAwesomeIcon icon={faTwitter} className="fa-xl" />
            </a>
            <a className="btn link-button" href={'https://' + user!.facebook}>
              <FontAwesomeIcon icon={faFacebook} className="fa-xl" />
            </a>
            <a className="btn link-button" href={'https://' + user!.instagram}>
              <FontAwesomeIcon icon={faInstagram} className="fa-xl" />
            </a>
          </Row>
        </Card.Body>
      </Card>
    </Suspense>
  );
};

export default SocialsSection;
