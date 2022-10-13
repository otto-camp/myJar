import { updateDoc, doc } from 'firebase/firestore';
import React, { Suspense, useState, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { UserType } from '../../global/types';
import { useAuth } from '../../services/AuthContext';
import { db } from '../../services/firebase';

interface ISocialModal {
  user: UserType | any;
  show: boolean;
  onHide: () => void;
}

const UpdateSocialModal: React.FC<ISocialModal> = (props) => {
  const [user, setUser] = useState(props.user);
  const { currentUser } = useAuth();
  const websiteRef = useRef<HTMLInputElement>(user.website);
  const githubRef = useRef<HTMLInputElement>(user.github);
  const twitterRef = useRef<HTMLInputElement>(user.twitter);
  const facebookRef = useRef<HTMLInputElement>(user.facebook);
  const instagramRef = useRef<HTMLInputElement>(user.instagram);

  const updateSocials = async () => {
    console.log(githubRef.current.value.toString());
    
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
    <Suspense fallback={<div>Loading</div>}>
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered {...props}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Website</Form.Label>
              <Form.Control type={'text'} defaultValue={user.website} ref={websiteRef} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Github</Form.Label>
              <Form.Control type={'text'} defaultValue={user.github} ref={githubRef} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Twitter</Form.Label>
              <Form.Control type={'text'} defaultValue={user.twitter} ref={twitterRef} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Facebook</Form.Label>
              <Form.Control type={'text'} defaultValue={user.facebook} ref={facebookRef} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instagram</Form.Label>
              <Form.Control type={'text'} defaultValue={user.instagram} ref={instagramRef} />
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
    </Suspense>
  );
};

export default UpdateSocialModal;
