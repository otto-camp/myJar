import { Button, MantineSize } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginButton({size}:{size:MantineSize}) {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate('/login')} size={size} variant="light" onMouseEnter={() => import('../../layouts/Login')}>
      Login
    </Button>
  );
}

export default LoginButton;
