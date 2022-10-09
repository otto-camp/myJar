import React, { useState } from 'react';
import { Alert, Button, Form, Image } from 'react-bootstrap';
import Navi from '../../layouts/Navi';
import { usePost } from '../../services/PostContext';
import Editor from '../../utils/Editor';
import './post.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<HTMLInputElement | null>(null);
  const [story, setStory] = useState<string>('');
  const [error, setError] = useState('');
  const { createPost } = usePost();
  const navigate = useNavigate();

  const uploadImage = async (e: any) => {
    console.log(thumbnail);
  };

  const submitPost = async (e: any) => {
    e.preventDefault();
    setError('');
    window.scrollTo(0, 0);
    try {
      if (thumbnail === null) {
        setError('You need to upload a thumbnail image');
      } else if (title.length < 30) {
        setError('Title must be more than 30 characters');
      } else if (subTitle.length < 30) {
        setError('Subtitle must be more than 30 characters');
      } else if (story.length < 300) {
        setError('Story must be more than 300 characters');
      } else {
        await createPost(story, title, subTitle);
        navigate('/');
      }
    } catch (e: any) {
      setError(e);
    }
  };

  return (
    <>
      <div className="navi-wrapper p-0">
        <Navi />
      </div>
      <section className="mt-2 min-h p-0 post-create-section">
        <header className="postcreate-header margin-div">
          <h1>Write a story</h1>
          {error && <Alert variant="danger">{error}</Alert>}
        </header>
        <main className="margin-div postcreate-main">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control type="file" onChange={(e) => uploadImage(e)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                required
                as="textarea"
                className="postcreate-title resize-none overflow-hidden"
                rows={1}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                onChange={(e) => setSubTitle(e.target.value)}
                required
                as="textarea"
                className="postcreate-title resize-none overflow-hidden"
                rows={1}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Story</Form.Label>
              <Editor story={story} setStory={setStory} />
            </Form.Group>
          </Form>
        </main>
        <footer className="postcreate-footer">
          <Button variant="primary" className="rounded-pill fs-5" onClick={submitPost}>
            Submit
          </Button>
        </footer>
      </section>
    </>
  );
};
export default CreatePost;
