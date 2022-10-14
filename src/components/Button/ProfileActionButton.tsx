import React from 'react';
import { Button, ButtonGroup, Row } from 'react-bootstrap';
import { useAuth } from '../../services/AuthContext';

export default function ProfileActionButton(props) {
  const { currentUserProfile } = useAuth();

  return (
    <Row>
      <ButtonGroup aria-label="Profile actions">
        <Button className='rounded-pill me-4 w-50'>Follow</Button>
        <Button className='rounded-pill ms-4 w-50'>Message</Button>
      </ButtonGroup>
    </Row>
  );
}
