import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { auth } from '../services/firebase.js';
import './layout-styles.css';
import Searchbox from './Search/Searchbox';

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
      <Navbar color="light" expand="lg" variant="light" fixed="top" className="position-relative navi">
        <Navbar.Brand href="/" className="fs-1 navi-logo fw-bolder">
          myJar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">
            <Searchbox />
            <Link to={'/about'} className="mx-3 fs-5 nav-space nav-link" aria-label='about page'>
              About
            </Link>
            {currentUser ? (
              <>
                <Link to={'/profile/' + currentUser.uid} className="mx-3 fs-5 nav-link" aria-label='profile page'>
                  Profile
                </Link>
                {/* <Link to={'/messages/' + currentUser.uid} className="mx-3 fs-5 nav-link" aria-label='message page'>
                  Messages
                </Link> */}
                <NavDropdown title="Account" id="basic-nav-dropdown" className="mx-3 fs-5">
                  <NavDropdown.Item href="/settings" aria-label='settings page'>Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleSignOut} aria-label='sign out'>Sign Out</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Button variant="primary" className="fs-5 mx-3 px-4 ms-lg-auto" href="/login" aria-label='login'>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
