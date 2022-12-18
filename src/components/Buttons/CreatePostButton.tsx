import { Button, MantineSize, createStyles } from '@mantine/core';
import React, { CSSProperties } from 'react';
import { useAuth } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  control: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9],
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0
      }
    }
  }
}));

interface ICreatePost {
  style?: CSSProperties;
  size: MantineSize;
}

export default function CreatePostButton({ style, size }: ICreatePost) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { classes } = useStyles();
  return (
    <>
      {currentUser ? (
        <Button size="lg" variant="outline" className={classes.control} onClick={() => navigate('/post/create-post')}>
          Start writing
        </Button>
      ) : (
        <Button fullWidth size={size} variant="default" style={style}>
          Login
        </Button>
      )}
    </>
  );
}
