import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { auth } from '../services/firebase.js';
import './layout-styles.css';

export default function Navi() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e: any) => {
    e.preventDefault();
    try {
      await auth.signOut();
      navigate('/');
    } catch {
      console.error(e);
    }
  };

  return (
    <Container fluid className="m-0 p-0 navi-container">
      <Navbar
        color="light"
        expand="lg"
        variant="light"
        fixed="top"
        className="position-relative navi"
      >
        <Navbar.Brand href="/" className="fs-1 navi-logo fw-bolder">
          myJar
        </Navbar.Brand>
        {currentUser && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="w-100">
                <Link to={'/'} className="mx-3 fs-5 nav-space nav-link">
                  Home
                </Link>
                <Link to={'/profile/' + currentUser.uid} className="mx-3 fs-5 nav-link">
                  Profile
                </Link>
                <Link to={'/messages/' + currentUser.uid} className="mx-3 fs-5 nav-link">
                  Messages
                </Link>
                <NavDropdown title="Account" id="basic-nav-dropdown" className="mx-3 fs-5">
                  <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
        {!currentUser && (
          <>
            <Button variant="primary" className="fs-5 mx-3 px-4 ms-auto" href="/login">
              Login
            </Button>
          </>
        )}
      </Navbar>
    </Container>
  );
}
