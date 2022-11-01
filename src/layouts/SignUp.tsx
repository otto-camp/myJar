import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Navbar, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

export default function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSignUp(e: any) {
    e.preventDefault();
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      await signup(emailRef.current?.value, passwordRef.current?.value);
      navigate('/create-profile');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <Row className="justify-content-center align-content-center text-center h-50 min-h">
      <Col sm="8" md="6" xl="5" lg="6" xxl="4">
        <Navbar className="d-flex justify-content-center">
          <Navbar.Brand href="/" className="ms-2 fs-1 p-2 fw-bolder">
            myJar
          </Navbar.Brand>
        </Navbar>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSignUp}>
              <Form.Group id="email" className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group id="password" className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                  aria-describedby="passwordHelpBlock"
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Password should be at least 6 characters
                </Form.Text>
              </Form.Group>
              <Form.Group id="password-confirm" className="mt-2">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                  aria-describedby="passwordHelpBlock"
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Password should be at least 6 characters
                </Form.Text>
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </Col>
    </Row>
  );
}
