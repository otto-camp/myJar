import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { uploadProfilePicture } from '../../utils/CRUD/Storage';

interface IUpdateProfilePicture {
  show: boolean;
  onHide: () => void;
}

export default function UpdateProfilePicture(props: IUpdateProfilePicture) {
  const [picture, setPicture] = useState<Blob | null>(null);
  const [error, setError] = useState('');
  const uploadImage = (e: any) => {
    setPicture(e.target.files[0]);
  };

  const submitPicture = async (e: any) => {
    e.preventDefault();
    setError('');
    try {
      if (picture === null || picture === undefined) {
        setError('You need to upload a picture.');
      } else {
        await uploadProfilePicture(picture);
      }
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="Profile picture update" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Update Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="m-3">
            <Form.Control
              type={'file'}
              accept={'.jpg, .png, .jpeg'}
              onChange={(e) => uploadImage(e)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={(e) => submitPicture(e)}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
