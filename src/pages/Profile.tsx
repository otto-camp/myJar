import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { IconPencil } from '@tabler/icons';

import loadable from '@loadable/component';
import SEO from '../utils/SEO/SEO';
import useProfile from '../hooks/useProfile';
import {
  ActionIcon,
  Avatar,
  Container,
  FileButton,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { uploadProfilePicture } from '../utils/CRUD/Storage';
import { fileToBlob } from '../utils/FileToBlob';

const FollowButton = loadable(() => import('../components/Buttons/FollowButton'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const SocialsSection = loadable(() => import('../layouts/Profile/SocialsSection'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const ProfilePost = loadable(() => import('../layouts/Post/ProfilePost'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const UpdateProfileModal = loadable(() => import('../layouts/Profile/UpdateProfileModal'), {
  fallback: <Skeleton height="100%" width="100%" />
});

function Profile() {
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [picture, setPicture] = useState<File | null>(null);
  const { currentUser, currentUserProfile } = useAuth();
  const { id } = useParams() as { id: string };

  const { user } = useProfile(id);

  const submitProfilePicture = async () => {
    if (picture !== null) {
      await fileToBlob(picture).then(() => {
        uploadProfilePicture(picture, currentUser);
      });
    }
  };
  submitProfilePicture();
  return (
    <>
      {user && (
        <>
          <SEO
            title={user.fname + ' ' + user.lname}
            description={user.about}
            type="profile"
            url={'https:/myjar-8ff23.web.app/profile/' + id}
            image={user.photoURL}
          />
          <Container mih="100vh">
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
              <div>
                <Paper
                  sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
                    padding: '1rem',
                    marginBottom: '1rem'
                  })}>
                  <Group position="apart">
                    <Group>
                      <FileButton onChange={setPicture} accept="image/png,image/jpeg">
                        {(props) => (
                          <Avatar {...props} src={user.photoURL} alt={user.fname + ' ' + user.lname} size="xl" />
                        )}
                      </FileButton>
                      <Stack spacing="xs">
                        <h1>{user.fname + ' ' + user.lname}</h1>
                        <Group>
                          <Text>Follows: {user.follows.length}</Text>
                          <Text>Followers: {user.followers.length}</Text>
                        </Group>
                      </Stack>
                    </Group>
                    {currentUser !== null && currentUser.uid === id ? (
                      <>
                        <ActionIcon
                          onClick={() => {
                            setProfileModalShow(true);
                          }}>
                          <IconPencil size={36} stroke={1.5} />
                        </ActionIcon>
                        <UpdateProfileModal
                          user={currentUserProfile}
                          opened={profileModalShow}
                          setOpened={setProfileModalShow}
                        />
                      </>
                    ) : (
                      ''
                    )}
                  </Group>
                  <Group>
                    <Title order={2}>About: </Title>
                    <Text>{user.about}</Text>
                  </Group>
                  <Group>
                    <Title order={4}>Email: </Title>
                    <Text>{user.email}</Text>
                  </Group>
                  <Group>
                    <Title order={4}>Birth date: </Title>
                    <Text>{user.birthDate.toString()}</Text>
                  </Group>
                  {currentUser !== null && currentUserProfile.id !== user.id ? <FollowButton user={user} /> : ''}
                </Paper>
                <SocialsSection user={user} />
              </div>
              <ProfilePost id={id} />
            </SimpleGrid>
          </Container>
        </>
      )}
    </>
  );
}

export default Profile;
