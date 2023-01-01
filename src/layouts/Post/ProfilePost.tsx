import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore/lite';
import { Card, Group, Paper, Skeleton, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import { PostType } from '../../global/types';
import { IconEdit, IconTrash } from '@tabler/icons';
import loadable from '@loadable/component';
import { useAuth } from '../../services/AuthContext';

const EditPostModal = loadable(() => import('../../components/Modals/EditPostModal'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const SimplePostCard = loadable(() => import('../../components/Cards/SimplePostCard'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const DeletePostModal = loadable(() => import('../../components/Modals/DeletePostModal'), {
  fallback: <Skeleton height="100%" width="100%" />
});
const EmptyPostDialog = loadable(() => import('../../components/Dialogs/EmptyPostDialog'), {
  fallback: <Skeleton height="100%" width="100%" />
});

export default function ProfilePost({ id }: { id: string }) {
  const [posts, setPosts] = useState<PostType | any>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { currentUser } = useAuth();

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
      })}>
      <Title order={3} size="h2" mb="lg">
        Posts
      </Title>
      {posts.length === 0 ? (
        <EmptyPostDialog />
      ) : (
        posts.map((p: PostType, i: React.Key) => (
          <Card p={0} withBorder key={i} mb="sm">
            <Stack m="lg" spacing={0}>
              <SimplePostCard post={p} />
              {currentUser != null && currentUser.uid === id ? (
                <Group spacing="xl" mt="lg">
                  <UnstyledButton onClick={() => setEditModal(true)}>
                    <Group spacing="xs">
                      <IconEdit size={24} color="gray" />
                      <Text fw={700}>Edit</Text>
                    </Group>
                  </UnstyledButton>
                  <UnstyledButton onClick={() => setDeleteModal(true)}>
                    <Group spacing="xs">
                      <IconTrash size={24} color="red" />
                      <Text fw={700}>Delete</Text>
                    </Group>
                  </UnstyledButton>
                </Group>
              ) : (
                ''
              )}

              <EditPostModal opened={editModal} onClose={setEditModal} post={p} />
              <DeletePostModal opened={deleteModal} onClose={setDeleteModal} post={p} userId={id} />
            </Stack>
          </Card>
        ))
      )}
    </Paper>
  );
}
