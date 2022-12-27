import { Button, MantineSize, createStyles } from '@mantine/core';
import React from 'react';
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

export default function CreatePostButton({ size }: { size: MantineSize }) {
  const navigate = useNavigate();
  const { classes } = useStyles();
  return (
    <Button size={size} variant="outline" className={classes.control} onClick={() => navigate('/post/create-post')}>
      Start writing
    </Button>
  );
}
