import React, { useEffect, useState } from "react";
import Navi from "../../layouts/Navi";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "./profile.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faGlobe,
  faArrowRightLong,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import CreatePostModal from "../../components/Modal/CreatePostModal";

export default function Profile() {
  const [user, setUser] = useState();
  const { id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const docRef = doc(db, "profile", id);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
      console.log(docSnap.data());
    };
    getProfile();
  }, [id]);

  return (
    <>
      <Navi />
      <Container>
        <Row>
          <Col lg={5}>
            {/* PROFILE HEADER */}
            <Card>
              <Card.Body>
                <Button className="float-end ">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>

                <div className="d-flex align-items-start ">
                  <img
                    src={user ? user.photoURL : ""}
                    alt="hero"
                    className="rounded-circle avatar-lg img-thumbnail"
                  />
                  <div className="w-100 ms-3">
                    <h4>{user ? user.fname + " " + user.lname : "Name"}</h4>
                    <p className="text-secondary mb-1">Friends Count</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="fs-5 text-uppercase">About Me :</h4>
                  <p className="text-muted fs-6 mb-3">
                    {user ? user.about : ""}
                  </p>
                  <p className="text-muted mb-2 fs-6">
                    <strong>Email :</strong>{" "}
                    <span className="ms-2">{user ? user.email : ""}</span>
                  </p>
                  <p className="text-muted mb-2 fs-6">
                    <strong>Birth Date :</strong>{" "}
                    <span className="ms-2">{user ? user.birthDate : ""}</span>
                  </p>
                  <div className="d-flex justify-content-center">
                    <Button variant="primary me-2">Follow</Button>
                    <Button variant="outline-primary">Message</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
            {/* SOCIALS */}
            <Card className=" mt-3">
              <Card.Body>
                <h4 className="header-title mb-3">Social Links</h4>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex align-items-center flex-wrap li-height">
                    <a
                      className="btn link-button"
                      href={user ? "https://" + user.website : "/"}
                    >
                      <FontAwesomeIcon icon={faGlobe} />
                      <strong className="text-muted mx-1">Website</strong>
                    </a>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center flex-wrap li-height">
                    <a
                      className="btn link-button"
                      href={user ? "https://" + user.github : "/"}
                    >
                      <FontAwesomeIcon icon={faGithub} />
                      <strong className="text-muted mx-1">Github</strong>
                    </a>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center flex-wrap li-height">
                    <a
                      className="btn link-button"
                      href={user ? "https://" + user.twitter : "/"}
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                      <strong className="text-muted mx-1">Twitter</strong>
                    </a>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center flex-wrap li-height">
                    <a
                      className="btn link-button"
                      href={user ? "https://" + user.facebook : "/"}
                    >
                      <FontAwesomeIcon icon={faFacebook} />
                      <strong className="text-muted mx-1">Facebook</strong>
                    </a>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center flex-wrap li-height">
                    <a
                      className="btn link-button"
                      href={user ? "https://" + user.instagram : "/"}
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                      <strong className="text-muted mx-1">Instagram</strong>
                    </a>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            {/* FRIENDS */}
            <Card className="mt-3 mb-3">
              <Card.Body>
                <h4 className="header-title mb-3">Friends</h4>

                <ListGroup>
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                  >
                    <div
                      className="d-flex align-items-center pb-1"
                      id="tooltips-container"
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar5.png"
                        className="rounded-circle img-fluid avatar-md img-thumbnail bg-transparent"
                        alt="hero"
                      />
                      <div className="w-100 ms-2">
                        <h5 className="mb-1">Herbert Stewart</h5>
                        <p className="mb-0 font-13 text-muted">Friends Count</p>
                      </div>
                      <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
                  </a>
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                  >
                    <div
                      className="d-flex align-items-center pb-1"
                      id="tooltips-container"
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="rounded-circle img-fluid avatar-md img-thumbnail bg-transparent"
                        alt=""
                      />
                      <div className="w-100 ms-2">
                        <h5 className="mb-1">Terry Mouser</h5>
                        <p className="mb-0 font-13 text-muted">Friends Count</p>
                      </div>
                      <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
                  </a>
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                  >
                    <div
                      className="d-flex align-items-center pb-1"
                      id="tooltips-container"
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar8.png"
                        className="rounded-circle img-fluid avatar-md img-thumbnail bg-transparent"
                        alt=""
                      />
                      <div className="w-100 ms-2">
                        <h5 className="mb-1">Adam Barney</h5>
                        <p className="mb-0 font-13 text-muted">Friends Count</p>
                      </div>
                      <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
                  </a>
                  <a
                    href="/"
                    className="list-group-item list-group-item-action"
                  >
                    <div
                      className="d-flex align-items-center pb-1"
                      id="tooltips-container"
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                        className="rounded-circle img-fluid avatar-md img-thumbnail bg-transparent"
                        alt=""
                      />
                      <div className="w-100 ms-2">
                        <h5 className="mb-1">Michal Chang</h5>
                        <p className="mb-0 font-13 text-muted">Friends Count</p>
                      </div>
                      <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
                  </a>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          {/* POSTS */}
          <Col lg={7}>
            <Card>
              <Card.Body>
                <div className="w-100">
                  <h4 className="font-13 d-inline-block">Posts</h4>
                  <Button
                    variant="primary"
                    className="float-end"
                    onClick={() => setModalShow(true)}
                  >
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </Button>
                  <CreatePostModal
                    id={id}
                    show={modalShow}
                    onHide={() => {
                      setModalShow(false);
                      setToastShow(true);
                    }}
                  />
                </div>
                <hr />
                <div className="border border-light p-2 mb-3">
                  <div className="d-flex align-items-start">
                    <img
                      className="me-2 avatar-sm rounded-circle"
                      src="https://bootdey.com/img/Content/avatar/avatar4.png"
                      alt="post hero"
                    />
                    <div className="w-100">
                      <h5>
                        Thelma Fridley{" "}
                        <small className="text-muted"> 1 hour ago</small>
                      </h5>
                      <div>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel
                        metus scelerisque ante sollicitudin. Cras purus odio,
                        vestibulum in vulputate at, tempus viverra turpis. Duis
                        sagittis ipsum. Praesent mauris. Fusce nec tellus sed
                        augue semper porta. Mauris massa.
                        <br />
                        <a
                          href="/"
                          className="text-muted font-13 d-inline-block mt-2"
                        >
                          Reply
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-end" className="p-3 ">
        <Toast
          onClose={() => setToastShow(false)}
          show={toastShow}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>See? Just like this.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
