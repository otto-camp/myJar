import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';

export default function CreatePostButton() {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser && (
        <Link to={'/create-post'}>
          <Button>Create Post</Button>
        </Link>
      )}
    </>
  );
}
