import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-md-between p-4 border-bottom">
        <div className="me-3 d-none d-md-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a
            className="text-reset mx-3"
            aria-label="Github link"
            href="https://github.com/otto-camp"
            target={'_blank'}
            rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            className="text-reset mx-3"
            aria-label="LinkedIn link"
            href="https://www.linkedin.com/in/ismail-yarar/"
            target={'_blank'}
            rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z" />
            </svg>
          </a>
        </div>
      </section>
      <section>
        <Container fluid className="text-center text-md-start mt-5">
          <Row className="mt-3 ">
            <Col className="mx-auto mb-4">
              <h5 className="fw-bold mb-4 text-center">myJar</h5>
              <p className="text-center">
                Blog website users can create stories from various categories. Users can follow and message each other.
              </p>
            </Col>
            <Col className="mx-auto mb-4 d-flex flex-column text-center">
              <h5 className="fw-bold mb-4">Useful Links</h5>
              <Link to={'/about'} className="fs-4 text-black">
                About
              </Link>
              <Link to={'/contact'} className="fs-4 text-black">
                Contact
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <p className="d-flex justify-content-center align-items-center">
          <span className="me-3">Register for free</span>
          <Button variant="outline-primary" className="btn-rounded">
            Sign up!
          </Button>
        </p>
        <div className="text-center p-3">
          © 2022 Copyright:
          <a href="https://www.linkedin.com/in/ismail-yarar/" target={'_blank'} rel="noreferrer">
            İsmail Yarar
          </a>
        </div>
      </section>
    </footer>
  );
}
