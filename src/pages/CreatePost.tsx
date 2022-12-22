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

      {/* <section className="mt-2 min-h p-0 post-create-section">
        <header className="postcreate-header margin-div">
          <h1>Write a story</h1>
          {error && <Alert variant="danger">{error}</Alert>}
        </header>
        <main className="margin-div postcreate-main">
          <Form>
            <Form.Group className="mb-2">
              <Form.Label className="fs-3 fw-semibold">Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                required
                as="textarea"
                className="postcreate-title resize-none overflow-hidden"
                rows={1}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="fs-3 fw-semibold">Subtitle</Form.Label>
              <Form.Control
                onChange={(e) => setSubTitle(e.target.value)}
                required
                as="textarea"
                className="postcreate-title resize-none overflow-hidden"
                rows={1}
              />
            </Form.Group>
            <Form.Group>
              <Row>
                <Col xs={12} sm={6}>
                  <Form.Label className="fs-3 fw-semibold">Thumbnail</Form.Label>
                  <Form.Control type={'file'} onChange={(e) => uploadImage(e)} accept={'.jpg, .png, .jpeg'} />
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Label className="fs-3 fw-semibold">Category</Form.Label>
                  <Form.Select aria-label="Category select" ref={categoryRef}>
                    {categories.categories.map((c, i) => (
                      <option value={c.name} key={i}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="fs-3 fw-semibold">Story</Form.Label>
              <Editor story={story} setStory={setStory} />
            </Form.Group>
          </Form>
        </main>
        <div className="postcreate-footer">
          <Button variant="primary" className="rounded-pill fs-5 px-4" onClick={(e) => submitPost(e)}>
            Submit
          </Button>
        </div>
      </section> */}
    </>
  );
}
export default CreatePost;
