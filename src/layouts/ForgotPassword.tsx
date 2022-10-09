import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const { forgotPassword } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await forgotPassword(emailRef.current?.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
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
            <h2 className="text-center mb-4">Forgot Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit">
                Reset Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Col>
    </Row>
  );
}
