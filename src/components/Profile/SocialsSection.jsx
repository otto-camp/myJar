import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { faPenToSquare, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SocialsSection({ user }) {
  return (
    <Card className=" mt-3">
      <Card.Body>
        <Button className="float-end">
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
        <h4 className="header-title mb-3">Social Links</h4>
        <Row className="justify-content-between">
          <a
            className="btn link-button"
            href={user ? 'https://' + user.website : '/'}
          >
            <FontAwesomeIcon icon={faGlobe} className="fa-xl" />
          </a>
          <a
            className="btn link-button"
            href={user ? 'https://' + user.github : '/'}
          >
            <FontAwesomeIcon icon={faGithub} className="fa-xl" />
          </a>
          <a
            className="btn link-button"
            href={user ? 'https://' + user.twitter : '/'}
          >
            <FontAwesomeIcon icon={faTwitter} className="fa-xl" />
          </a>
          <a
            className="btn link-button"
            href={user ? 'https://' + user.facebook : '/'}
          >
            <FontAwesomeIcon icon={faFacebook} className="fa-xl" />
          </a>
          <a
            className="btn link-button"
            href={user ? 'https://' + user.instagram : '/'}
          >
            <FontAwesomeIcon icon={faInstagram} className="fa-xl" />
          </a>
        </Row>
      </Card.Body>
    </Card>
  );
}
