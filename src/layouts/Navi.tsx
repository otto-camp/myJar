import { Header, Container, Title, Group, Burger, Transition, Paper, createStyles, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { auth } from '../services/firebase.js';
import loadable from '@loadable/component';

const ThemeSwitch = loadable(() => import('../components/ThemeSwitch'));

const HEADER_HEIGHT = '5rem';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '100%',
    marginBottom: '2rem'
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1],

    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
      color: theme.colorScheme === 'dark' ? theme.colors.blue[1] : theme.colors.blue[6]
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md
    }
  },
  responsiveMenu: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  }
}));

export default function Navi() {
  const { currentUser } = useAuth();
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
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
    <Header role="navigation" height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Title>myJar</Title>
        <Group spacing={5} className={classes.links}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          {currentUser ? (
            <>
              <Link to={'/profile/' + currentUser.uid} className={classes.link}>
                Profile
              </Link>
              <Button variant="default" onClick={(e) => handleSignOut(e)}>
                Sign Out
              </Button>
            </>
          ) : (
            <Group position="center">
              <Button.Group>
                <Button variant="default" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="default" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </Button.Group>
            </Group>
          )}
          <ThemeSwitch />
        </Group>
        <Group className={classes.responsiveMenu}>
          <ThemeSwitch />
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

          <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                <Link to="/" className={classes.link}>
                  Home
                </Link>
                {currentUser ? (
                  <>
                    <Link to={'/profile/' + currentUser.uid} className={classes.link}>
                      Profile
                    </Link>
                    <Button variant="default" onClick={(e) => handleSignOut(e)}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Group grow position="center" px="md" mb="lg">
                    <Button variant="default" onClick={() => navigate('/login')}>
                      Login
                    </Button>
                    <Button variant="default" onClick={() => navigate('/signup')}>
                      Sign Up
                    </Button>
                  </Group>
                )}
              </Paper>
            )}
          </Transition>
        </Group>
      </Container>
    </Header>
  );
}
