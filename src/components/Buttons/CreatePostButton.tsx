import React, { CSSProperties } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';

interface ICreatePost {
  text: string;
  className?: string;
  variant?: string;
  style?: CSSProperties;
}

export default function CreatePostButton({ text, className, variant, style }: ICreatePost) {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser && (
        <Link to={'/post/create-post'} style={{ width: 'fit-content' }}>
          <Button variant={variant} className={className} style={style}>
            {text}
          </Button>
        </Link>
      )}
    </>
  );
}
