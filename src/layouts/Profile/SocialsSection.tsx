import React, { useState } from 'react';
import UpdateSocialModal from './UpdateSocialModal';
import { useAuth } from '../../services/AuthContext';
import { UserType } from '../../global/types';
import { ActionIcon, Anchor, Group, List, Paper, ThemeIcon, Title } from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconPencil,
  IconWorld
} from '@tabler/icons';

const SocialsSection = ({ user }: { user: UserType }) => {
  const [socialModalShow, setSocialModalShow] = useState(false);
  const { currentUser } = useAuth();

  return (
    <Paper
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
        padding: '1rem'
      })}>
      <Group position="apart">
        <Title order={2}>Socials</Title>
        {currentUser !== null && currentUser.uid === user.id && (
          <>
            <ActionIcon onClick={() => setSocialModalShow(true)}>
              <IconPencil size={36} stroke={1.5} />
            </ActionIcon>
            <UpdateSocialModal
              opened={socialModalShow}
              setOpened={setSocialModalShow}
              user={user}
              id={currentUser.uid}
            />
          </>
        )}
      </Group>
      <List mt="md" spacing="md">
        <List.Item
          icon={
            <ThemeIcon color="blue" size="xl" radius="md">
              <IconWorld />
            </ThemeIcon>
          }>
          <Anchor
            size="xl"
            href={'//' + user.website}
            target="_blank"
            aria-label={`${user.fname} ${user.lname} website`}>
            {user.website ?? ''}
          </Anchor>
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="dark" size="xl" radius="md">
              <IconBrandGithub />
            </ThemeIcon>
          }>
          <Anchor
            size="xl"
            href={'//' + user.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${user.fname} ${user.lname} github`}>
            {user.github ?? ''}
          </Anchor>
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="blue" size="xl" radius="md">
              <IconBrandTwitter />
            </ThemeIcon>
          }>
          <Anchor
            size="xl"
            href={'//' + user.twitter}
            target="_blank"
            aria-label={`${user.fname} ${user.lname} twitter`}>
            {user.twitter ?? ''}
          </Anchor>
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="teal" size="xl" radius="md">
              <IconBrandFacebook />
            </ThemeIcon>
          }>
          <Anchor
            size="xl"
            href={'//' + user.facebook}
            target="_blank"
            aria-label={`${user.fname} ${user.lname} facebook`}>
            {user.facebook ?? ''}
          </Anchor>
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="red" size="xl" radius="md">
              <IconBrandInstagram />
            </ThemeIcon>
          }>
          <Anchor
            size="xl"
            href={'//' + user.instagram}
            target="_blank"
            aria-label={`${user.fname} ${user.lname} instagram`}>
            {user.instagram ?? ''}
          </Anchor>
        </List.Item>
      </List>
    </Paper>
  );
};

export default SocialsSection;
