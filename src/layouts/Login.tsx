import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Navbar, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      await login(emailRef.current?.value, passwordRef.current?.value);
      navigate('/');
    } catch {
      setError('Failed to login');
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
            {error && <Alert variant="danger">{error}</Alert>}
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password" className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit">
                Login
              </Button>
            </Form>
            <div className="w-100 mt-3">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Col>
    </Row>
  );
}
