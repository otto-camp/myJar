import loadable from '@loadable/component';
import { Center, Paper, Text } from '@mantine/core';
import React from 'react';
const CreatePostButton = loadable(() => import('../Buttons/CreatePostButton'));

const EmptyPostDialog = () => {
  return (
    <Paper
      withBorder
      p="2rem"
      shadow="xl"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]
      })}>
      <Center>
        <Text fz="lg" fw={500}>
          There is nothing to see!
        </Text>
      </Center>
      <Center>
        <CreatePostButton size="md" />
      </Center>
    </Paper>
  );
};

export default EmptyPostDialog;
