import { Button, MantineSize } from '@mantine/core';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';

interface ICreatePost {
  text: string;
  className?: string;
  style?: CSSProperties;
  size: MantineSize;
}

export default function CreatePostButton({ text, className, style, size }: ICreatePost) {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? (
        <Link to={'/post/create-post'} style={{ width: 'fit-content' }}>
          <Button fullWidth variant="default" className={className} style={style} size={size}>
            {text}
          </Button>
        </Link>
      ) : (
        <Button fullWidth size={size} variant="default" style={style} className={className}>
          Login
        </Button>
      )}
    </>
  );
}
