import React, { useState, Suspense } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UpdateSocialModal from './UpdateSocialModal';
import { UserType } from '../../global/types';

interface ISocials {
  user: UserType;
}

const SocialsSection: React.FC<ISocials> = (props) => {
  const [socialModalShow, setSocialModalShow] = useState(false);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Card className=" mt-3 profile-m m-left ">
        <Card.Body>
          <Button className="float-end rounded-pill" onClick={() => setSocialModalShow(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <UpdateSocialModal
            user={props.user}
            show={socialModalShow}
            onHide={() => setSocialModalShow(false)}
          />
          <h4 className="header-title mb-3">Social Links</h4>
          <Row className="justify-content-between mt-1">
            <a className="btn link-button" href={props ? 'https://' + props.user.website : '/'}>
              <FontAwesomeIcon icon={faGlobe} className="fa-xl" />
            </a>
            <a className="btn link-button" href={props ? 'https://' + props.user.github : '/'}>
              <FontAwesomeIcon icon={faGithub} className="fa-xl" />
            </a>
            <a className="btn link-button" href={props ? 'https://' + props.user.twitter : '/'}>
              <FontAwesomeIcon icon={faTwitter} className="fa-xl" />
            </a>
            <a className="btn link-button" href={props ? 'https://' + props.user.facebook : '/'}>
              <FontAwesomeIcon icon={faFacebook} className="fa-xl" />
            </a>
            <a className="btn link-button" href={props ? 'https://' + props.user.instagram : '/'}>
              <FontAwesomeIcon icon={faInstagram} className="fa-xl" />
            </a>
          </Row>
        </Card.Body>
      </Card>
    </Suspense>
  );
};

export default SocialsSection;
