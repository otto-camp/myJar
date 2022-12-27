import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../utils/CRUD/Post';
import categories from '../assets/categories.json';
import SEO from '../utils/SEO/SEO';
import { useAuth } from '../services/AuthContext';
import { Button, Container, FileButton, Group, TextInput, Title, Autocomplete, SimpleGrid } from '@mantine/core';
import loadable from '@loadable/component';
import { useForm } from '@mantine/form';

const Editor = loadable(() => import('../utils/Editor/Editor'));

function CreatePost() {
  const [story, setStory] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const postForm = useForm({
    initialValues: {
      title: '',
      subTitle: '',
      category: '',
      error: '',
      thumbnail: null
    },
    validate: {
      title: (v) => (v.length < 30 ? 'Title must be more than 30 characters' : null),
      subTitle: (v) => (v.length < 30 ? 'Sub title must be more than 30 characters' : null),
      category: (v) => (!v ? 'You need to choose a category' : null),
      thumbnail: (v) => (v === null ? 'Choose a thumbnail' : null)
    }
  });

  const submitPost = async (val: any) => {
    await createPost(story, val.title, val.subTitle, val.thumbnail, val.category, currentUser);
    navigate('/');
  };

  return (
    <>
      <SEO
        title="Create Post"
        description="Start writing with the title and subtitle. Add the most suitable thumbnail for the story and choose a category. "
        type="website"
        url="https:/myjar-8ff23.web.app/post/create-post"
        image="https://firebasestorage.googleapis.com/v0/b/myjar-8ff23.appspot.com/o/typewriter.jpg?alt=media&token=b95cea35-decc-4c0e-be7f-898660da970d"
      />
      <Container>
        <form onSubmit={postForm.onSubmit((val) => submitPost(val))}>
          <Title mb="xl">Add New Story</Title>
          <TextInput
            placeholder="The title must be minimum of 30 characters."
            label="Title"
            {...postForm.getInputProps('title')}
            mb="xl"
          />
          <TextInput
            placeholder="The title must be minimum of 30 characters."
            label="Sub Title"
            {...postForm.getInputProps('subTitle')}
            mb="xl"
          />
          <SimpleGrid cols={1} breakpoints={[{ minWidth: 760, cols: 2 }]} mb="xl">
            <FileButton {...postForm.getInputProps('thumbnail')} accept="image/png,image/jpeg">
              {(props) => (
                <Button variant="default" mt="auto" fullWidth {...props}>
                  {thumbnail ? thumbnail.name : 'Upload image'}
                </Button>
              )}
            </FileButton>

            <Autocomplete
              limit={7}
              placeholder="Choose Category"
              data={categories.categories.map((c) => c.name)}
              transition="pop-top-left"
              transitionDuration={80}
              transitionTimingFunction="ease"
              {...postForm.getInputProps('category')}
            />
          </SimpleGrid>
          <Editor setStory={setStory} />
          <Group position="center" mt="xl">
            <Button type="submit" variant="default" size="lg">
              Submit
            </Button>
          </Group>
        </form>
      </Container>
    </>
  );
}
export default CreatePost;
