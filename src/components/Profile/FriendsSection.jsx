import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export default function FriendsSection() {
  return (
    <Card className="mt-3 mb-3">
      <Card.Body>
        <h4 className="header-title mb-3">Friends</h4>

        <ListGroup>
          <a href="/" className="list-group-item list-group-item-action">
            <div className="d-flex align-items-center pb-1" id="tooltips-container">
              <img
                loading="lzy"
                src="https://bootdey.com/img/Content/avatar/avatar5.png"
                className="rounded-circle img-fluid avatar-md img-thumbnail bg-transparent"
                alt="hero"
              />
              <div className="w-100 ms-2">
                <h5 className="mb-1">Herbert Stewart</h5>
                <p className="mb-0 font-13 text-muted">Friends Count</p>
              </div>
              <FontAwesomeIcon icon={faArrowRightLong} />
            </div>
          </a>
          <a href="/" className="list-group-item list-group-item-action">
            <div className="d-flex align-items-center pb-1" id="tooltips-container">
              <img
                loading="lzy"
                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                className="rounded-circle img-fluid avatar-md img-thumbnail bg-transparent"
                alt=""
              />
              <div className="w-100 ms-2">
                <h5 className="mb-1">Terry Mouser</h5>
                <p className="mb-0 font-13 text-muted">Friends Count</p>
              </div>
              <FontAwesomeIcon icon={faArrowRightLong} />
            </div>
          </a>
          <a href="/" className="list-group-item list-group-item-action">
            <div className="d-flex align-items-center pb-1" id="tooltips-container">
              <img
                loading="lzy"
                src="https://bootdey.com/img/Content/avatar/avatar8.png"
                className="rounded-circle img-fluid avatar-md img-thumbnail bg-transparent"
                alt=""
              />
              <div className="w-100 ms-2">
                <h5 className="mb-1">Adam Barney</h5>
                <p className="mb-0 font-13 text-muted">Friends Count</p>
              </div>
              <FontAwesomeIcon icon={faArrowRightLong} />
            </div>
          </a>
          <a href="/" className="list-group-item list-group-item-action">
            <div className="d-flex align-items-center pb-1" id="tooltips-container">
              <img
                loading="lzy"
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                className="rounded-circle img-fluid avatar-md img-thumbnail bg-transparent"
                alt=""
              />
              <div className="w-100 ms-2">
                <h5 className="mb-1">Michal Chang</h5>
                <p className="mb-0 font-13 text-muted">Friends Count</p>
              </div>
              <FontAwesomeIcon icon={faArrowRightLong} />
            </div>
          </a>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
