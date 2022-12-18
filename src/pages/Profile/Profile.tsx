import React, { useState } from 'react';
import './profile.css';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import { IconPencil } from '@tabler/icons';

import loadable from '@loadable/component';
import SEO from '../../utils/SEO/SEO';
import useProfile from '../../hooks/useProfile';
import { ActionIcon, Avatar, Container, FileButton, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { Col } from 'react-bootstrap';
import { uploadProfilePicture } from '../../utils/CRUD/Storage';

const ProfileActionButton = loadable(() => import('../../components/Buttons/ProfileActionButtonGroup'));
const SocialsSection = loadable(() => import('../../layouts/Profile/SocialsSection'));
const ProfilePost = loadable(() => import('../../layouts/Post/ProfilePost'));
const UpdateProfileModal = loadable(() => import('../../layouts/Profile/UpdateProfileModal'));

function Profile() {
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [picture, setPicture] = useState<File | null>(null);
  const { currentUser, currentUserProfile } = useAuth();
  const { id } = useParams();

  const { user } = useProfile(id);
  console.log(picture);

  const fileToBlob = (file: File) => {
    return new Promise<Blob>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        resolve(new Blob([arrayBuffer]));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

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
      <SEO
        title={user ? user.fname + ' ' + user.lname : 'Profile'}
        description={user?.about}
        type="profile"
        url={'https:/myjar-8ff23.web.app/profile/' + user?.id}
        image={user?.photoURL}
      />
      <Container>
        {user && (
          <>
            <Col lg={5}>
              <Paper>
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
                        }}
                      >
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
                  <Text>{user.birthDate}</Text>
                </Group>
                {currentUser !== null && currentUserProfile.id !== user.id ? <ProfileActionButton user={user} /> : ''}
              </Paper>

              {/* {user && <SocialsSection user={user} />} */}
            </Col>

            {/* <Col lg={7}>{user && <ProfilePost user={user} uid={id} />}</Col> */}
          </>
        )}
      </Container>
    </>
  );
}

export default Profile;
