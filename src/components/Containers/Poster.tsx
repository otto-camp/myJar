import React from 'react';
import { createStyles, Title, Text, Button, Container } from '@mantine/core';
import { Dots } from '../../assets/Dots';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60
    }
  },

  inner: {
    position: 'relative',
    zIndex: 1
  },

  dots: {
    position: 'absolute',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.dark[1],

    '@media (max-width: 755px)': {
      display: 'none'
    }
  },

  dotsLeft: {
    left: 0,
    top: 0
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left'
    }
  },

  description: {
    textAlign: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[7],

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md
    }
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column'
    }
  },

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

function Poster() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Create your own{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} inherit>
            stories
          </Text>
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" className={classes.description}>
            myJar is a storytelling website that gives you the freedom to explore your creativity and tell your story!
            We are a community where writers of all levels come to express themselves as they find inspiration and share
            their stories.
          </Text>
        </Container>

        <div className={classes.controls}>
          {currentUser ? (
            <Button
              size="lg"
              variant="gradient"
              gradient={{ from: 'teal', to: 'blue', deg: 60 }}
              className={classes.control}
              onClick={() => navigate('/post/create-post')}>
              Start writing
            </Button>
          ) : (
            <Button
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              className={classes.control}
              size="lg"
              onClick={() => navigate('login')}>
              Login
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Poster;
