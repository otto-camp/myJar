import { doc, setDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Alert, Button, Card, Col, Form, Navbar, Row } from "react-bootstrap";
import { db } from "../services/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const fnameRef = useRef();
  const lnameRef = useRef();
  const phoneRef = useRef();
  const [birthDate, setBirthDate] = useState(new Date());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = useAuth().currentUser;
  const id = user.uid;

  async function createProfile(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await setDoc(doc(db, "profile", id), {
        fname: fnameRef.current.value,
        lname: lnameRef.current.value,
        email: user.email,
        birthDate: birthDate.toISOString().split("T")[0],
        phoneNumber: phoneRef.current.value,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/myjar-8ff23.appspot.com/o/upp.png?alt=media&token=3bffcde1-935a-40f9-8f97-2dbe9ba2c698",
      });
      navigate("/profile/" + id);
    } catch (r) {
      setError("Failed to create a profile");
    }
    setLoading(false);
  }

  return (
    <Row className="justify-content-center align-content-center text-center h-50">
      <Col sm="8" md="6" xl="5" lg="6" xxl="4">
        <Navbar className="d-flex justify-content-center">
          <Navbar.Brand href="/" className="ms-2 fs-1 p-2 fw-bolder">
            myJar
          </Navbar.Brand>
        </Navbar>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={createProfile}>
              <Form.Group id="fname" className="mt-2">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={fnameRef}
                  required
                  aria-describedby="fname"
                />
              </Form.Group>
              <Form.Group id="lname" className="mt-2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={lnameRef}
                  required
                  aria-describedby="lname"
                />
              </Form.Group>
              <p>Birth Date</p>
              <DatePicker
                dateFormat={"yyyy/MM/dd"}
                selected={birthDate}
                onChange={(d) => setBirthDate(d)}
              />
              <Form.Group id="phone" className="mt-2">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  ref={phoneRef}
                  required
                  aria-describedby="phone"
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-2" type="submit">
                Finish Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
