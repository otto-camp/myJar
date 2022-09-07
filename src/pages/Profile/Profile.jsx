import React, { Suspense, useEffect, useState } from "react";
import Navi from "../../layouts/Navi";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import "./profile.css";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../services/AuthContext";
import Post from "../../components/Post/Post";
import { createContext } from "react";
import { lazy } from "react";
import FriendsSection from "../../components/Profile/FriendsSection";

const UpdateProfileModal = lazy(() =>
  import("../../components/Profile/UpdateProfileModal")
);

export const UserContext = createContext({});

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [profileModalShow, setProfileModalShow] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    const getProfile = async () => {
      const docRef = doc(db, "profile", id);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    };
    getProfile();
  }, [id]);

  const addFriend = async () => {
    await updateDoc(doc(db, "profile", currentUser.uid), {
      friends: arrayUnion(id),
    });
  };

  let u = false;
  if (currentUser.uid === id) u = true;
  else u = false;

  return (
    <>
      <Navi />
      <UserContext.Provider value={{ user, setUser }}>
        <Suspense fallback={<h1>"Loading..."</h1>}>
          <Container>
            <Row>
              <Col lg={5}>
                {/* PROFILE HEADER */}
                <Card>
                  <Card.Body>
                    <Button
                      className="float-end"
                      onClick={() => setProfileModalShow(true)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <UpdateProfileModal
                      show={profileModalShow}
                      onHide={() => setProfileModalShow(false)}
                    />
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
                        <span className="ms-2">
                          {user ? user.birthDate : ""}
                        </span>
                      </p>
                      {!u && (
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="primary me-2"
                            onClick={() => addFriend}
                          >
                            Follow
                          </Button>
                          <Button variant="outline-primary">Message</Button>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
                {/* SOCIALS */}
                <Card className=" mt-3">
                  <Card.Body>
                    <Button className="float-end">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
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
                <FriendsSection />
              </Col>
              {/* POSTS */}
              <Col lg={7}>
                <Post />
              </Col>
            </Row>
          </Container>
        </Suspense>
      </UserContext.Provider>
    </>
  );
}
