import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../pages/Profile/Profile";
import { db } from "../../services/firebase";

export default function UpdateProfileModal(props) {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [fname, setFname] = useState("First name");
  const [lname, setLname] = useState("Last name");
  const [about, setAbout] = useState("About");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getInfo = async () => {
      await setFname(user.fname);
      await setLname(user.lname);
      await setAbout(user.about);
      await setCount(user.about.length);
    };
    getInfo();
  }, [user]);

  const updateProfile = async () => {
    await updateDoc(doc(db, "profile", id), {
      fname: fname,
      lname: lname,
      about: about,
    });
    window.location.reload();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Profile
        </Modal.Title>
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
}
