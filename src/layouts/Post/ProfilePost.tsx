import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore/lite';
import { ActionIcon, Card, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { PostType, UserType } from '../../global/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import loadable from '@loadable/component';

const CreatePostButton = loadable(() => import('../../components/Buttons/CreatePostButton'));
const EmptyPostDialog = loadable(() => import('../../components/Dialogs/EmptyPostDialog'));

export default function ProfilePost({ user, id }: { user: UserType; id: string }) {
  const [posts, setPosts] = useState<PostType | any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserPosts() {
      const q = query(collection(db, 'posts'), where('createrId', '==', id), limit(25));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        setPosts((prevPosts: any) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
      });
    }
    getUserPosts();
  }, []);

  return (
    <Paper
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
        padding: '1rem'
      })}
    >
      <Group position="apart" mb="md">
        <Title order={3} size="h2">
          Posts
        </Title>
        {user && <CreatePostButton size="sm" />}
      </Group>
      {posts.length === 0 ? (
        <EmptyPostDialog />
      ) : (
        posts.map((p: PostType, i: React.Key) => (
          <Card
            p={0}
            withBorder
            key={i}
            mb="sm"
            sx={{
              '&:hover': {
                cursor: 'pointer',
                transform: 'scale(1.01)',
                transition: 'transform 150ms ease'
              }
            }}
            onClick={() => navigate('/post/' + p.pid)}
          >
            <Stack m="lg" spacing={0}>
              <Group position="apart" p={0}>
                <Text transform="uppercase" color="dimmed" weight={700} td="underline" size="md">
                  {p.category}
                </Text>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <ActionIcon color="gray" variant="light">
                    <IconEdit size={20} />
                  </ActionIcon>
                  <ActionIcon color="red" variant="light">
                    <IconTrash size={20} />
                  </ActionIcon>
                </div>
              </Group>
              <Text mt="xs" mb="md">
                {p.postTitle}
              </Text>
            </Stack>
          </Card>
        ))
      )}
    </Paper>
  );
}
