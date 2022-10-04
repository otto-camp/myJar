import React from 'react';
import { Row } from 'react-bootstrap';
import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialsSection = (user) => {
  return (
    <Row className="justify-content-between">
      <a className="btn link-button" href={user ? 'https://' + user.website : '/'}>
        <FontAwesomeIcon icon={faGlobe} className="fa-xl" />
      </a>
      <a className="btn link-button" href={user ? 'https://' + user.github : '/'}>
        <FontAwesomeIcon icon={faGithub} className="fa-xl" />
      </a>
      <a className="btn link-button" href={user ? 'https://' + user.twitter : '/'}>
        <FontAwesomeIcon icon={faTwitter} className="fa-xl" />
      </a>
      <a className="btn link-button" href={user ? 'https://' + user.facebook : '/'}>
        <FontAwesomeIcon icon={faFacebook} className="fa-xl" />
      </a>
      <a className="btn link-button" href={user ? 'https://' + user.instagram : '/'}>
        <FontAwesomeIcon icon={faInstagram} className="fa-xl" />
      </a>
    </Row>
  );
};

export default SocialsSection;
