import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';

export default function CreatePostButton({ text, className }) {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser && (
        <Link to={'/create-post'}>
          <Button className={className}>{text}</Button>
        </Link>
      )}
    </>
  );
}
