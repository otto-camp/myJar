import { doc, updateDoc } from 'firebase/firestore/lite';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../../services/AuthContext';
import { db } from '../../services/firebase.js';

const UpdateProfileModal = (props) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [about, setAbout] = useState('');
  const [count, setCount] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    function getUser() {
      if (props.user === undefined) {
        return () => {
          getUser();
        };
      } else {
        setFname(props.user.fname);
        setLname(props.user.lname);
        setAbout(props.user.about);
      }
    }
    getUser();
  }, [props.user]);

  const updateProfile = async () => {
    await updateDoc(doc(db, 'profile', currentUser.uid), {
      fname: fname,
      lname: lname,
      about: about
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
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={fname}
              id="fnameInput"
              onChange={(e) => setFname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lname}
              id="lnameInput"
              onChange={(e) => setLname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              as="textarea"
              value={about}
              rows={3}
              maxLength={255}
              id="aboutInput"
              onChange={(e) => {
                setAbout(e.target.value);
                setCount(e.target.value.length);
              }}
            />
          </Form.Group>
          <p className="float-end text-muted">{count}/255</p>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
        <Button variant="primary" onClick={updateProfile}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateProfileModal;
