import React, { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { usePost } from '../../services/PostContext';

export default function CreatePostModal(props) {
  const [count, setCount] = useState(0);
  const [errorText, setErrorText] = useState('');
  const [postText, setPostText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const { createPost } = usePost();

  async function handleCreatePost() {
    try {
      props.onHide();
      await createPost(postText, postTitle);
    } catch (e) {
      setErrorText(e);
    } finally {
      window.location.reload(false);
    }
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create Post</Modal.Title>
      </Modal.Header>
      {errorText && <Alert variant="danger">{errorText}</Alert>}
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={50}
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
              value={postTitle}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={500}
              onChange={(e) => {
                setCount(e.target.value.length);
                setPostText(e.target.value);
              }}
              value={postText}
            />
            <p className="float-end text-muted">{count}/500</p>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreatePost}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
