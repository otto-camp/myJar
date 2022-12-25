import { createStyles, Text, Container, ActionIcon, Group } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons';
import React from 'react';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },

  description: {
    marginTop: 5,
    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : theme.colors.dark[7],

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center'
    }
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  wrapper: {
    width: 160
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[8],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
      textDecoration: 'underline',
      color: theme.colorScheme === 'dark' ? theme.colors.grape[1] : theme.colors.grape[8]
    }
  },

  title: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : theme.colors.dark[7],

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column'
    }
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs
    }
  }
}));

export default function Footer() {
  const { classes } = useStyles();
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Text className={classes.title}>myJar</Text>
          <Text size="sm" color="dimmed" className={classes.description}>
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>
        <div className={classes.groups}>
          <div className={classes.wrapper}>
            <Text<'a'> className={classes.link} component="a" href="/about">
              About
            </Text>
            <Text<'a'> className={classes.link} component="a" href="/contact">
              Contact
            </Text>
          </div>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text size="sm">© 2022 İsmail Yarar. All rights reserved.</Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon
            size="lg"
            component="a"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            href="https://github.com/otto-camp">
            <IconBrandGithub size={24} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            component="a"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/ismail-yarar/">
            <IconBrandLinkedin size={24} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
