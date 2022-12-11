import { updateDoc, doc } from 'firebase/firestore/lite';
import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../../services/AuthContext';
import { db } from '../../services/firebase.js';

interface ISocialModal {
  show: boolean;
  onHide: () => void;
}

const UpdateSocialModal: React.FC<ISocialModal> = (props) => {
  const { currentUser, currentUserProfile } = useAuth();
  const githubRef = useRef<HTMLInputElement>(currentUserProfile.github);
  const twitterRef = useRef<HTMLInputElement>(currentUserProfile.twitter);
  const facebookRef = useRef<HTMLInputElement>(currentUserProfile.facebook);
  const instagramRef = useRef<HTMLInputElement>(currentUserProfile.instagram);
  const websiteRef = useRef<HTMLInputElement>(currentUserProfile.website);

  const updateSocials = async () => {
    await updateDoc(doc(db, 'profile', currentUser.uid), {
      website: websiteRef.current.value,
      github: githubRef.current.value,
      twitter: twitterRef.current.value,
      facebook: facebookRef.current.value,
      instagram: instagramRef.current.value
    });
    window.location.reload();
  };

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered {...props}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Control type={'text'} defaultValue={currentUserProfile.website} ref={websiteRef} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Github</Form.Label>
            <Form.Control type={'text'} defaultValue={currentUserProfile.github} ref={githubRef} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Twitter</Form.Label>
            <Form.Control type={'text'} defaultValue={currentUserProfile.twitter} ref={twitterRef} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Facebook</Form.Label>
            <Form.Control type={'text'} defaultValue={currentUserProfile.facebook} ref={facebookRef} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Instagram</Form.Label>
            <Form.Control type={'text'} defaultValue={currentUserProfile.instagram} ref={instagramRef} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
        <Button variant="primary" onClick={updateSocials}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateSocialModal;
