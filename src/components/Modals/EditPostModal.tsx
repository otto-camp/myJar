import React from 'react';
import { PostType } from '../../global/types';
import { Autocomplete, Button, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import categories from '../../assets/categories.json';
import { updatePost } from '../../utils/CRUD/Post';

function EditPostModal({
  opened,
  onClose,
  post
}: {
  opened: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostType;
}) {
  const postForm = useForm({
    initialValues: {
      title: post.postTitle,
      subTitle: post.postSubTitle,
      category: post.category
    },
    validate: {
      title: (v) => (v.length < 30 ? 'Title must be more than 30 characters' : null),
      subTitle: (v) => (v.length < 30 ? 'Sub title must be more than 30 characters' : null),
      category: (v) => (!v ? 'You need to choose a category' : null)
    }
  });

  const handleUpdatePost = (val: { title: string; subTitle: string; category: string }) => {
    updatePost(post.pid, val.title, val.subTitle, val.category);
    window.location.reload();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => onClose(false)}
      title="Edit Post"
      closeButtonLabel="Close post edit modal"
      size="xl"
      centered
      transition="scale"
      transitionDuration={300}
      transitionTimingFunction="easeInOut"
      overlayOpacity={0.55}
      overlayBlur={3}>
      <form onSubmit={postForm.onSubmit((val) => handleUpdatePost(val))}>
        <TextInput label="Post Title" {...postForm.getInputProps('title')} my="lg" />
        <TextInput label="Post SubTitle" {...postForm.getInputProps('subTitle')} my="lg" />
        <Autocomplete
          my="lg"
          limit={7}
          label="Post Category"
          data={categories.categories.map((c) => c.name)}
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          {...postForm.getInputProps('category')}
        />
        <Button.Group>
          <Button fullWidth color="gray" onClick={() => onClose(false)}>
            Close
          </Button>
          <Button type="submit" fullWidth color="indigo">
            Update
          </Button>
        </Button.Group>
      </form>
    </Modal>
  );
}

export default EditPostModal;
