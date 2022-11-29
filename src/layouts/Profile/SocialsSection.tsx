import React, { useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UpdateSocialModal from './UpdateSocialModal';
import { useAuth } from '../../services/AuthContext';
import { UserType } from '../../global/types';
import SocialButton from '../../components/Buttons/SocialButton';

interface ISocials {
  user: UserType | undefined;
}

const SocialsSection: React.FC<ISocials> = ({ user }) => {
  const [socialModalShow, setSocialModalShow] = useState(false);
  const { currentUser } = useAuth();

  return (
    <Card className=" my-3 profile-m m-left ">
      <Card.Body>
        {user && (
          <>
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
                  <SocialButton url={user.website} icon={faGlobe} label="Website Button" />
                </ul>
                <ul className="list-group-item">
                  <SocialButton url={user.github} icon={faGithub} label="Github Button" />
                </ul>
                <ul className="list-group-item">
                  <SocialButton url={user.twitter} icon={faTwitter} label="Twitter Button" />
                </ul>
                <ul className="list-group-item">
                  <SocialButton url={user.facebook} icon={faFacebook} label="Facebook Button" />
                </ul>
                <ul className="list-group-item">
                  <SocialButton url={user.instagram} icon={faInstagram} label="Instagram Button" />
                </ul>
              </ul>
            </Row>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default SocialsSection;
