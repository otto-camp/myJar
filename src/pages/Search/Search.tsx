import React, { useEffect, useState } from 'react';
import Navi from '../../layouts/Navi';
import './search.css';
import { Col, Nav, Button, Dropdown, Offcanvas, Row } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import categories from '../../assets/categories.json';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../../services/firebase.js';
import { PostType } from '../../global/types';
import PostItem from '../../layouts/Post/PostItem';

const Search: React.FC = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [posts, setPosts] = useState<PostType | any>([]);
  const toggleCategory = () => (!showCategory ? setShowCategory(true) : setShowCategory(false));
  const [searchParams] = useSearchParams();
  const postRef = collection(db, 'posts');

  const sortDesc = async () => {
    setPosts([]);
    const q = query(postRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setPosts((prevPosts: any) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
    });
  };

  const sortAsc = async () => {
    setPosts([]);
    const q = query(postRef, orderBy('timestamp', 'asc'));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setPosts((prevPosts: any) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
    });
  };

  const getPosts = async () => {
    const snapshot = await getDocs(postRef);
    snapshot.forEach((doc) => {
      setPosts((prevPosts: any) => [...prevPosts, { ...doc.data(), pid: doc.id }]);
    });
  };

  useEffect(() => {
    setPosts([]);

    getPosts();
  }, [searchParams.get('q')]);

  return (
    <>
      <Navi />
      <main className="min-h p-0">
        <div className="d-flex flex-row">
          <Button onClick={toggleCategory} className="mt-3 ms-3 d-md-none">
            Categories
          </Button>
          <Dropdown className="ms-auto pe-3">
            <Dropdown.Toggle className="mt-3 ms-3">Sort</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={sortDesc}>Sort by new</Dropdown.Item>
              <Dropdown.Item onClick={sortAsc}>Sort by old</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Row className='m-0 p-0'>
          <Col md={2}>
            <Offcanvas show={showCategory} onHide={() => setShowCategory(false)} responsive="md">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title className="mx-auto">Categories</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav variant="pills" className="flex-column ms-3">
                  {categories.categories.map((c, i) => (
                    <Link to={'/category/' + c.name} key={i}>
                      <Button variant="none" className="w-100 fs-5 text-black mt-2 text-capitalize text-start">
                        {c.name}
                      </Button>
                    </Link>
                  ))}
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>

          <Col md={10}>
            <div className="m-0 me-lg-3">
              {posts.map(
                (p: PostType, i: React.Key) =>
                  p.postTitle?.includes(searchParams.get('q')!) && <PostItem posts={p} key={i} />
              )}
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default Search;
