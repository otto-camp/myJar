import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useRef } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { db } from "../../services/firebase";

export default function CreatePostModal(props) {
  const [count, setCount] = useState(0);
  const [errorText, setErrorText] = useState();
  const textRef = useRef();

  async function createPost(e) {
    setErrorText("");
    try {
      await addDoc(collection(db, "post"), {
        id: props.id,
        postText: textRef.current.value,
        timestamp: new Date().getTime(),
      });
      props.onHide();
    } catch (r) {
      setErrorText(r);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Post
        </Modal.Title>
      </Modal.Header>
      {errorText && <Alert variant="danger">{errorText}</Alert>}
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              ref={textRef}
              rows={3}
              maxLength={255}
              onChange={(e) => setCount(e.target.value.length)}
            />
            <p className="float-end text-muted">{count}/255</p>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={createPost}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
