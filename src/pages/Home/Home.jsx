import React from 'react';
import './home.css';
import { Container } from 'react-bootstrap';
import Navi from '../../layouts/Navi';
import Post from '../../components/Post/Post';

export default function Home() {
  return (
    <>
      <Navi />
      <Container className="p-0 m-0" fluid>
        <Post />
      </Container>
    </>
  );
}
