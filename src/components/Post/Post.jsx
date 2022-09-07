import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useLayoutEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserContext } from "../../pages/Profile/Profile";
import { db } from "../../services/firebase";

export default function Post(props) {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [photoURL, setPhotoURL] = useState("");
  const [name, setName] = useState("");
  const [timeStamp, setTimeStamp] = useState(0);
  const [posts, setPosts] = useState([]);

  const q = query(collection(db, "post"), where("id", "==", id));

  useLayoutEffect(() => {
    const getInfo = async () => {
      await setPhotoURL(user.photoURL);
      await setName(user.fname + " " + user.lname);
      await setTimeStamp(1);
    };
    const querySnapshot = async () => {
      const query = await getDocs(q);
      query.forEach((doc) => {
        setPosts(doc.id, doc.data());
      });
    };
    querySnapshot();
    getInfo();
  }, [user, q]);

  console.log(posts);
  return (
    <>
      <Card>
        <Card.Body>
          <div className="w-100 ">
            <h4 className="font-13 d-inline-block">Posts</h4>
          </div>
          <hr />
          <div className="border border-light p-2 mb-3">
            <div className="d-flex align-items-start">
              <img
                className="me-2 avatar-sm rounded-circle"
                src={photoURL}
                alt="post hero"
              />
              <div className="w-100">
                <h5>
                  {name}
                  <small className="text-muted"> {timeStamp}</small>
                </h5>
                <div>
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
    </>
  );
}
