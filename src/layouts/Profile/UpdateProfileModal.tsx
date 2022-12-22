import { doc, updateDoc } from 'firebase/firestore/lite';
import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../services/AuthContext';
import { db } from '../../services/firebase.js';
import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core';
import { UserType } from '../../global/types';

interface IUpdateProfileModal {
  user: UserType;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfileModal = ({ user, opened, setOpened }: IUpdateProfileModal) => {
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [about, setAbout] = useState(user.about);
  const [count, setCount] = useState(0);
  const { currentUser } = useAuth();

  const updateProfile = async () => {
    await updateDoc(doc(db, 'profile', currentUser.uid), {
      fname: fname,
      lname: lname,
      about: about
    });
    window.location.reload();
  };

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} size="xl" centered>
      <TextInput label="First name" value={fname} onChange={(e) => setFname(e.currentTarget.value)} />
      <TextInput label="Last name" value={lname} onChange={(e) => setLname(e.currentTarget.value)} />
      <Textarea
        label="About"
        value={about}
        onChange={(e) => {
          setAbout(e.currentTarget.value);
          setCount(e.currentTarget.value.length);
        }}
        autosize
        minRows={3}
        maxRows={5}
        maxLength={255}
      />
      <p>{count}/255</p>
      <Group grow>
        <Button onClick={() => setOpened(false)}>Close</Button>
        <Button onClick={updateProfile}>Save</Button>
      </Group>
      {/* <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value={fname} id="fnameInput" onChange={(e) => setFname(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={lname} id="lnameInput" onChange={(e) => setLname(e.target.value)} />
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
      </Modal.Footer> */}
    </Modal>
  );
};

export default UpdateProfileModal;
