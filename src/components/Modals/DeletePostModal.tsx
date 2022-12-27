import { Button, Modal, Skeleton } from '@mantine/core';
import React from 'react';
import { PostType } from '../../global/types';
import { deletePost } from '../../utils/CRUD/Post';
import loadable from '@loadable/component';

const SimplePostCard = loadable(() => import('../Cards/SimplePostCard'), {
  fallback: <Skeleton height="100%" width="100%" />
});

function DeletePostModal({
  opened,
  onClose,
  post,
  userId
}: {
  opened: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostType;
  userId: string;
}) {
  const handleDeletePost = () => {
    deletePost(post.pid, userId);
    window.location.reload();
  };
  return (
    <Modal
      opened={opened}
      onClose={() => onClose(false)}
      title="Delete Post"
      closeButtonLabel="Close post delete modal"
      size="lg"
      centered
      transition="scale"
      transitionDuration={300}
      transitionTimingFunction="easeInOut"
      overlayOpacity={0.55}
      overlayBlur={3}>
      <SimplePostCard post={post} />
      <Button.Group>
        <Button fullWidth color="gray" onClick={() => onClose(false)}>
          Close
        </Button>
        <Button fullWidth color="red" onClick={handleDeletePost}>
          Delete
        </Button>
      </Button.Group>
    </Modal>
  );
}

export default DeletePostModal;
